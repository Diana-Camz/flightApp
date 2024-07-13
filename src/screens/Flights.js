import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { database } from '../config/firebase';
import {querySnapshot, collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import FlightCard from '../components/FlightCard';
import { Ionicons } from '@expo/vector-icons';


const Flights = ({navigation}) => {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)

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
    )
    setLoading(false)
  })
    return unsuscribe
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Flights</Text>
      {loading 
        ? <View style={styles.activityIndicator}>
            <ActivityIndicator size='large' color={'#d5b0ee'}/>
          </View>
        : <FlatList
            data={flights}
            keyExtractor={item => item.id}
            renderItem={({item}) => 
              <Pressable onPress={() => navigation.navigate('Update', {id: item.id})}>
                <FlightCard 
                id={item.id}
                origin={item.origin} 
                destiny={item.destiny} 
                dateDeparture={item.date} 
                passengers={item.passengers}
              />
              </Pressable>}
          />}
      <Ionicons name={'add-circle'} size={90} style={styles.iconAdd} onPress={()=>{navigation.navigate('Origin')}}/>
    </View>
  )
}

export default Flights

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 50,
    marginBottom: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#9700FF',
  },
  activityIndicator: {
    height: 550,
    justifyContent: 'center',
  },
  iconAdd: {
    position: 'absolute',
    color: '#9700FF',
    alignSelf: 'center',
    marginTop: 670,
  }
})