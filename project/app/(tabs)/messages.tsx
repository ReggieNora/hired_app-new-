import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../../constants/Colors';
import { MessageSquare } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Message {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread: boolean;
}

// Sample messages data
const messages: Message[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    message: 'Thanks for considering me! When would you like to schedule an interview?',
    time: '10:30 AM',
    unread: true,
  },
  {
    id: '2',
    name: 'David Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    message: 'I\'ve attached my portfolio as requested.',
    time: 'Yesterday',
    unread: false,
  },
];

export default function MessagesScreen() {
  const renderItem = ({ item, index }: { item: Message; index: number }) => (
    <Animated.View 
      entering={FadeInDown.duration(400).delay(index * 100)}
    >
      <TouchableOpacity style={styles.messageCard}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {item.unread && <View style={styles.unreadBadge} />}
        </View>
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text 
            style={[styles.message, item.unread && styles.unreadMessage]} 
            numberOfLines={1}
          >
            {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.iconContainer}>
        <MessageSquare size={32} color={Colors.gray[400]} />
      </View>
      <Text style={styles.emptyTitle}>No messages yet</Text>
      <Text style={styles.emptySubtitle}>
        When you match with candidates, your conversations will appear here.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={ListEmptyComponent}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray[900],
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  messageCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  time: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  message: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  unreadMessage: {
    color: Colors.gray[900],
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 100,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gray[800],
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
    maxWidth: '80%',
  },
});