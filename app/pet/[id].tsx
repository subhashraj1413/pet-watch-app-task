import ScreenHeader from '@/components/ScreenHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPublicImageUrl, supabase } from '@/utils/supabase';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Button as PaperButton, useTheme } from 'react-native-paper';


export default function PetDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pet, setPet] = useState<any>(null);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const theme = useTheme();
  useEffect(() => {
    supabase.from('pets').select('*').eq('id', id).single().then(({ data }) => setPet(data));
  }, [id]);

  useEffect(() => {
    if (pet?.image_url) {
      const { publicUrl } = getPublicImageUrl(pet.image_url);
      setImageUri(publicUrl);
    }
  }, [pet]);


  if (!pet) {
    return (
      <ThemedView style={styles.loaderContainer}>
        <ActivityIndicator animating size="large" color={theme.colors.primary} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScreenHeader title={pet.name} />

      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          {imageUri ? (
            <Card.Cover source={{ uri: imageUri }} style={styles.cover} />
          ) : (
            <ActivityIndicator animating size="large" style={styles.coverPlaceholder} />
          )}

          <Card.Title title={pet.name} subtitle={`${pet.breed} — ${pet.age} yrs`} />

          <Card.Content>

            <ThemedText style={styles.description}>{pet.description}</ThemedText>
          </Card.Content>

          <Card.Actions style={styles.actions}>
            {pet.is_adopted ? (
              <ThemedText style={[styles.adoptedText, { color: theme.colors.error }]}>
                Adopted ❤️
              </ThemedText>
            ) : (
              <Link href={`/adopt/${id}`} asChild>
                <PaperButton mode="contained" buttonColor={theme.colors.primary}>
                  Adopt me
                </PaperButton>
              </Link>
            )}
          </Card.Actions>
        </Card>
      </ScrollView>
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 16 },
  card: { borderRadius: 12, overflow: 'hidden' },
  cover: { height: 240 },
  coverPlaceholder: { height: 240, justifyContent: 'center' },
  title: { fontSize: 24, marginTop: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 12 },
  description: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  actions: { justifyContent: 'flex-end', padding: 16 },
  adoptedText: { fontSize: 18, fontWeight: '600' },
});