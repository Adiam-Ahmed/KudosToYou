import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo/logo.png';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword} from 'firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const restForm = ()=>{
    setEmail('')
    setPassword('')
  }

  const onSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      restForm()
      Alert.alert("Success", "Account created successfully");
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.headerImage} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create your Account</Text>
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
        <TouchableOpacity style={styles.button} onPress={onSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <View style={styles.signUp}>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.secondaryButtonText}>
              Already have an account?{' '}
              <Text style={{ textDecorationLine: 'underline', color: 'orange' }}>
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
  headerImage: {
    width: 300,
    height: 230,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
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
  signUp: {
    alignItems: 'center',
  },
});

export default SignUp;
