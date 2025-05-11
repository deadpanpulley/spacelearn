import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export function CoursesProgress() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Learning Progress</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.coursesList}>
        <CourseProgressItem
          title="Intro to Astronomy"
          progress={75}
          daysLeft={5}
        />
        
        <CourseProgressItem
          title="Rocket Science Basics"
          progress={35}
          daysLeft={12}
        />
        
        <CourseProgressItem
          title="Mars Exploration"
          progress={10}
          daysLeft={21}
        />
      </View>
    </View>
  );
}

type CourseProgressItemProps = {
  title: string;
  progress: number;
  daysLeft: number;
};

function CourseProgressItem({ title, progress, daysLeft }: CourseProgressItemProps) {
  return (
    <TouchableOpacity style={styles.courseItem}>
      <View style={styles.courseDetails}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.courseDays}>{daysLeft} days left</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${progress}%` }]} 
            />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </View>
      
      <View style={styles.iconContainer}>
        <ChevronRight size={20} color="#0B3D91" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0B3D91',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
  },
  coursesList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  courseDays: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#71717A',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E6E6E6',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0B3D91',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#71717A',
    width: 32,
  },
  iconContainer: {
    marginLeft: 8,
  },
});