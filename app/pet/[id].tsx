import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { supabase } from '../../utils/supabase';

export default function PetDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pet, setPet] = useState<any>(null);

  useEffect(() => {
    supabase.from('pets').select('*').eq('id', id).single().then(({ data }) => setPet(data));
  }, [id]);

  if (!pet) return null;

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Image source={{ uri: pet.image }} style={{ width: '100%', height: 240, borderRadius: 12 }} />
      <Text style={{ fontSize: 24, fontWeight: '600' }}>{pet.name}</Text>
      <Text>{pet.breed} — {pet.age} yrs</Text>
      <Text>{pet.description}</Text>

      {pet.adopted ? (
        <Text style={{ color: 'green', fontWeight: 'bold' }}>Already adopted ❤️</Text>
      ) : (
        <Link href={`/adopt/${id}`} asChild>
          <Button title="Adopt me" />
        </Link>
      )}
    </View>
  );
}
