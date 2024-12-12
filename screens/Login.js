import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image,Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo/logoNoBg.png';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully");
      navigation.navigate('Home');
    } catch (error) {
      console.error("Login Error: ", error); 
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
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
          <Text style={styles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
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
    backgroundColor: '#F8FAFC',
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
    color: '#003c8f',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#003c8f',
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
    color: '#003c8f',
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