import { StyleSheet, View } from 'react-native'
import React from 'react'
import Input from '../components/login/Input.js'

const Login = () => {
  return (
    <View>
        <View>
          <Input title={'Escribe tu nombre'} placeholder={'Nombre'}/>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({})



export default Login