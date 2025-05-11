import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Brain, Clock, Target } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SearchBar } from '@/components/SearchBar';

export default function HomeScreen() {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] || 'Student';

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Animated.View 
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.welcomeContainer}
        >
          <Text style={styles.welcomeText}>
            Welcome back, <Text style={styles.nameText}>{firstName}</Text>
          </Text>
          <Text style={styles.subtitleText}>Ready to continue learning?</Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <SearchBar placeholder="Search your notes and materials..." />
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.duration(600).delay(600)} style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.statsContainer}>
          <StatItem 
            title="Study Time"
            value="2.5h"
            icon={<Clock size={24} color="#4B0082" />}
            color="#F0E6FF"
          />
          <StatItem 
            title="Notes Created"
            value="3"
            icon={<BookOpen size={24} color="#046307" />}
            color="#E6FFEA"
          />
          <StatItem 
            title="Reviews Due"
            value="8"
            icon={<Brain size={24} color="#0B3D91" />}
            color="#E6F0FF"
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(600).delay(800)} style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Notes</Text>
        <View style={styles.recentNotes}>
          <NotePreview
            title="Biology Chapter 5"
            preview="Cell structure and function..."
            timestamp="2h ago"
            color="#E6FFEA"
          />
          <NotePreview
            title="History Essay Notes"
            preview="World War II impact on..."
            timestamp="5h ago"
            color="#F0E6FF"
          />
          <NotePreview
            title="Math Formulas"
            preview="Trigonometry basics and..."
            timestamp="Yesterday"
            color="#E6F0FF"
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(600).delay(1000)} style={styles.studySection}>
        <Text style={styles.sectionTitle}>Study Methods</Text>
        <View style={styles.methodsContainer}>
          <MethodItem 
            title="Active Recall" 
            description="Test yourself on key concepts"
            icon={<Target size={24} color="#4B0082" />}
            color="#F0E6FF"
          />
          <MethodItem 
            title="Spaced Repetition" 
            description="Review at optimal intervals"
            icon={<Clock size={24} color="#046307" />}
            color="#E6FFEA"
          />
          <MethodItem 
            title="Mind Mapping" 
            description="Connect related concepts"
            icon={<Brain size={24} color="#0B3D91" />}
            color="#E6F0FF"
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}

interface StatItemProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

function StatItem({ title, value, icon, color }: StatItemProps) {
  return (
    <View style={[styles.statItem, { backgroundColor: color }]}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

interface NotePreviewProps {
  title: string;
  preview: string;
  timestamp: string;
  color: string;
}

function NotePreview({ title, preview, timestamp, color }: NotePreviewProps) {
  return (
    <View style={[styles.notePreview, { backgroundColor: color }]}>
      <Text style={styles.noteTitle}>{title}</Text>
      <Text style={styles.notePreview} numberOfLines={1}>{preview}</Text>
      <Text style={styles.noteTimestamp}>{timestamp}</Text>
    </View>
  );
}

interface MethodItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

function MethodItem({ title, description, icon, color }: MethodItemProps) {
  return (
    <View style={[styles.methodItem, { backgroundColor: color }]}>
      <View style={styles.methodIcon}>{icon}</View>
      <Text style={styles.methodTitle}>{title}</Text>
      <Text style={styles.methodDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  headerContainer: {
    backgroundColor: '#0B3D91',
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  nameText: {
    fontFamily: 'Inter-Bold',
  },
  subtitleText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 4,
  },
  statsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0B3D91',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333333',
    marginBottom: 4,
  },
  statTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
  },
  recentSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  recentNotes: {
    gap: 12,
  },
  notePreview: {
    padding: 16,
    borderRadius: 16,
  },
  noteTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  notePreview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  noteTimestamp: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#999999',
  },
  studySection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  methodsContainer: {
    gap: 12,
  },
  methodItem: {
    padding: 16,
    borderRadius: 16,
  },
  methodIcon: {
    marginBottom: 12,
  },
  methodTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 4,
  },
  methodDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
});