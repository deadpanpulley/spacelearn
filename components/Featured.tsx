import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Play } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export function Featured() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Featured Course</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <Animated.View 
        entering={FadeInRight.duration(600)}
        style={styles.featuredCard}
      >
        <Image
          source={{ uri: 'https://images.pexels.com/photos/41951/solar-system-emergence-spitzer-telescope-telescope-41951.jpeg' }}
          style={styles.featuredImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        
        <View style={styles.contentContainer}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>New</Text>
          </View>
          
          <Text style={styles.courseTitle}>Our Solar System</Text>
          <Text style={styles.courseDescription}>
            Explore the planets, moons, and other celestial bodies that make up our cosmic neighborhood.
          </Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>12 Lessons</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>4.8 ★</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>Beginner</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.playButton}>
            <Play size={18} color="#FFFFFF" />
            <Text style={styles.playButtonText}>Start Learning</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0B3D91',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 61, 145, 0.7)',
  },
  contentContainer: {
    padding: 16,
  },
  badgeContainer: {
    backgroundColor: '#4B0082',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  courseTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  courseDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  metaValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  playButton: {
    backgroundColor: '#4B0082',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  playButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});