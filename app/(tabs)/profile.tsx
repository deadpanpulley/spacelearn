import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Award, BookOpen, Clock, Settings } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ProfileStats } from '@/components/ProfileStats';
import { CoursesProgress } from '@/components/CoursesProgress';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const email = user?.email || 'user@example.com';
  const firstName = email.split('@')[0] || 'User';

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Animated.View 
          entering={FadeInDown.duration(500).delay(200)}
          style={styles.profileImageContainer}
        >
          <Text style={styles.profileInitial}>{firstName.charAt(0).toUpperCase()}</Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <Text style={styles.userName}>{firstName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(600)}>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => {/* Navigate to edit profile */}}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.duration(500).delay(800)}>
        <ProfileStats />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(500).delay(1000)}>
        <CoursesProgress />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(500).delay(1200)} style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.menuContainer}>
          <MenuItem 
            icon={<Settings size={24} color="#0B3D91" />}
            title="Account Settings"
            onPress={() => {/* Navigate to account settings */}}
          />
          
          <MenuItem 
            icon={<Award size={24} color="#0B3D91" />}
            title="Achievements"
            onPress={() => {/* Navigate to achievements */}}
          />
          
          <MenuItem 
            icon={<BookOpen size={24} color="#0B3D91" />}
            title="Saved Content"
            onPress={() => {/* Navigate to saved content */}}
          />
          
          <MenuItem 
            icon={<Clock size={24} color="#0B3D91" />}
            title="Learning History"
            onPress={() => {/* Navigate to learning history */}}
          />
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <LogOut size={20} color="#E53E3E" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
};

function MenuItem({ icon, title, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        {icon}
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </TouchableOpacity>
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
  header: {
    backgroundColor: '#0B3D91',
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4B0082',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    fontFamily: 'Inter-Bold',
    fontSize: 40,
    color: '#FFFFFF',
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 16,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    fontSize: 14,
  },
  menuSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0B3D91',
    marginBottom: 16,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  menuIconContainer: {
    marginRight: 16,
  },
  menuTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#E53E3E',
    marginLeft: 8,
  },
});