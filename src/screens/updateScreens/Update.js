import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {database} from '../../config/firebase'
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import ButtonNext from '../../components/booking/ButtonNext';
import UpdateItem from '../../components/updateFlight/UpdateItem';


const Update = ({route, navigation}) => {
    const [isActive, setIsActive] = useState(true);
    const [flight, setFlight] = useState(null);
    const {id} = route.params;

    const getFlightById = async (id)=>  {
      try {
        const docRef = doc(database, 'flights', id)
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          setFlight(docSnap.data())
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=> {
      getFlightById(id)
    }, [id]);

    const goToEditScreen = () => {
      navigation.navigate('OriginUpdate', {id: id})
      //console.log(id)
    }

    const confirmDelete = async (id) => {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this Flight?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => deleteFlight(id),
          },
        ],
        {cancelable: false}
      )
    }
    const deleteFlight = async () => {
      try {
        await deleteDoc(doc(database, 'flights', id));
        Alert.alert('Flight deleted', 'The flight has been deleted succesfully.', [
          { text: 'Ok', onPress: () => navigation.navigate('Home')}
        ])
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'An error occurred while deleting the flight.')
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
      <View style={styles.title_container}>
        <Text style={styles.title}>Edit your flight or delete it</Text>
      </View>
    <View style={styles.info_container}>
      <UpdateItem title={'Origin'} itemInfo={flight.origin} func={goToEditScreen}/>
      <UpdateItem title={'Destiny'} itemInfo={flight.destiny} func={() => {}}/>
      <UpdateItem title={'Date'} itemInfo={flight.date} func={() => {}}/>
      <UpdateItem title={'Passengers'} itemInfo={flight.passengers} func={() => {}}/>
        {/* <View style={styles.info}>
            <View style={styles.info_text_container}>
                <Text style={styles.info_city}>Mexico City - MEX</Text>
                <Text style={styles.info_title}>Origin</Text>
            </View>
            <View style={styles.button_edit_container}>
                <Text style={styles.button_text}>Edit</Text>
            </View>
        </View>
         <View style={styles.info}>
            <View style={styles.info_text_container}>
                <Text style={styles.info_city}>United States - USA</Text>
                <Text style={styles.info_title}>Destiny</Text>
            </View>
            <View style={styles.button_edit_container}>
                <Text style={styles.button_text}>Edit</Text>
            </View>
        </View>
        <View style={styles.info}>
            <View style={styles.info_text_container}>
                <Text style={styles.info_city}>August 24, 2024</Text>
                <Text style={styles.info_title}>Date</Text>
            </View>
            <View style={styles.button_edit_container}>
                <Text style={styles.button_text}>Edit</Text>
            </View>
        </View>
        <View style={styles.info}>
            <View style={styles.info_text_container}>
                <Text style={styles.info_city}>2</Text>
                <Text style={styles.info_title}>Passengers</Text>
            </View>
            <View style={styles.button_edit_container}>
                <Text style={styles.button_text}>Edit</Text>
            </View>
        </View> */}
    </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Delete Flight'}  onPress={confirmDelete} isActive={isActive}/>
        <ButtonNext title={'Cancel'}  onPress={() => navigation.navigate('Home')} isActive={isActive}/>
      </View>
    </View>
  )
}

export default Update

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 100,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#48345c',
    width: 300,
  },
  title_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  info_container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#969696',
    borderRadius: 15,
  },
  info: {
    paddingLeft: 15,
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: '#969696',
  },
  info_text_container: {
    width: 230,
  },
  info_city: {
    fontSize: 17,
  },
  info_title: {
    borderTopWidth: 0.5,
    fontSize: 13,
    color: '#7d7d7d',
    borderColor: '#a3a3a3'
  },
  button_edit_container: {
    paddingTop: 3,
    paddingRight: 5,
    //justifyContent: 'center',
    //borderWidth: 1,
  },
  button_text: {
    fontWeight: 'bold',
    letterSpacing: 1,
   // borderWidth: 1,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})