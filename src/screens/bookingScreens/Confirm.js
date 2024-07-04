import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ButtonNext from '../../components/booking/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';

const Confirm = ({route, navigation}) => {
  const [isActive, setIsActive] = useState(true);
  const {origin, destiny, day, passengers} = route.params;
  const confirmRequest = () => {
    //navigation.navigate('Home')
    console.log('boton Confirm presionado')
    console.log(origin, destiny, day, passengers)
  }

  const cancelRequest = () => {
    console.log('boton Cancel presionado')
  }

  return (
    <View style={styles.container}>
      <FlightInfo 
        origin={origin} 
        destiny={destiny}
        dateDeparture={day}
        passengers={passengers}
      />
      <View style={styles.title_container}>
        <Text style={styles.title}>Your request was received</Text>
      </View>

      <View style={styles.button_container}>
        <ButtonNext title={'Confirm'}  onPress={confirmRequest} isActive={isActive}/>
        <ButtonNext title={'Cancel'}  onPress={cancelRequest} isActive={isActive}/>
      </View>
    </View>
  )
}

export default Confirm

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
    width: 200,
  },
  title_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})