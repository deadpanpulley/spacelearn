import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';
import type { Question, QuestionType } from '@/lib/questions';

type QuestionFormProps = {
  initialData?: Question;
  onSubmit: (data: Partial<Question>) => void;
  onCancel: () => void;
};

export function QuestionForm({ initialData, onSubmit, onCancel }: QuestionFormProps) {
  const [questionText, setQuestionText] = useState(initialData?.question_text || '');
  const [answerText, setAnswerText] = useState(initialData?.answer_text || '');
  const [questionType, setQuestionType] = useState<QuestionType>(
    initialData?.question_type || 'short_answer'
  );
  const [difficultyLevel, setDifficultyLevel] = useState(
    initialData?.difficulty_level || 1
  );
  const [options, setOptions] = useState<string[]>(
    initialData?.options || ['', '', '', '']
  );

  const handleSubmit = () => {
    const questionData: Partial<Question> = {
      question_text: questionText,
      answer_text: answerText,
      question_type: questionType,
      difficulty_level: difficultyLevel,
      options: questionType === 'multiple_choice' ? options.filter(Boolean) : undefined,
    };

    onSubmit(questionData);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formSection}>
        <Text style={styles.label}>Question Type</Text>
        <View style={styles.typeButtons}>
          {(['multiple_choice', 'true_false', 'short_answer'] as QuestionType[]).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                questionType === type && styles.typeButtonSelected
              ]}
              onPress={() => setQuestionType(type)}
            >
              <Text style={[
                styles.typeButtonText,
                questionType === type && styles.typeButtonTextSelected
              ]}>
                {type.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Difficulty Level</Text>
        <View style={styles.difficultyButtons}>
          {[1, 2, 3, 4, 5].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.difficultyButton,
                difficultyLevel === level && styles.difficultyButtonSelected
              ]}
              onPress={() => setDifficultyLevel(level)}
            >
              <Text style={[
                styles.difficultyButtonText,
                difficultyLevel === level && styles.difficultyButtonTextSelected
              ]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Question</Text>
        <TextInput
          style={styles.input}
          value={questionText}
          onChangeText={setQuestionText}
          placeholder="Enter your question"
          multiline
        />
      </View>

      {questionType === 'multiple_choice' && (
        <View style={styles.formSection}>
          <Text style={styles.label}>Options</Text>
          {options.map((option, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={option}
              onChangeText={(value) => updateOption(index, value)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </View>
      )}

      <View style={styles.formSection}>
        <Text style={styles.label}>Answer</Text>
        <TextInput
          style={styles.input}
          value={answerText}
          onChangeText={setAnswerText}
          placeholder="Enter the correct answer"
          multiline
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Save Question</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B4B4B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: '#0B3D91',
  },
  typeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4B4B4B',
  },
  typeButtonTextSelected: {
    color: '#FFFFFF',
  },
  difficultyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  difficultyButtonSelected: {
    backgroundColor: '#0B3D91',
  },
  difficultyButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B4B4B',
  },
  difficultyButtonTextSelected: {
    color: '#FFFFFF',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F7',
  },
  submitButton: {
    backgroundColor: '#0B3D91',
  },
  cancelButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4B4B4B',
  },
  submitButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});