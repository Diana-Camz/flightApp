import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ButtonNext = ({title}) => {
  return (
    <View style={styles.container}>
        <View style={styles.button_container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    </View>
  )
}

export default ButtonNext

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 0,
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