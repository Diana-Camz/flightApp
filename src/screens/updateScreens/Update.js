import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {database} from '../../config/firebase'
import { collection, addDoc } from 'firebase/firestore';
import ButtonNext from '../../components/booking/ButtonNext';


const Update = ({navigation}) => {
    const [isActive, setIsActive] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.title}>Edit your flight or delete it</Text>
      </View>
    <View style={styles.info_container}>
        <View style={styles.info}>
            <View>
                <Text>Mexico City - MEX</Text>
                <Text>Origin</Text>
            </View>
            <View>
                <Text>Edit</Text>
            </View>
        </View>
        <View style={styles.info}>
            <View>
                <Text>United States - USA</Text>
                <Text>Destiny</Text>
            </View>
            <View>
                <Text>Edit</Text>
            </View>
        </View>
        <View style={styles.info}>
            <View>
                <Text>August 24, 2024</Text>
                <Text>Date</Text>
            </View>
            <View>
                <Text>Edit</Text>
            </View>
        </View>
        <View style={styles.info}>
            <View>
                <Text>2</Text>
                <Text>Passengers</Text>
            </View>
            <View>
                <Text>Edit</Text>
            </View>
        </View>
    </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Edit Flight'}  onPress={() => {console.log('update button')}} isActive={isActive}/>
        <ButtonNext title={'Delete Flight'}  onPress={() => {console.log('delete button')}} isActive={isActive}/>
        <ButtonNext title={'Cancel'}  onPress={() => {console.log('delete button')}} isActive={isActive}/>
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
    paddingVertical: 10,
    borderWidth: 1
  },
  info: {
    paddingLeft: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})