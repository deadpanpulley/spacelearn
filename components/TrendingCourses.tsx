import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

export function TrendingCourses() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Trending Courses</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.coursesList}
      >
        <CourseItem
          title="Black Holes Explained"
          lessons={8}
          image="https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg"
          delay={200}
        />
        
        <CourseItem
          title="Rocket Propulsion"
          lessons={10}
          image="https://images.pexels.com/photos/586056/pexels-photo-586056.jpeg"
          delay={400}
        />
        
        <CourseItem
          title="Lunar Exploration"
          lessons={6}
          image="https://images.pexels.com/photos/5388493/pexels-photo-5388493.jpeg"
          delay={600}
        />
      </ScrollView>
    </View>
  );
}

type CourseItemProps = {
  title: string;
  lessons: number;
  image: string;
  delay: number;
};

function CourseItem({ title, lessons, image, delay }: CourseItemProps) {
  return (
    <Animated.View 
      entering={FadeInRight.duration(600).delay(delay)}
      style={styles.courseItem}
    >
      <Image
        source={{ uri: image }}
        style={styles.courseImage}
        resizeMode="cover"
      />
      
      <View style={styles.courseDetails}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.lessonCount}>{lessons} lessons</Text>
      </View>
      
      <TouchableOpacity style={styles.enrollButton}>
        <Text style={styles.enrollText}>Enroll</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingLeft: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingRight: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0B3D91',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
  },
  coursesList: {
    paddingRight: 16,
  },
  courseItem: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseImage: {
    width: '100%',
    height: 120,
  },
  courseDetails: {
    padding: 12,
  },
  courseTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#0B3D91',
    marginBottom: 4,
  },
  lessonCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#71717A',
  },
  enrollButton: {
    backgroundColor: '#F5F5F7',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignItems: 'center',
  },
  enrollText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0B3D91',
  },
});