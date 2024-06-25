import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

const Input = () => {
  return (
    <View style={styles.container}>
        <Text>Escribe tu nombre</Text>
        <TextInput placeholder='Nombre' style={styles.input}>
        </TextInput>
      
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        paddingHorizontal: 15,
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 10,

    }
})