import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import ButtonNext from '../../components/booking/ButtonNext';

const Destiny = () => {
  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon}/>
      <View style={styles.input_container}>
        <Text style={styles.title}>Where will you be flying to?</Text>
        <TextInput style={styles.input} placeholder='Select Location'></TextInput>
      </View>
      <ButtonNext title={'Next'}/>
    </View>
  )
}

export default Destiny

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#48345c',
    width: 250,
  },
  icon: {
    marginTop: 20,
    color: '#9700FF'
  },
  input_container: {
    paddingHorizontal: 20,
    marginTop: -90,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#7c7c7c',
    marginTop: 60,
  }
})