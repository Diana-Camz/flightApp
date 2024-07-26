import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import data from '../../data/data.json'
import {database} from '../../config/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ButtonNext from '../../components/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

const OriginUpdate = ({route, navigation}) => {
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true)
  const {id} = route.params;

  const getFlightById = async (id) => {
    try {
      const docRef = doc(database, 'flights', id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        setFlight(docSnap.data())
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFlightById(id)
  }, [id]);

  const handleEditData = async (id) => {
    try {
      const docRef = doc(database, 'flights', id)
      await updateDoc(docRef, {origin: flight.origin})
      Alert.alert('Flight updated', 'The flight has been updated successfully', [
        {text: 'Ok', onPress: () => navigation.navigate('Home')}
      ])
    } catch (error) {
      console.log('data cannot be updated', error)
    }
  }

  if (loading) {
    return (
      <Loader height={850}/>
    );
  }

  return (
    <View style={styles.container}>
      <FlightInfo 
        origin={flight.origin} 
        destiny={flight.destiny}
        dateDeparture={flight.date}
        passengers={flight.passengers}
      />
      <View style={styles.input_container}>
        <Text style={styles.title}>Edit the Origin of your flight</Text>
        <SelectList 
          setSelected={(val) => setFlight(prevFlight => ({...prevFlight, origin: val}))} 
          data={data} 
          save="value"
          placeholder='Select your airport'
        />
      </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Save'} onPress={() => handleEditData(id)} isActive={true}/>
        <Button title={'Cancel'} onPress={() => navigation.goBack()}/>
      </View>
    </View>
  )
}

export default OriginUpdate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    },
  activityIndicator: {
    height: 550,
    justifyContent: 'center',
  },
  input_container: {
    paddingHorizontal: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#48345c',
    width: 300,
    marginBottom: 30,
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