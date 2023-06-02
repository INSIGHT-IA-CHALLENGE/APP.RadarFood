import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { theme } from '../styles/theme'

// type Props = {
//     placeholder: string,
//     password?: boolean,
//     children?: React.ReactNode
// }

export default function Input(props) {
  return (
    <TextInput 
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor="#555"
        secureTextEntry={props.password ?? false}
        value = {props.value}
        onChangeText={props.onChange}
        keyboardType={props.keyboard ?? 'default'}
    >
        {props.children}
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
        width: '100%'
    }
})