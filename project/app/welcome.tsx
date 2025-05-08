import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import Colors from '../constants/Colors';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function WelcomeScreen() {
  const [userType, setUserType] = React.useState<'seeker' | 'employer' | null>(null);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  const handleContinue = (type: 'seeker' | 'employer') => {
    setUserType(type);
    router.replace('/login');
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(800)}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/favicon.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Hired</Text>
          <Text style={styles.subtitle}>
            Find your next opportunity or discover top talent
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.seekerButton]}
            onPress={() => handleContinue('seeker')}
          >
            <Text style={styles.buttonText}>Continue as Seeker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.employerButton]}
            onPress={() => handleContinue('employer')}
          >
            <Text style={styles.buttonText}>Continue as Employer</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    color: Colors.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
    maxWidth: '80%',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  seekerButton: {
    backgroundColor: Colors.primary,
  },
  employerButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
});