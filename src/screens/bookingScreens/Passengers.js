import { StyleSheet, Text, View,  } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import ButtonNext from '../../components/booking/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';

const Passengers = () => {
  const [passengers, setPassengers] = useState(1);

  const addPassengers = () => {
    setPassengers(passengers + 1)
  }

  const removePassengers = () => {
    if(passengers <= 0){
      return
    } else {
      setPassengers(passengers - 1)
    }
  }
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
        <Text style={styles.title}>How many passengers?</Text>
      </View>

      <View style={styles.input_container}>
      <Ionicons name={'remove-circle-sharp'} size={40} style={styles.icon} onPress={removePassengers}/>
      <Text style={styles.input_text}>{passengers}</Text>
      <Ionicons name={'add-circle-sharp'} size={40} style={styles.icon} onPress={addPassengers}/>
      </View>

      <View style={styles.button_container}>
        <ButtonNext title={'Next'}/>
      </View>
    </View>
  )
}

export default Passengers

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
  input_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  input_text: {
    width: 80,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontSize: 40,
    fontWeight: '600',
    borderBottomWidth: 1,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})