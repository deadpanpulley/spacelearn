import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CoursesScreen() {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.duration(500)}>
        <Text style={styles.sectionTitle}>My Courses</Text>

        <View style={styles.coursesList}>
          <CourseCard
            title="Intro to Astronomy"
            instructor="Dr. Neil Armstrong"
            progress={75}
            image="https://images.pexels.com/photos/2046671/pexels-photo-2046671.jpeg"
            delay={200}
          />
          
          <CourseCard
            title="Rocket Science Basics"
            instructor="Prof. Elon Musk"
            progress={35}
            image="https://images.pexels.com/photos/41005/rocket-launch-rocket-take-off-soyuz-41005.jpeg"
            delay={400}
          />
          
          <CourseCard
            title="Mars Exploration"
            instructor="Dr. Sarah Johnson"
            progress={10}
            image="https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg"
            delay={600}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(500).delay(300)} style={styles.recommendedSection}>
        <Text style={styles.sectionTitle}>Recommended For You</Text>
        
        <View style={styles.coursesList}>
          <CourseCard
            title="Black Holes Explained"
            instructor="Dr. Stephen Wells"
            progress={0}
            image="https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg"
            delay={800}
          />
          
          <CourseCard
            title="Space Station Operations"
            instructor="Cmdr. Jessica Watkins"
            progress={0}
            image="https://images.pexels.com/photos/23764/pexels-photo.jpg"
            delay={1000}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}

type CourseCardProps = {
  title: string;
  instructor: string;
  progress: number;
  image: string;
  delay: number;
};

function CourseCard({ title, instructor, progress, image, delay }: CourseCardProps) {
  return (
    <Animated.View 
      entering={FadeInDown.duration(500).delay(delay)}
      style={styles.courseCard}
    >
      <Image
        source={{ uri: image }}
        style={styles.courseImage}
        resizeMode="cover"
      />
      
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.instructorName}>{instructor}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
        
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>
            {progress > 0 ? 'Continue' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0B3D91',
    marginBottom: 16,
  },
  coursesList: {
    gap: 16,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseImage: {
    width: '100%',
    height: 160,
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0B3D91',
    marginBottom: 4,
  },
  instructorName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E6E6E6',
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0B3D91',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#71717A',
  },
  continueButton: {
    backgroundColor: '#0B3D91',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  recommendedSection: {
    marginTop: 32,
  },
});