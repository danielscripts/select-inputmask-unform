import React, { useRef, useEffect } from 'react';
import { Text } from 'react-native';
import { useField } from '@unform/core';
import { TextInputMask } from 'react-native-masked-text';

const InputMask = ({ name, label, ...rest }) => {
  let inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    console.log('registrou :', fieldName);
    // console.log('inputRef :', inputRef.current);
    registerField({
      name: fieldName,
      ref: inputRef,
      path: '_lastNativeText',
      getValue(ref) {
        console.log('ref getValue :');
        return ref?._inputElement?._lastNativeText || '';
      },
      setValue(ref, value) {
        console.log('ref setValue :');
        // console.log('value setValue :', value);
        ref?._inputElement?.setNativeProps({ text: value });
        ref._inputElement._lastNativeText = value;
      },
      clearValue(ref) {
        console.log('ref clearValue :');
        ref?._inputElement.setNativeProps({ text: '' });
        ref._inputElement._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Text>{label}</Text>}

      {/* <TextInput ref={inputRef} defaultValue={defaultValue} {...rest} /> */}
      <TextInputMask
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
        ref={ref => (inputRef = ref)}
        {...rest}
        // value={this.state.international}
        // onChangeText={(text) => {
        //   this.setState({
        //     international: text,
        //   });
        // }}
      />
    </>
  );
};

export default InputMask;
