import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UpdateItem = ({title, itemInfo, func}) => {
  return (
    <View style={styles.info}>
        <View style={styles.info_text_container}>
            <Text style={styles.info_city}>{itemInfo}</Text>
            <Text style={styles.info_title}>{title}</Text>
        </View>
        <Pressable style={styles.button_edit_container} onPress={func}>
            <Text style={styles.button_text}>Edit</Text>
        </Pressable>
    </View>
  )
}

export default UpdateItem

const styles = StyleSheet.create({
  info: {
    paddingLeft: 15,
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: '#969696',
  },
  info_text_container: {
    width: 230,
  },
  info_city: {
    fontSize: 17,
  },
  info_title: {
    borderTopWidth: 0.5,
    fontSize: 13,
    color: '#7d7d7d',
    borderColor: '#a3a3a3'
  },
  button_edit_container: {
    paddingTop: 3,
    paddingRight: 5,
    //justifyContent: 'center',
    //borderWidth: 1,
  },
  button_text: {
    fontWeight: 'bold',
    letterSpacing: 1,
   // borderWidth: 1,
  },
})