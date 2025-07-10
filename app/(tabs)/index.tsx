// app/index.tsx (or wherever your pets list lives)
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, useTheme } from 'react-native-paper';

import ScreenHeader from '@/components/ScreenHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPublicImageUrl, supabase } from '@/utils/supabase';

type Pet = {
  id: number;
  name: string;
  breed: string;
  image_url: string;
  is_adopted: boolean;
  publicUrl?: string;
};

export default function PetList() {
  const [pets, setPets] = useState<Pet[] | null>(null);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('pets').select('*');
      if (error) {
        console.error(error);
        return;
      }
      const withUrls = data.map((pet) => {
        const { publicUrl } = getPublicImageUrl(pet.image_url);
        return { ...pet, publicUrl };
      });
      setPets(withUrls);
    })();
  }, []);

  if (pets === null) {
    return (
      <ThemedView style={styles.loader}>
        <ActivityIndicator animating size="large" color={theme.colors.primary} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, paddingBottom: 40 }}>
      <ScreenHeader title="Explore Pets" />

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push(`/pet/${item.id}`)}>
            {item.publicUrl ? (
              <Card.Cover source={{ uri: item.publicUrl }} style={styles.cover} borderRadius={0} />
            ) : (
              <ActivityIndicator animating style={styles.coverPlaceholder} />
            )}

            <Card.Content>
              <ThemedText variant="titleMedium">{item.name}</ThemedText>
              <ThemedText variant="bodyMedium">{item.breed}</ThemedText>
            </Card.Content>
          </Card>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  card: {
    marginBottom: 16,
    borderRadius: 0,
    overflow: 'hidden',
  },
  cover: {
    height: 200,
  },
  coverPlaceholder: {
    height: 200,
    justifyContent: 'center',
  },
});
