import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Brain, CreditCard as Edit2, Trash2 } from 'lucide-react-native';
import type { Question } from '@/lib/questions';

type QuestionListProps = {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
};

export function QuestionList({ questions, onEdit, onDelete }: QuestionListProps) {
  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return '#10B981';
      case 2: return '#3B82F6';
      case 3: return '#F59E0B';
      case 4: return '#EF4444';
      case 5: return '#7C3AED';
      default: return '#71717A';
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple_choice': return 'Multiple Choice';
      case 'true_false': return 'True/False';
      case 'short_answer': return 'Short Answer';
      default: return 'Unknown Type';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {questions.map((question) => (
        <View key={question.id} style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <View style={styles.typeContainer}>
              <Brain size={16} color="#0B3D91" />
              <Text style={styles.typeText}>
                {getQuestionTypeLabel(question.question_type)}
              </Text>
            </View>
            <View style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(question.difficulty_level) }
            ]}>
              <Text style={styles.difficultyText}>
                Level {question.difficulty_level}
              </Text>
            </View>
          </View>

          <Text style={styles.questionText}>{question.question_text}</Text>
          <Text style={styles.answerText}>{question.answer_text}</Text>

          {question.options && (
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => (
                <Text key={index} style={styles.optionText}>
                  • {option}
                </Text>
              ))}
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit(question)}
            >
              <Edit2 size={20} color="#0B3D91" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => onDelete(question.id)}
            >
              <Trash2 size={20} color="#E53E3E" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  questionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  answerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B4B4B',
    marginBottom: 12,
  },
  optionsContainer: {
    marginTop: 8,
    paddingLeft: 8,
  },
  optionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B4B4B',
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F7',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
});