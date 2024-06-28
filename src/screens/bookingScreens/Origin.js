import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import ButtonNext from '../../components/booking/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';

const Origin = ({navigation}) => {
  const handleSendData = () => {
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon} onPress={() => navigation.goBack()}/>
      <FlightInfo 
        origin={['MEX', 'CDMX']} 
        destiny={['CAN', 'OTAWA']}
        dateDeparture={'September 15, 2020'}
        passengers={3}
      />
      <View style={styles.input_container}>
        <Text style={styles.title}>Where are you now?</Text>
        <TextInput style={styles.input} placeholder='Select Location'></TextInput>
      </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Next'} onPress={() => {navigation.navigate('Destiny')}}/>
      </View>
    </View>
  )
}

export default Origin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#48345c',
    width: 200,
  },
  icon: {
    marginTop: 20,
    color: '#9700FF'
  },
  input_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#7c7c7c',
    marginTop: 60,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})