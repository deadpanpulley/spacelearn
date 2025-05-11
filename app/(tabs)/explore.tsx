import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SearchBar } from '@/components/SearchBar';
import { Plane as Planet, Star, Rocket, Moon } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8;

export default function ExploreScreen() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.searchContainer}>
        <SearchBar placeholder="Search planets, stars, galaxies..." />
      </View>
      
      <Animated.View entering={FadeInDown.duration(600).delay(200)}>
        <Text style={styles.sectionTitle}>Featured Discoveries</Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredContainer}
        >
          <FeatureCard
            title="Jupiter's Great Red Spot"
            description="A persistent high-pressure region in the atmosphere of Jupiter"
            image="https://images.pexels.com/photos/13392358/pexels-photo-13392358.jpeg"
            delay={300}
          />
          
          <FeatureCard
            title="Black Hole at Galaxy M87"
            description="First-ever image of a black hole captured by Event Horizon Telescope"
            image="https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg"
            delay={400}
          />
          
          <FeatureCard
            title="Water on Mars"
            description="Evidence of liquid water beneath Mars' south polar ice cap"
            image="https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg"
            delay={500}
          />
        </ScrollView>
      </Animated.View>
      
      <Animated.View entering={FadeInDown.duration(600).delay(600)} style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Explore By Category</Text>
        
        <View style={styles.categories}>
          <CategoryButton
            icon={<Planet size={32} color="#0B3D91" />}
            title="Planets"
            delay={700}
          />
          
          <CategoryButton
            icon={<Star size={32} color="#0B3D91" />}
            title="Stars"
            delay={800}
          />
          
          <CategoryButton
            icon={<Rocket size={32} color="#0B3D91" />}
            title="Missions"
            delay={900}
          />
          
          <CategoryButton
            icon={<Moon size={32} color="#0B3D91" />}
            title="Moons"
            delay={1000}
          />
        </View>
      </Animated.View>
      
      <Animated.View entering={FadeInDown.duration(600).delay(700)}>
        <Text style={styles.sectionTitle}>Space News</Text>
        
        <View style={styles.newsList}>
          <NewsItem
            title="NASA's Artemis Program Updates"
            date="2 days ago"
            image="https://images.pexels.com/photos/355906/pexels-photo-355906.jpeg"
            delay={800}
          />
          
          <NewsItem
            title="New Exoplanet Discovered in Habitable Zone"
            date="1 week ago"
            image="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg"
            delay={900}
          />
          
          <NewsItem
            title="SpaceX Successfully Lands Starship Prototype"
            date="2 weeks ago"
            image="https://images.pexels.com/photos/586056/pexels-photo-586056.jpeg"
            delay={1000}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
  delay: number;
};

function FeatureCard({ title, description, image, delay }: FeatureCardProps) {
  return (
    <Animated.View 
      entering={FadeInRight.duration(500).delay(delay)}
      style={styles.featureCard}
    >
      <Image
        source={{ uri: image }}
        style={styles.featureImage}
        resizeMode="cover"
      />
      <View style={styles.featureOverlay} />
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
        <TouchableOpacity style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

type CategoryButtonProps = {
  icon: React.ReactNode;
  title: string;
  delay: number;
};

function CategoryButton({ icon, title, delay }: CategoryButtonProps) {
  return (
    <Animated.View entering={FadeInDown.duration(500).delay(delay)}>
      <TouchableOpacity style={styles.categoryButton}>
        <View style={styles.categoryIcon}>
          {icon}
        </View>
        <Text style={styles.categoryText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

type NewsItemProps = {
  title: string;
  date: string;
  image: string;
  delay: number;
};

function NewsItem({ title, date, image, delay }: NewsItemProps) {
  return (
    <Animated.View 
      entering={FadeInDown.duration(500).delay(delay)}
      style={styles.newsItem}
    >
      <Image
        source={{ uri: image }}
        style={styles.newsImage}
        resizeMode="cover"
      />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{title}</Text>
        <Text style={styles.newsDate}>{date}</Text>
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
    paddingBottom: 32,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#0B3D91',
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0B3D91',
    marginBottom: 16,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  featuredContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  featureCard: {
    width: cardWidth,
    height: 220,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featureImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  featureContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 2,
  },
  featureTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 12,
  },
  learnMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  categoriesSection: {
    marginTop: 8,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: width / 2 - 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    marginBottom: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#0B3D91',
  },
  newsList: {
    paddingHorizontal: 16,
  },
  newsItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  newsContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  newsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  newsDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#71717A',
  },
});