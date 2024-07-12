import { StyleSheet, Text, View, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
import {database} from '../../config/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ButtonNext from '../../components/booking/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';

const PassengersUpdate = ({route, navigation}) => {
  const [passengers, setPassengers] = useState();
  const [flight, setFlight] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const {id} = route.params;

  const getFlightById = async (id) => {
    try {
      const docRef = doc(database, 'flights', id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        setFlight(docSnap.data())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFlightById(id)
  }, [id]);

  const addPassengers = () => {
    setFlight(prevFlight => ({...prevFlight, passengers: flight.passengers + 1}))
  }

  const removePassengers = () => {
    if(passengers <= 1){
      return
    } else {
      setFlight(prevFlight => ({...prevFlight, passengers: flight.passengers - 1}))
    }
  }

  const handleEditData = async (id) => {
    try {
      const docRef = doc(database, 'flights', id)
      await updateDoc(docRef, {passengers: flight.passengers})
      Alert.alert('Flight updated', 'The flight has been updated successfully', [
        {text: 'Ok', onPress: () => navigation.navigate('Home')}
      ])
    } catch (error) {
      console.log('data cannot be updated', error)
    }
  }

  if (!flight) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon} onPress={() => navigation.goBack()}/>
      <FlightInfo 
        origin={flight.origin} 
        destiny={flight.destiny}
        dateDeparture={flight.date}
        passengers={flight.passengers}
      />
      <View style={styles.title_container}>
        <Text style={styles.title}>How many passengers?</Text>
      </View>

      <View style={styles.input_container}>
      <Ionicons name={'remove-circle-sharp'} size={40} style={styles.icon} onPress={removePassengers}/>
      <Text style={styles.input_text}>{flight.passengers}</Text>
      <Ionicons name={'add-circle-sharp'} size={40} style={styles.icon} onPress={addPassengers}/>
      </View>

      <View style={styles.button_container}>
        <ButtonNext title={'Save'} onPress={() => handleEditData(id)} isActive={isActive}/>
        <ButtonNext title={'Cancel'} onPress={() => navigation.goBack()} isActive={true}/>
      </View>
    </View>
  )
}

export default PassengersUpdate

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