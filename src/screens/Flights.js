import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { database } from '../config/firebase';
import {querySnapshot, collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import FlightCard from '../components/FlightCard';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
    {
        "id": 1,
        "origin": ["USA", "Washington D.C."],
        "destiny": ["CAN", "Ottawa"],
        "dateDeparture": "September 3, 2020",
        "dateReturn": "September 15, 2020",
        "passengers": 3
      },
      {
        "id": 2,
        "origin": ["FRA", "Paris"],
        "destiny": ["GER", "Berlin"],
        "dateDeparture": "October 1, 2020",
        "dateReturn": "October 10, 2020",
        "passengers": 2
      },
      {
        "id": 3,
        "origin": ["JAP", "Tokyo"],
        "destiny": ["S KOR", "Seoul"],
        "dateDeparture": "August 12, 2020",
        "dateReturn": "August 20, 2020",
        "passengers": 3
      },
      {
        "id": 4,
        "origin": ["BRZ", "Brasilia"],
        "destiny": ["ARG", "Buenos Aires"],
        "dateDeparture": "November 5, 2020",
        "dateReturn": "November 18, 2020",
        "passengers": 5
      },
      {
        "id": 5,
        "origin": ["AUS", "Canberra"],
        "destiny": ["NZE", "Wellington"],
        "dateDeparture": "July 21, 2020",
        "dateReturn": "July 30, 2020",
        "passengers": 1
      },
      {
        "id": 6,
        "origin": ["UK", "London"],
        "destiny": ["SPA", "Madrid"],
        "dateDeparture": "December 15, 2020",
        "dateReturn": "December 29, 2020",
        "passengers": 5
      },
      {
        "id": 7,
        "origin": ["ITA", "Rome"],
        "destiny": ["GREE", "Athens"],
        "dateDeparture": "September 8, 2020",
        "dateReturn": "September 22, 2020",
        "passengers": 2
      },
      {
        "id": 8,
        "origin": ["MEX", "Mexico City"],
        "destiny": ["COL", "Bogota"],
        "dateDeparture": "August 3, 2020",
        "dateReturn": "August 15, 2020",
        "passengers": 2
      },
      {
        "id": 9,
        "origin": ["CHI", "Beijing"],
        "destiny": ["IND", "New Delhi"],
        "dateDeparture": "June 1, 2020",
        "dateReturn": "June 10, 2020",
        "passengers": 4
      },
      {
        "id": 10,
        "origin": ["RUS", "Moscow"],
        "destiny": ["TUR", "Ankara"],
        "dateDeparture": "May 20, 2020",
        "dateReturn": "May 30, 2020",
        "passengers": 3
      }
]

const Flights = ({navigation}) => {
  const [flights, setFlights] = useState([])

  useEffect(() => {
    const collectionRef = collection(database, 'flights')
    const q = query(collectionRef, orderBy('createdAt', 'asc'))

    const unsuscribe = onSnapshot(q, querySnapshot => {
      setFlights(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          origin: doc.data().origin,
          destiny: doc.data().destiny,
          date: doc.data().date,
          passengers: doc.data().passengers
        })
      )
    )})
    return unsuscribe
  }, [])
  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon}/>
      <Text style={styles.title}>My Flights</Text>
      <FlatList
      data={flights}
      keyExtractor={item => item.id}
      renderItem={({item}) => 
        <FlightCard 
        origin={item.origin} 
        destiny={item.destiny} 
        dateDeparture={item.date} 
        passengers={item.passengers}
        />}
      />
      <Ionicons name={'add-circle'} size={90} style={styles.iconAdd} onPress={()=>{navigation.navigate('Origin')}}/>
    </View>
  )
}

export default Flights

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#9700FF',
  },
  icon: {
    marginTop: 20,
  },
  iconAdd: {
    position: 'absolute',
    color: '#9700FF',
    alignSelf: 'center',
    marginTop: 670,
  }
})