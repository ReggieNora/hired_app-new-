import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import type { User } from '../types/data';
import Colors from '../constants/Colors';
import { X, Check } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface CardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isFirst: boolean;
}

export default function CandidateCard({ 
  user, 
  onSwipeLeft, 
  onSwipeRight, 
  isFirst 
}: CardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(isFirst ? 1 : 0.9);
  
  const panGesture = Gesture.Pan()
    .enabled(isFirst)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotation.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-10, 0, 10],
        Extrapolate.CLAMP
      );
    })
    .onEnd((event) => {
      if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH * 1.5, {}, () => {
          runOnJS(onSwipeLeft)();
        });
      } else if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH * 1.5, {}, () => {
          runOnJS(onSwipeRight)();
        });
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });
  
  React.useEffect(() => {
    scale.value = withSpring(isFirst ? 1 : 0.9);
  }, [isFirst]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const likeOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  const nopeOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));
  
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: user.avatar }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          <Text style={styles.role}>{user.role}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
        
        <Animated.View style={[styles.actionOverlay, styles.likeOverlay, likeOpacityStyle]}>
          <View style={styles.actionBadge}>
            <Check size={32} color="white" />
            <Text style={styles.actionText}>HIRE</Text>
          </View>
        </Animated.View>
        
        <Animated.View style={[styles.actionOverlay, styles.nopeOverlay, nopeOpacityStyle]}>
          <View style={styles.actionBadge}>
            <X size={32} color="white" />
            <Text style={styles.actionText}>PASS</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderRadius: 20,
    backgroundColor: Colors.white,
    position: 'absolute',
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
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
    marginBottom: 8,
    fontWeight: '600',
  },
  bio: {
    fontSize: 14,
    color: Colors.gray[700],
    lineHeight: 20,
  },
  actionOverlay: {
    position: 'absolute',
    top: 40,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  likeOverlay: {
    right: 20,
  },
  nopeOverlay: {
    left: 20,
  },
  actionText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});