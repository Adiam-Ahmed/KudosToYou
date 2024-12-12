import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo/logo.png';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const restForm = ()=>{
    setEmail('')
    setPassword('')
  }

  const onLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      restForm()
      Alert.alert("Success", "Logged in successfully");
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headerContainer}>
      <Image 
          source={logo} style={styles.headerImage}
      />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login to your Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signUp} >
                  <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.secondaryButtonText}>
              Don't have an account?{' '}
              <Text style={{ textDecorationLine: 'underline', color: 'orange' }}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#003c8f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,

  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage:{
    width: 300,
    height:230
  },
  formContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent:'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2, 
    borderColor: '#5e92f3', 
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#5e92f3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 10,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 30,
  },
  signUp:{
    alignItems: 'center',
  },
  googleContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default Login