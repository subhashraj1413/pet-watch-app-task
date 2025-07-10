
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Landing() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#FF7A66', '#FFB776']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safe}>
          
          <Image
            source={require('@/assets/images/landing-cats.png')}
            style={styles.image}
          />

          <View style={styles.content}>
            <Text style={styles.title}>
              Ready for a <Text style={styles.highlight}>pawsome</Text> experience?
            </Text>
            <Text style={styles.subtitle}>
              Our goal is to provide a sincere and ethical environment for pet owners and pet sitters to connect and ensure the best care for your furry friends.
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.buttonText}>Get started →</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 50,
   
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  highlight: {
    textDecorationLine: 'underline',
    color: '#FFDDCC',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFEFE8',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FF7A66',
    fontSize: 16,
    fontWeight: '600',
  },
});
