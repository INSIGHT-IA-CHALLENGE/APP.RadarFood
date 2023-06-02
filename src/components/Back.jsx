import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Back(props) {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
        <MaterialIcons name="keyboard-arrow-left" style={styles.icon} />
        <Text style={styles.text}>Voltar</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({

    button:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30,
    },

    text: {
        fontFamily: 'Poppins-Bold',
        color: '#FFF',
        fontSize: 12,
    },

    icon:{
        color: '#FFF',
        fontSize: 18,
    }
});