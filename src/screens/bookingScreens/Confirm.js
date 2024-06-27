import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import ButtonNext from '../../components/booking/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';

const Confirm = () => {
  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon}/>
      <FlightInfo 
        origin={['MEX', 'CDMX']} 
        destiny={['CAN', 'OTAWA']}
        dateDeparture={'September 15, 2020'}
        passengers={3}
      />
      <View style={styles.title_container}>
        <Text style={styles.title}>Your request was received</Text>
      </View>

      <View style={styles.button_container}>
        <ButtonNext title={'Confirm'}/>
        <ButtonNext title={'Cancel'}/>
      </View>
    </View>
  )
}

export default Confirm

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
  title_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})