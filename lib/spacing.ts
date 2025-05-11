import { supabase } from './supabase';

export interface SpacingProfile {
  id: string;
  name: string;
  intervals: number[];
  ease_factor: number;
  created_at: string;
}

export interface ReviewItem {
  id: string;
  question_id: string;
  user_id: string;
  spacing_profile_id: string;
  last_reviewed: string | null;
  next_review: string | null;
  ease_factor: number;
  interval: number;
  review_count: number;
  performance_history: Array<{
    timestamp: string;
    quality: number;
    elapsed_time: number;
  }>;
}

export async function getSpacingProfiles(): Promise<SpacingProfile[]> {
  const { data, error } = await supabase
    .from('spacing_profiles')
    .select('*');

  if (error) throw error;
  return data;
}

export async function getReviewItems(options: {
  dueOnly?: boolean;
  limit?: number;
} = {}): Promise<ReviewItem[]> {
  let query = supabase
    .from('review_items')
    .select('*, questions(*)');

  if (options.dueOnly) {
    query = query.lte('next_review', new Date().toISOString());
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query
    .order('next_review', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createReviewItem(questionId: string, spacingProfileId: string): Promise<ReviewItem> {
  const { data, error } = await supabase
    .from('review_items')
    .insert({
      question_id: questionId,
      spacing_profile_id: spacingProfileId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function submitReview(
  reviewItemId: string,
  quality: number,
  elapsedTime: number
): Promise<ReviewItem> {
  const { data: reviewItem, error: fetchError } = await supabase
    .from('review_items')
    .select('*')
    .eq('id', reviewItemId)
    .single();

  if (fetchError) throw fetchError;

  // Calculate new ease factor and interval
  const newEaseFactor = calculateNewEaseFactor(reviewItem.ease_factor, quality);
  const newInterval = calculateNextInterval(
    reviewItem.interval,
    reviewItem.spacing_profile_id,
    reviewItem.review_count,
    newEaseFactor
  );

  const performance = {
    timestamp: new Date().toISOString(),
    quality,
    elapsed_time: elapsedTime,
  };

  const { data, error } = await supabase
    .from('review_items')
    .update({
      last_reviewed: new Date().toISOString(),
      next_review: new Date(Date.now() + newInterval * 60 * 60 * 1000).toISOString(),
      ease_factor: newEaseFactor,
      interval: newInterval,
      review_count: reviewItem.review_count + 1,
      performance_history: [...reviewItem.performance_history, performance],
    })
    .eq('id', reviewItemId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

function calculateNewEaseFactor(currentEaseFactor: number, quality: number): number {
  const newEaseFactor = currentEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  return Math.max(1.3, Math.min(2.5, newEaseFactor));
}

async function calculateNextInterval(
  currentInterval: number,
  spacingProfileId: string,
  reviewCount: number,
  easeFactor: number
): Promise<number> {
  const { data: profile, error } = await supabase
    .from('spacing_profiles')
    .select('intervals')
    .eq('id', spacingProfileId)
    .single();

  if (error) throw error;

  if (reviewCount < profile.intervals.length) {
    return profile.intervals[reviewCount];
  }

  // After going through all predefined intervals, use exponential spacing
  const lastInterval = profile.intervals[profile.intervals.length - 1];
  return Math.round(lastInterval * easeFactor);
}