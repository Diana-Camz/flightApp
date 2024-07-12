import {Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Calendar} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import {database} from '../../config/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ButtonNext from '../../components/booking/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';
import {format, parseISO} from 'date-fns'

const DatesUpdate = ({route, navigation}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [flight, setFlight] = useState(null);
  const currentDay = new Date().toISOString().split('T')[0];
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

  const formatInitialDate = (date) => {
    return format(date, 'yyyy-MM-dd')
  }

  const formatDate = (date) => {
    return format(date, 'MMMM d, yyyy')
  }

  const onDayPress = (day) => {
    const newDate = day.dateString;
    setSelectedDate(newDate);
    const formattedDate = newDate ? formatDate(parseISO(newDate)) : '';
    //const formattedInitialDate = formatInitialDate(parseISO(flight.date))
    //console.log(formattedInitialDate)
    setFlight(prevFlight => ({...prevFlight, date: formattedDate}));
    setIsActive(true);
    } 

  const handleEditData = async (id) => {
    try {
        const formattedDate = selectedDate ? formatDate(parseISO(selectedDate)) : '';
        const docRef = doc(database, 'flights', id);
        await updateDoc(docRef, {date: formattedDate});
        Alert.alert('Flight updated', 'The flight has been updated successfully', [
            {text: 'Ok', onPress: () => navigation.navigate('Home')}
          ])
    } catch (error) {
        console.log('Error editing date', error)
    }
  }

  if(!flight) {
    return (
    <View style={styles.container}>
        <Text>Loading...</Text>
    </View>
    )
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
      <View style={styles.input_container}>
        <Text style={styles.title}>Edit your flight date</Text>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{[selectedDate]: {
            selected: true,
            selectedColor: '#9700FF',
          }}}
          minDate={currentDay}
          disableAllTouchEventsForDisabledDays={true}
          theme={{
            todayTextColor: 'white',
            todayBackgroundColor: '#391e69',
            arrowColor: '#9700FF',
          }}
/>
      </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Save'} onPress={() => handleEditData(id)} isActive={isActive}/>
        <ButtonNext title={'Cancel'} onPress={() => navigation.goBack()} isActive={true}/>
      </View>
    </View>
  )
}

export default DatesUpdate

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
  },
  icon: {
    marginTop: 20,
    color: '#9700FF'
  },
  input_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})
