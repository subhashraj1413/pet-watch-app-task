import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../../utils/supabase';

type Pet = { id: number; name: string; breed: string; image: string };

export default function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    supabase.from('pets').select('*').then(({ data, error }) => {
      if (!error && data) setPets(data);
    });
  }, []);

  console.log('Pets:', pets);

  return (
    
    <FlatList
      data={pets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Link href={`/pet/${item.id}`} asChild>
          <TouchableOpacity style={{ flexDirection: 'row', padding: 12 }}>
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 10 }} />
            <Text style={{ fontSize: 20, marginLeft: 12 }}>{item.name}</Text>
          </TouchableOpacity>
        </Link>
      )}
    />
  );
}
