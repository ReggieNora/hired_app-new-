import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { BarChart2, Users, Eye, FileText } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';

// Mock data
const jobPostsData = {
  activeJobs: 5,
  totalViews: 1250,
  totalApplications: 86,
  matchedCandidates: 12,
  recentActivity: [
    { id: '1', type: 'application', message: 'New application for Senior Developer position', time: '2h ago' },
    { id: '2', type: 'view', message: 'Product Manager job post reached 100 views', time: '4h ago' },
    { id: '3', type: 'match', message: 'New match with UX Designer candidate', time: '1d ago' },
    { id: '4', type: 'application', message: 'New application for Marketing Lead position', time: 'Yesterday' },
  ],
};

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={styles.header}
          entering={FadeIn.duration(500)}
        >
          <Text style={styles.title}>Dashboard</Text>
        </Animated.View>

        <View style={styles.statsGrid}>
          {/* Active Jobs */}
          <Animated.View 
            style={[styles.statCard, styles.statCardWide]}
            entering={FadeInRight.duration(400).delay(100)}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(103, 58, 183, 0.1)' }]}>
              <FileText size={24} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.statTitle}>Active Job Posts</Text>
              <Text style={styles.statNumber}>{jobPostsData.activeJobs}</Text>
            </View>
          </Animated.View>

          {/* Total Views */}
          <Animated.View 
            style={styles.statCard}
            entering={FadeInRight.duration(400).delay(200)}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
              <Eye size={24} color={Colors.success} />
            </View>
            <Text style={styles.statTitle}>Total Views</Text>
            <Text style={styles.statNumber}>{jobPostsData.totalViews}</Text>
          </Animated.View>

          {/* Applications */}
          <Animated.View 
            style={styles.statCard}
            entering={FadeInRight.duration(400).delay(300)}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 111, 97, 0.1)' }]}>
              <BarChart2 size={24} color={Colors.accent} />
            </View>
            <Text style={styles.statTitle}>Applications</Text>
            <Text style={styles.statNumber}>{jobPostsData.totalApplications}</Text>
          </Animated.View>

          {/* Matched */}
          <Animated.View 
            style={styles.statCard}
            entering={FadeInRight.duration(400).delay(400)}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.1)' }]}>
              <Users size={24} color={Colors.warning} />
            </View>
            <Text style={styles.statTitle}>Matched</Text>
            <Text style={styles.statNumber}>{jobPostsData.matchedCandidates}</Text>
          </Animated.View>
        </View>

        <Animated.View 
          style={styles.activityContainer}
          entering={FadeInRight.duration(400).delay(500)}
        >
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {jobPostsData.recentActivity.map((activity, index) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityMessage}>{activity.message}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.gray[900],
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    width: '47%',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statCardWide: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray[900],
  },
  activityContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginRight: 12,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  activityMessage: {
    fontSize: 14,
    color: Colors.gray[800],
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: Colors.gray[500],
  },
});