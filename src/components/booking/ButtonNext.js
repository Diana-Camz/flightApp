import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ButtonNext = ({title, onPress}) => {
  return (
    <View style={styles.container}>
        <Pressable 
            onPress={onPress} 
            style={styles.button_container}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    </View>
  )
}

export default ButtonNext

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 5,
    },
    button_container: {
        backgroundColor: '#969595',
        width: 290,
        height: 35,
        borderRadius: 8,
        justifyContent: 'center',
    },
    title: {
        color: '#c5c5c5',
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})