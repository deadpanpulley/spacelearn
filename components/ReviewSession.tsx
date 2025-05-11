import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThumbsUp, ThumbsDown, Brain } from 'lucide-react-native';
import type { ReviewItem } from '@/lib/spacing';
import { submitReview } from '@/lib/spacing';

interface ReviewSessionProps {
  item: ReviewItem;
  onComplete: () => void;
}

export function ReviewSession({ item, onComplete }: ReviewSessionProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const startTime = React.useRef(Date.now());

  const handleSubmitReview = async (quality: number) => {
    try {
      setSubmitting(true);
      const elapsedTime = (Date.now() - startTime.current) / 1000; // Convert to seconds
      await submitReview(item.id, quality, elapsedTime);
      onComplete();
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Brain size={24} color="#0B3D91" />
          <Text style={styles.headerText}>Review Question</Text>
        </View>

        <Text style={styles.questionText}>{item.question_text}</Text>

        {!showAnswer ? (
          <TouchableOpacity
            style={styles.showAnswerButton}
            onPress={() => setShowAnswer(true)}
          >
            <Text style={styles.showAnswerText}>Show Answer</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.answerContainer}>
              <Text style={styles.answerLabel}>Answer:</Text>
              <Text style={styles.answerText}>{item.answer_text}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>How well did you remember?</Text>
              
              <View style={styles.ratingButtons}>
                <TouchableOpacity
                  style={[styles.ratingButton, styles.hardButton]}
                  onPress={() => handleSubmitReview(2)}
                  disabled={submitting}
                >
                  <ThumbsDown size={20} color="#FFFFFF" />
                  <Text style={styles.ratingButtonText}>Hard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.ratingButton, styles.okButton]}
                  onPress={() => handleSubmitReview(3)}
                  disabled={submitting}
                >
                  <Text style={styles.ratingButtonText}>OK</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.ratingButton, styles.easyButton]}
                  onPress={() => handleSubmitReview(5)}
                  disabled={submitting}
                >
                  <ThumbsUp size={20} color="#FFFFFF" />
                  <Text style={styles.ratingButtonText}>Easy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F7',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0B3D91',
    marginLeft: 12,
  },
  questionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#333333',
    marginBottom: 24,
    lineHeight: 28,
  },
  showAnswerButton: {
    backgroundColor: '#0B3D91',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  showAnswerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  answerContainer: {
    marginBottom: 24,
  },
  answerLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#71717A',
    marginBottom: 8,
  },
  answerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#333333',
    lineHeight: 28,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  ratingButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  ratingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  hardButton: {
    backgroundColor: '#DC2626',
  },
  okButton: {
    backgroundColor: '#0B3D91',
  },
  easyButton: {
    backgroundColor: '#10B981',
  },
  ratingButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});