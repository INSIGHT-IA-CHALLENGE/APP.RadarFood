import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { theme } from '../styles/theme'

// type Props = {
//     placeholder: string,
//     password?: boolean,
//     children?: React.ReactNode
// }

export default function Input({placeholder, password, children, value, onChange, keyboard, style}) {
  return (
    <TextInput 
        style={[styles.input, style]}
        placeholder={placeholder}
        secureTextEntry={password ?? false}
        value = {value}
        onChangeText={onChange}
        keyboardType={keyboard ?? 'default'}
        placeholderTextColor={theme.colors.gray}
    >
        {children}
    </TextInput>
  )
}

const styles = StyleSheet.create({
    input:{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 5,
        fontFamily: theme.fonts.roboto.regular,
        fontSize: 16,
        color: theme.colors.black,
        width: '100%',
    }
})