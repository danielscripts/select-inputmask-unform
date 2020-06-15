import React, { useRef, useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';
import Input from './components/Input';
import InputMask from './components/InputMask';

import { Container, Title } from './styles';

import SelectPicker from './components/Select';

const App: React.FC = () => {
  const [hora, setHora] = useState('');
  const formRef = useRef<FormHandles>(null);

  const options = [
    { label: 'Java', value: 'java' },
    { label: 'Node', value: 'node' },
  ];

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <View>
              <Title>Simple Input with Unform</Title>
            </View>
            <Form
              ref={formRef}
              onSubmit={data => {
                console.log(data);
              }}
            >
              <Input
                icon="user"
                autoCapitalize="words"
                placeholder="input"
                name="input"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <View>
                <Title>Input Mask with Unform</Title>
              </View>

              <InputMask
                icon="mail"
                type="datetime"
                options={{
                  format: '99:99',
                }}
                value={hora}
                onChangeText={text => {
                  // console.log('text', text);
                  setHora(text);
                }}
                name="hora"
                style={{ borderWidth: 1, margin: 10, height: 50 }}
              />

              <View>
                <Title>Select picker with Unform</Title>
              </View>

              <View style={styles.container}>
                <SelectPicker name="pick" options={options} />
              </View>

              <View style={styles.button}>
                <Button
                  title="Cadastrar"
                  onPress={() => formRef.current?.submitForm()}
                />
              </View>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#232129',
    borderWidth: 2,
    borderRadius: 10,
  },

  button: {
    marginTop: 20,
  },
});

export default App;
