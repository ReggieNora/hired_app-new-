import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

// This is a basic splash/entry point
// We immediately redirect to welcome screen
export default function Index() {
  return <Redirect href="/welcome" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});