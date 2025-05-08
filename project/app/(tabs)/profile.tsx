import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, SafeAreaView } from 'react-native';
import Colors from '../../constants/Colors';
import { ChevronRight, Settings, Edit2, User, Award, Briefcase, LogOut } from 'lucide-react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';

interface MenuItem {
  id: string;
  label: string;
  icon: JSX.Element;
  route?: string;
}

export default function ProfileScreen() {
  // Menu items with icons
  const menuItems: MenuItem[] = [
    {
      id: 'edit-profile',
      label: 'Edit Profile',
      icon: <Edit2 size={22} color={Colors.gray[600]} />,
    },
    {
      id: 'hiring-criteria',
      label: 'Hiring Criteria',
      icon: <Award size={22} color={Colors.gray[600]} />,
    },
    {
      id: 'company-profile',
      label: 'Company Profile',
      icon: <Briefcase size={22} color={Colors.gray[600]} />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={22} color={Colors.gray[600]} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.duration(500)}>
          <View style={styles.header}>
            <View style={styles.headerButtons}>
              <Pressable style={styles.iconButton}>
                <Settings size={24} color={Colors.gray[700]} />
              </Pressable>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.profileHeader}
          entering={FadeIn.duration(600).delay(100)}
        >
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
              style={styles.avatar} 
            />
            <View style={styles.editAvatarButton}>
              <Edit2 size={16} color={Colors.white} />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Alex Morgan</Text>
            <Text style={styles.role}>HR Manager</Text>
            <Text style={styles.company}>TechVision Inc.</Text>
          </View>
        </Animated.View>

        <View style={styles.statsContainer}>
          <Animated.View 
            style={styles.statItem}
            entering={FadeInRight.duration(400).delay(200)}
          >
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Candidates</Text>
          </Animated.View>
          
          <View style={styles.statDivider} />
          
          <Animated.View 
            style={styles.statItem}
            entering={FadeInRight.duration(400).delay(300)}
          >
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Matched</Text>
          </Animated.View>
          
          <View style={styles.statDivider} />
          
          <Animated.View 
            style={styles.statItem}
            entering={FadeInRight.duration(400).delay(400)}
          >
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Hired</Text>
          </Animated.View>
        </View>
        
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Account</Text>
          
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.duration(400).delay(300 + (index * 100))}
            >
              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  {item.icon}
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color={Colors.gray[400]} />
              </Pressable>
            </Animated.View>
          ))}
          
          <Animated.View entering={FadeInRight.duration(400).delay(800)}>
            <Pressable style={[styles.menuItem, styles.logoutItem]}>
              <View style={styles.menuItemLeft}>
                <LogOut size={22} color={Colors.error} />
                <Text style={[styles.menuItemLabel, styles.logoutLabel]}>Logout</Text>
              </View>
            </Pressable>
          </Animated.View>
        </View>
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
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: Colors.gray[200],
    alignSelf: 'center',
  },
  menuContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: Colors.gray[800],
    marginLeft: 12,
  },
  logoutItem: {
    marginTop: 16,
    marginBottom: 30,
    backgroundColor: 'rgba(244, 67, 54, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.2)',
  },
  logoutLabel: {
    color: Colors.error,
  },
});