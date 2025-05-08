import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Animated, { FadeIn } from 'react-native-reanimated';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(500)}
    >
      <View style={styles.iconContainer}>
        <X size={40} color={Colors.gray[400]} />
      </View>
      <Text style={styles.title}>No more candidates</Text>
      <Text style={styles.subtitle}>
        You've viewed all available candidates for now.
      </Text>
      <Pressable style={styles.button} onPress={onReset}>
        <Text style={styles.buttonText}>Reload Candidates</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray[800],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: '80%',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});