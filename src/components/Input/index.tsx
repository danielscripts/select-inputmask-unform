import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps, Text, StyleSheet } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  label: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputMask: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, label, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  //  const inputElementRef = useRef<InputValueReference>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <Container isFocused={isFocused} isErrored={!!error}>
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#ff9000' : '#c2bcb8'}
        />
        <TextInput
          ref={inputElementRef}
          placeholderTextColor="#c2bcb8"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default forwardRef(InputMask);
