import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { QuestionList } from '@/components/QuestionList';
import { QuestionForm } from '@/components/QuestionForm';
import { getQuestions, createQuestion, updateQuestion, deleteQuestion, type Question } from '@/lib/questions';

export default function QuestionsScreen() {
  const { id } = useLocalSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, [id]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await getQuestions(id as string);
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (questionData: Partial<Question>) => {
    try {
      if (selectedQuestion) {
        const updated = await updateQuestion(selectedQuestion.id, questionData);
        setQuestions(questions.map(q => 
          q.id === updated.id ? updated : q
        ));
      } else {
        const created = await createQuestion({
          ...questionData,
          note_id: id as string,
        } as Omit<Question, 'id' | 'created_at'>);
        setQuestions([created, ...questions]);
      }
      setIsFormVisible(false);
      setSelectedQuestion(null);
    } catch (err) {
      setError('Failed to save question');
    }
  };

  const handleEdit = (question: Question) => {
    setSelectedQuestion(question);
    setIsFormVisible(true);
  };

  const handleDelete = async (questionId: string) => {
    try {
      await deleteQuestion(questionId);
      setQuestions(questions.filter(q => q.id !== questionId));
    } catch (err) {
      setError('Failed to delete question');
    }
  };

  return (
    <View style={styles.container}>
      <QuestionList
        questions={questions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setSelectedQuestion(null);
          setIsFormVisible(true);
        }}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <QuestionForm
              initialData={selectedQuestion || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsFormVisible(false);
                setSelectedQuestion(null);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0B3D91',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
});