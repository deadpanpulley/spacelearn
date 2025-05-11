import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Brain, Clock } from 'lucide-react-native';
import { format, formatDistanceToNow } from 'date-fns';
import type { ReviewItem } from '@/lib/spacing';

interface ReviewSchedulerProps {
  reviewItems: ReviewItem[];
  onStartReview: (item: ReviewItem) => void;
}

export function ReviewScheduler({ reviewItems, onStartReview }: ReviewSchedulerProps) {
  const dueItems = reviewItems.filter(
    item => item.next_review && new Date(item.next_review) <= new Date()
  );

  const upcomingItems = reviewItems.filter(
    item => item.next_review && new Date(item.next_review) > new Date()
  );

  return (
    <View style={styles.container}>
      {dueItems.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Due for Review</Text>
          {dueItems.map(item => (
            <ReviewItemCard
              key={item.id}
              item={item}
              onPress={() => onStartReview(item)}
              isDue
            />
          ))}
        </>
      )}

      {upcomingItems.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Upcoming Reviews</Text>
          {upcomingItems.map(item => (
            <ReviewItemCard
              key={item.id}
              item={item}
              onPress={() => onStartReview(item)}
              isDue={false}
            />
          ))}
        </>
      )}

      {reviewItems.length === 0 && (
        <View style={styles.emptyState}>
          <Brain size={48} color="#0B3D91" />
          <Text style={styles.emptyTitle}>No Reviews Scheduled</Text>
          <Text style={styles.emptyText}>
            Create questions from your notes to start reviewing
          </Text>
        </View>
      )}
    </View>
  );
}

interface ReviewItemCardProps {
  item: ReviewItem;
  onPress: () => void;
  isDue: boolean;
}

function ReviewItemCard({ item, onPress, isDue }: ReviewItemCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, isDue && styles.dueCard]}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <Brain size={20} color={isDue ? '#DC2626' : '#0B3D91'} />
        <Text style={[styles.status, isDue && styles.dueStatus]}>
          {isDue ? 'Due Now' : 'Upcoming'}
        </Text>
      </View>

      <Text style={styles.questionText} numberOfLines={2}>
        {item.question_text}
      </Text>

      <View style={styles.cardFooter}>
        <Clock size={16} color="#71717A" />
        <Text style={styles.timeText}>
          {isDue
            ? `Due ${formatDistanceToNow(new Date(item.next_review))} ago`
            : `Due ${formatDistanceToNow(new Date(item.next_review))}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0B3D91',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dueCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  status: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
    marginLeft: 8,
  },
  dueStatus: {
    color: '#DC2626',
  },
  questionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0B3D91',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#71717A',
    textAlign: 'center',
  },
});