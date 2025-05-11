import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BookOpen, Clock, Award } from 'lucide-react-native';

export function ProfileStats() {
  return (
    <View style={styles.container}>
      <StatItem 
        icon={<BookOpen size={24} color="#0B3D91" />}
        value="3"
        label="Courses"
      />
      
      <View style={styles.divider} />
      
      <StatItem 
        icon={<Clock size={24} color="#0B3D91" />}
        value="15h 32m"
        label="Learning Time"
      />
      
      <View style={styles.divider} />
      
      <StatItem 
        icon={<Award size={24} color="#0B3D91" />}
        value="2"
        label="Certificates"
      />
    </View>
  );
}

type StatItemProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0B3D91',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#71717A',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5E5',
  },
});