import {StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {Calendar} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import ButtonNext from '../../components/booking/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';

const Dates = ({navigation}) => {
  const [isActive, setIsActive] = useState(false);
  const [startDate, setstartDate] = useState('');
  const [endDate, setEndDate] = useState('')
  const [markedDates, setMarkedDates] = useState({});
  const currentDay = new Date().toISOString().split('T')[0];

  const onDayPress = (day) => {
 if(!startDate || (startDate && endDate)){
  setstartDate(day.dateString)
  setEndDate('')
  setMarkedDates({
    [day.dateString]: {
      selected: true,
      startingDay: true,
      color: '#9700FF',
      textColor: '#ffffff',
    }
  })
} else if(startDate && !endDate){
    setEndDate(day.dateString);
    const start = new Date(startDate);
    const end = new Date(day.dateString);
    const range = {};

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      range[dateString] = {
        selected: true,
        color: '#9700FF',
        textColor: '#ffffff',
      };
    }
    setIsActive(true);
    setMarkedDates({
      ...range,
      [startDate]: {
        selected: true,
        startingDay: true,
        color: '#9700FF',
        textColor: '#ffffff',
      },
      [day.dateString]: {
        selected: true,
        endingDay: true,
        color: '#9700FF',
        textColor: '#ffffff',
      },
    });
};
}

  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon} onPress={() => navigation.goBack()}/>
      <FlightInfo 
        origin={['MEX', 'CDMX']} 
        destiny={['CAN', 'OTAWA']}
        dateDeparture={'September 15, 2020'}
        passengers={3}
      />
      <View style={styles.input_container}>
        <Text style={styles.title}>Select Date</Text>
        <Calendar
          onDayPress={onDayPress}
          markingType={'period'}
          minDate={currentDay}
          disableAllTouchEventsForDisabledDays={true}
          markedDates={markedDates}
          theme={{
            todayTextColor: '#48345c',
            arrowColor: '#9700FF',
          }}
/>
      </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Next'} onPress={() => {navigation.navigate('Passengers')}} isActive={isActive}/>
      </View>
    </View>
  )
}

export default Dates

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
