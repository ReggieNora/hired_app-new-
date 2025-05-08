import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import { candidates } from '../../data/users';
import CandidateCard from '../../components/CandidateCard';
import EmptyState from '../../components/EmptyState';
import { Search, Filter } from 'lucide-react-native';

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default function HomeScreen() {
  const [users, setUsers] = useState([...candidates]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEmptyState, setShowEmptyState] = useState(false);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    setShowEmptyState(currentIndex >= users.length);
  }, [currentIndex, users]);

  const handleSwipeLeft = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleSwipeRight = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const resetCards = () => {
    setUsers([...candidates]);
    setCurrentIndex(0);
    setShowEmptyState(false);
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={styles.header}
        entering={FadeIn.duration(500).delay(200)}
      >
        <Text style={styles.title}>Hired</Text>
        <View style={styles.headerButtons}>
          <View style={styles.iconButton}>
            <Search size={24} color={Colors.gray[700]} />
          </View>
          <View style={styles.iconButton}>
            <Filter size={24} color={Colors.gray[700]} />
          </View>
        </View>
      </Animated.View>

      <View style={styles.cardsContainer}>
        {showEmptyState ? (
          <EmptyState onReset={resetCards} />
        ) : (
          users
            .slice(currentIndex, currentIndex + 2)
            .map((user, index) => {
              const isFirst = index === 0;
              const zIndex = 2 - index;
              return (
                <CandidateCard
                  key={user.id}
                  user={user}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  isFirst={isFirst}
                  zIndex={zIndex}
                />
              );
            })
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
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
    marginLeft: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: WINDOW_HEIGHT * 0.7,
  },
});
