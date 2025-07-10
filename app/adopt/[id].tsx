// app/adopt/[id].tsx
import { supabase } from '@/utils/supabase';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

export default function Adopt() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();


  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');


  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const { data, error } = await supabase
      .from('pets')
      .update({ is_adopted: true })
      .eq('id', id);

    setLoading(false);
    setVisible(false);
    router.replace(`/pet/${id}`);
  };

  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        <Dialog.Title>Adoption Payment</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.fee}>Adoption fee: $50</Text>

          <TextInput
            label="Card Number"
            mode="outlined"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
            style={styles.input}
          />

          <View style={styles.row}>
            <TextInput
              label="Expiry (MM/YY)"
              mode="outlined"
              placeholder="MM/YY"
              value={expiry}
              onChangeText={setExpiry}
              style={[styles.input, styles.flexOne, { marginRight: 8 }]}
            />
            <TextInput
              label="CVV"
              mode="outlined"
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
              style={[styles.input, { width: 100 }]}
            />
          </View>
        </Dialog.Content>

        <Dialog.Actions>
          {loading ? (
            <ActivityIndicator animating size="large" color={theme.colors.primary} />
          ) : (
            <Button
              mode="contained"
              onPress={handleConfirm}
              disabled={!cardNumber || !expiry || !cvv}
            >
              Confirm Payment
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  fee: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
});
