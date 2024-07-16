import { StyleSheet, Text, View, TextInput, Alert, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import ButtonCancel from '../../components/ButtonCancel'
import ButtonNext from '../../components/ButtonNext';

const CreateAccount = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [validEntries, setValidEntries] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validRePassword, setValidRePassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    phoneNumber: '',
    birthday: '',
    description: '',
    profileImage: '',
    HostMode: false,
    defaultCity: '',
  })

  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedLastName, setIsFocusedLastName] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isFocusedRePass, setIsFocusedRePass] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [rePasswordVisible, setRePasswordVisible] = useState(true);
  return (
    <View style={styles.first_container}>
    <View style={styles.second_container}>
      <Text style={styles.title}>Welcome to NestQuest</Text>
      <Text style={styles.subtitle}>To create an account please complete all fields</Text>
      <ScrollView style={styles.scrollContainer}>
            <View style={styles.inputs_container}>
              <View style={styles.input_container}>
                <TextInput style={[styles.input_text, isFocusedName && styles.isActive]}
                onChangeText={val => setNewUser({...newUser, name:val})}
                value={newUser.name}
                placeholder={"Name"}
                placeholderTextColor={'#B4B2B2'}
                onFocus={() => setIsFocusedName(true)}
                onBlur={() => setIsFocusedName(false)}/>
                <Text style={styles.errorTxt}/>
              </View>
              <View style={styles.input_container}>
                <TextInput style={[styles.input_text, isFocusedLastName && styles.isActive]}
                    onChangeText={(val) => setNewUser({...newUser, lastname:val})}
                    value={newUser.lastname}
                    placeholder={"Lastname"}
                    placeholderTextColor={'#B4B2B2'}
                    onFocus={() => setIsFocusedLastName(true)}
                    onBlur={() => setIsFocusedLastName(false)}/>
                    <Text style={styles.errorTxt}/>
              </View>
              <View style={styles.input_container}>
                <TextInput style={[styles.input_text, isFocusedEmail && styles.isActive]}
                    onChangeText={val => setEmail(val)}
                    value={email}
                    autoCapitalize='none'
                    placeholder={"Email"}
                    placeholderTextColor={'#B4B2B2'}
                    keyboardType='email-address'
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}/>
                    {validEmail ? <Text style={styles.errorTxt}>{emailMessage}</Text> : <Text style={styles.errorTxt}/>}
              </View>
              <View style={styles.input_containerPassword}>
                <TextInput style={[styles.input_text, isFocusedPass && styles.isActive]}
                    onChangeText={val => setPassword(val)}
                    value={password}
                    autoCapitalize='none'
                    maxLength={30}
                    placeholder={"Password"}
                    placeholderTextColor={'#B4B2B2'}
                    secureTextEntry={passwordVisible}
                    onFocus={() => setIsFocusedPass(true)}
                    onBlur={() => setIsFocusedPass(false)}
                    />
                    <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={27} color="#A663CC" style={styles.iconPassword} onPress={() => setPasswordVisible(!passwordVisible)}/>
                    {validPassword ? <Text style={styles.errorTxt}>Password must contain at least 6 characters</Text> : <Text style={styles.errorTxt}/>}
              </View>
              <View style={styles.input_containerPassword}>
                <TextInput style={[styles.input_text, isFocusedRePass && styles.isActive]}
                    onChangeText={val => setRePassword(val)}
                    value={rePassword}
                    autoCapitalize='none'
                    maxLength={30}
                    placeholder={"Confirm your password"}
                    placeholderTextColor={'#B4B2B2'}
                    secureTextEntry={rePasswordVisible}
                    onFocus={() => setIsFocusedRePass(true)}
                    onBlur={() => setIsFocusedRePass(false)}
                    />
                    <Ionicons name={rePasswordVisible ? "eye-off" : "eye"} size={27} color="#A663CC" style={styles.iconPassword} onPress={() => setRePasswordVisible(!rePasswordVisible)}/>
                    {validRePassword ? <Text style={styles.errorTxt}>Passwords do not match</Text> : <Text style={styles.errorTxt}/>}
              </View>
              {validEntries ? <Text style={styles.errorEntriesTxt}>Please enter all fields</Text> : <Text style={styles.errorTxt}/>}
            </View>
          <ButtonNext title={'Create Account'} 
                onPress={() => {}}
      />
      <ButtonCancel title={'Cancel'} onPress={() => navigation.goBack()}/>
      </ScrollView>
    </View>
    
  </View>
  )
}

export default CreateAccount

const styles = StyleSheet.create({
  first_container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  second_container: {
    flex:1,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 10,
  },
  icon: {
    marginBottom: 5,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#444444',
    marginTop: 8,
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#444444',
    marginHorizontal: 9,
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1, 
  },
  inputs_container: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  input_container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input_containerPassword: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  input_text: {
    height: 60,
    width: '100%',
    fontSize: 15,
    color: '#000000',
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#DBDADA',
    borderRadius: 8,
  },
  errorTxt: {
    fontSize: 10,
    width: '100%',    
    paddingLeft: 11,
    color: '#CD3939',
    marginBottom: 5,
  },
  errorEntriesTxt: {
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 10,
    color: '#CD3939',
    marginTop: 8,
  },
  isActive: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#444444',
  },
  iconPassword: {
    textAlign: 'justify',
    position: 'absolute',
    paddingRight: 12,
    marginTop: 17,
  },
});
