import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Plus, Search, Tag, Trash2, CreditCard as Edit2 } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getNotes, deleteNote, type Note } from '@/lib/notes';

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes(search, selectedTags);
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [search, selectedTags]);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  const allTags = Array.from(
    new Set(notes.flatMap(note => note.tags || []))
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#71717A" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notes..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {allTags.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tagsContainer}
          contentContainerStyle={styles.tagsContent}
        >
          {allTags.map(tag => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagChip,
                selectedTags.includes(tag) && styles.tagChipSelected
              ]}
              onPress={() => {
                setSelectedTags(prev =>
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                );
              }}
            >
              <Tag size={16} color={selectedTags.includes(tag) ? '#FFFFFF' : '#0B3D91'} />
              <Text style={[
                styles.tagText,
                selectedTags.includes(tag) && styles.tagTextSelected
              ]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <ScrollView style={styles.notesList}>
        {notes.map((note, index) => (
          <Animated.View
            key={note.id}
            entering={FadeInDown.delay(index * 100)}
            style={styles.noteCard}
          >
            <TouchableOpacity
              onPress={() => router.push(`/notes/${note.id}`)}
              style={styles.noteContent}
            >
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.notePreview} numberOfLines={2}>
                {note.content}
              </Text>
              
              {note.tags && note.tags.length > 0 && (
                <View style={styles.noteTags}>
                  {note.tags.map(tag => (
                    <View key={tag} style={styles.noteTag}>
                      <Text style={styles.noteTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              <Text style={styles.noteDate}>
                {new Date(note.updated_at).toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <View style={styles.noteActions}>
              <TouchableOpacity
                onPress={() => router.push(`/notes/edit?id=${note.id}`)}
                style={styles.actionButton}
              >
                <Edit2 size={20} color="#0B3D91" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => handleDelete(note.id)}
                style={[styles.actionButton, styles.deleteButton]}
              >
                <Trash2 size={20} color="#E53E3E" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/notes/edit')}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  tagsContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tagsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagChipSelected: {
    backgroundColor: '#0B3D91',
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
    marginLeft: 4,
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
  notesList: {
    flex: 1,
    padding: 16,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noteContent: {
    padding: 16,
  },
  noteTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0B3D91',
    marginBottom: 8,
  },
  notePreview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B4B4B',
    marginBottom: 12,
  },
  noteTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  noteTag: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  noteTagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#0B3D91',
  },
  noteDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#71717A',
  },
  noteActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  deleteButton: {
    borderRightWidth: 0,
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
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E53E3E',
    textAlign: 'center',
    marginTop: 16,
  },
});