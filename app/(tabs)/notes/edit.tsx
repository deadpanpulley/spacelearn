import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Save, X, Plus } from 'lucide-react-native';
import { createNote, updateNote, type Note } from '@/lib/notes';
import { supabase } from '@/lib/supabase';

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadNote();
    }
  }, [id]);

  const loadNote = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setTitle(data.title);
      setContent(data.content);
      setTags(data.tags || []);
    } catch (err) {
      setError('Failed to load note');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!title.trim()) {
        setError('Title is required');
        return;
      }

      const noteData = {
        title: title.trim(),
        content: content.trim(),
        tags: tags.filter(Boolean),
      };

      if (id) {
        await updateNote(id as string, noteData);
      } else {
        await createNote(noteData);
      }

      router.back();
    } catch (err) {
      setError('Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Note title"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="Write your note..."
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.tagsSection}>
          <Text style={styles.label}>Tags</Text>
          <View style={styles.tagInput}>
            <TextInput
              style={styles.tagInputField}
              value={newTag}
              onChangeText={setNewTag}
              placeholder="Add a tag"
              onSubmitEditing={addTag}
            />
            <TouchableOpacity
              style={styles.addTagButton}
              onPress={addTag}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsList}>
            {tags.map(tag => (
              <TouchableOpacity
                key={tag}
                style={styles.tag}
                onPress={() => removeTag(tag)}
              >
                <Text style={styles.tagText}>{tag}</Text>
                <X size={16} color="#0B3D91" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.back()}
        >
          <X size={24} color="#E53E3E" />
          <Text style={[styles.actionText, styles.cancelText]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.saveButton]}
          onPress={handleSave}
          disabled={loading}
        >
          <Save size={24} color="#FFFFFF" />
          <Text style={[styles.actionText, styles.saveText]}>
            {loading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B4B4B',
    marginBottom: 8,
  },
  titleInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    padding: 12,
  },
  contentInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    padding: 12,
    minHeight: 200,
  },
  tagsSection: {
    marginBottom: 24,
  },
  tagInput: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tagInputField: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  addTagButton: {
    backgroundColor: '#0B3D91',
    width: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#0B3D91',
  },
  actionText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginLeft: 8,
  },
  saveText: {
    color: '#FFFFFF',
  },
  cancelText: {
    color: '#E53E3E',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E53E3E',
    textAlign: 'center',
    marginTop: 16,
  },
});