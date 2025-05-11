import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Share2, CreditCard as Edit2, Trash2 } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import type { Note } from '@/lib/notes';

export default function NoteScreen() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNote();
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
      setNote(data);
    } catch (err) {
      setError('Failed to load note');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!note) return;
    
    try {
      await Share.share({
        title: note.title,
        message: `${note.title}\n\n${note.content}`,
      });
    } catch (err) {
      setError('Failed to share note');
    }
  };

  const handleDelete = async () => {
    if (!note) return;

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', note.id);

      if (error) throw error;
      router.back();
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !note) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error || 'Note not found'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{note.title}</Text>
        
        {note.tags && note.tags.length > 0 && (
          <View style={styles.tags}>
            {note.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.metadata}>
          Last updated: {new Date(note.updated_at).toLocaleDateString()}
        </Text>
        
        <Text style={styles.noteContent}>{note.content}</Text>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShare}
        >
          <Share2 size={24} color="#0B3D91" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push(`/notes/edit?id=${note.id}`)}
        >
          <Edit2 size={24} color="#0B3D91" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Trash2 size={24} color="#E53E3E" />
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0B3D91',
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
  },
  metadata: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    marginBottom: 24,
  },
  noteContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  deleteButton: {
    borderRightWidth: 0,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E53E3E',
    textAlign: 'center',
    marginTop: 16,
  },
});