import { StyleSheet, Text, View, FlatList, Pressable,} from 'react-native'
import React, {useEffect, useState} from 'react'
import { database, firebase_auth as auth} from '../config/firebase';
import {querySnapshot, collection, onSnapshot, orderBy, query, where, doc, getDoc} from 'firebase/firestore'
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import FlightCard from '../components/FlightCard';
import Loader from '../components/Loader';


const Flights = ({navigation}) => {
  const userId = auth.currentUser?.uid || '';
  const [user, setUser] = useState([])
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
      getUser(userId)
      setLoading(false)
      })
      return unsuscribe
    }else {
  setLoading(false)
}
  }, [userId])

  const getUser = async (userId) => {
    try {
      const docRef = doc(database, 'users', userId);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        setUser(docSnap.data())
      }
    } catch (error) {
      console.log(error)
    }
  }

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
        <View style={styles.name_container}>
          <Text style={styles.name_user}>{user.name} {user.lastname}</Text>
          <Pressable onPress={signOutWithFirebase}>
            <Text style={styles.logout}>log out</Text>
          </Pressable>
        </View>
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
  name_container: {
    paddingRight: 5,
  },
  name_user: {
    fontSize: 17,
    color: '#725099',
    fontWeight: '500',
  },
  logout: {
    textAlign: 'center',
    paddingTop: 3,
    fontSize: 17,
    fontWeight: 'bold',
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