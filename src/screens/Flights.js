import { StyleSheet, Text, View, FlatList, Pressable,} from 'react-native'
import React, {useEffect, useState} from 'react'
import { database, firebase_auth as auth} from '../config/firebase';
import {querySnapshot, collection, onSnapshot, orderBy, query, where} from 'firebase/firestore'
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import FlightCard from '../components/FlightCard';
import Loader from '../components/Loader';


const Flights = ({navigation}) => {
  const userId = auth.currentUser?.uid || '';

  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(userId) {
      const collectionRef = collection(database, 'flights')
      const q = query(collectionRef, where('userId', '==', userId), orderBy('createdAt', 'asc'))

      const unsuscribe = onSnapshot(q, querySnapshot => {
        setFlights(
          querySnapshot.docs.map(doc => ({
            userId: doc.userId,
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
    }else {
  setLoading(false)
}
  }, [userId])

  const signOutWithFirebase = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      navigation.navigate('Login')
    } catch (error) {
      console.log(error, 'sign out failed')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Loader height={850}/>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.title}>My Flights</Text>
        <Pressable onPress={signOutWithFirebase}>
          <Text style={styles.logout}>log out</Text>
        </Pressable>
      </View>
      {flights == 0
        ? <Text style={styles.title_empty}>You haven't booked any flights yet</Text>
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
      /> }
      <Ionicons name={'add-circle'} size={90} style={styles.iconAdd} onPress={()=>{navigation.navigate('Origin')}}/>
    </View>
  )
}

export default Flights

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 50,
    marginBottom: 60,
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logout: {
    textAlign: 'center',
    paddingRight: 10,
    paddingTop: 15,
    fontSize: 17,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: '#3441bd',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#9700FF',
  },
  title_empty: {
    height: 400,
    fontSize: 30,
    fontWeight: '500',
    color: '#a18ab4',
    textAlign: 'center',
    paddingTop: 250,
  },
  iconAdd: {
    position: 'absolute',
    color: '#9700FF',
    alignSelf: 'center',
    marginTop: 670,
  }
})