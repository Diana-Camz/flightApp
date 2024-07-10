import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import data from '../../data/data.json'
import {database} from '../../config/firebase'
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import ButtonNext from '../../components/booking/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';

const Origin = ({route, navigation}) => {
  const [flight, setFlight] = useState(null);
  const [origin, setOrigin] = useState('');
  const [isActive, setIsActive] = useState(true)
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
  }, [id])
  // useEffect(() =>{
  //   if(origin.length >= 1){
  //     setIsActive(true)
  //   }else{
  //     setIsActive(false)
  //   }}, [origin])

  const handleEditData = () => {
    console.log(typeof flight.origin)
  }
  return (
    <View style={styles.container}>
      {isActive ? <FlightInfo 
        origin={flight.origin} 
        destiny={flight.destiny}
        dateDeparture={flight.date}
        passengers={flight.passengers}
      /> : ''}
      <View style={styles.input_container}>
        <Text style={styles.title}>Where are you flying from?</Text>
        <SelectList 
          setSelected={(val) => setOrigin(val)} 
          data={data} 
          save="value"
          placeholder='Select your airport'
        />
      </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Save'} onPress={handleEditData} isActive={isActive}/>
        <ButtonNext title={'Cancel'} onPress={() => navigation.goBack()} isActive={isActive}/>
      </View>
    </View>
  )
}

export default Origin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
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