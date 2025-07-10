import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { supabase } from '../../utils/supabase';

export default function Adopt() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    // pretend to talk to Stripe…
    await new Promise(r => setTimeout(r, 1500));
    await supabase.from('pets').update({ adopted: true }).eq('id', id);
    router.replace(`/pet/${id}`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Text style={{ fontSize: 22 }}>Adoption fee: $50</Text>
      {loading ? <ActivityIndicator size="large" /> : <Button title="Pay now" onPress={handlePay} />}
    </View>
  );
}
