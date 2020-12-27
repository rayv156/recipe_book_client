import * as React from 'react';
import { 
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image, Keyboard, KeyboardAvoidingView, Platform, Text, View
        } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import EditScreenInfo from '../components/EditScreenInfo';
//import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { GlobalCtx } from '../App';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
const bckColor = '#fffbf3'

const Signup = ({navigation}: StackScreenProps<RootStackParamList, 'Signup'>) => {
  const {gState, setgState} = React.useContext(GlobalCtx)

  const {url} = gState
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        email: "",
        age: null,
      })

      const [passwordCheck, setPasswordCheck] = React.useState({
          passwordCheck: "",
      })

    const createChange = ({ type, text }) => 
    setFormData({...formData, [type]: text});

    const createChangePass = ({ type, text }) => 
    setPasswordCheck({...passwordCheck, [type]: text});


  //our handle create function, for when the form is submitted
  const handleCreate = async () => {
    
    await fetch(`${url}/users`, {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Thanks for signing up! Login to get started.")
        navigation.pop()
    })
  }
    return (
        <View style={{flex: 1}}>
            <KeyboardAvoidingView
            behavior="padding" style={styles.container}>
        
            <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{margin: 'auto', backgroundColor: bckColor}}>
          <Image style={{width: 300, height: 300, alignSelf: 'center'}} source={{uri: 'https://i.imgur.com/DLZFi0p.png'}}/>
          
          <View style={{flexDirection: 'row', backgroundColor: bckColor, justifyContent: 'center'}}>
            <Text style={styles.icons}><Ionicons name="person-outline" style={{fontSize: 30}}/></Text>
        <TextInput autoCapitalize="none" type="text" name="username" autoFocus={true} placeholder="username" value={formData.username} onChangeText={(text) => createChange({ type: 'username', text })} style={styles.input}/>
        </View>
        <Text>


        </Text>
        
        <View style={{flexDirection: 'row', backgroundColor: bckColor, justifyContent: 'center'}}>
        <Text style={styles.icons}><Ionicons name="lock-closed-outline" style={{fontSize: 30, marginBottom: -10}}/></Text>
        <TextInput autoCapitalize="none" textContentType={'oneTimeCode'} secureTextEntry={true} name="password" placeholder="password" value={formData.password} onChangeText={(text) => createChange({ type: 'password', text })} style={styles.input}/>
        </View>
<Text></Text>

        <View style={{flexDirection: 'row', backgroundColor: bckColor, justifyContent: 'center'}}>
        <Text style={styles.icons}><Ionicons name="lock-closed-outline" style={{fontSize: 30, marginBottom: -10}}/></Text>
        <TextInput autoCapitalize="none" textContentType={'oneTimeCode'} secureTextEntry={true} name="passwordCheck" placeholder="verify password" value={passwordCheck.passwordCheck} onChangeText={(text) => createChangePass({ type: 'passwordCheck', text })} style={styles.input}/>
        </View>
        <Text>
        {formData.password === passwordCheck.passwordCheck ? null : <Text style={{color: 'red'}}>Passwords do not match</Text>}

        </Text>
        
        <View style={{flexDirection: 'row', backgroundColor: bckColor, justifyContent: 'center'}}>
        <Text style={styles.icons}><Ionicons name="mail-outline" style={{fontSize: 30, marginBottom: -10}}/></Text>
        <TextInput autoCapitalize="none" type="text" name="email"  placeholder="email" value={formData.email} onChangeText={(text) => createChange({ type: 'email', text })} style={styles.input}/>
        </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.btn} onPress={()=> handleCreate()}>
            <Text style={{color: 'white'}}>
                Signup
            </Text>
        </TouchableOpacity>
        <Text>
        </Text>
        <Text></Text>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text style={{textAlign: 'center'}}>Back to login screen</Text>
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
        
        </View>
        
    )
  }

  const styles = StyleSheet.create({
    input: {
      borderBottomWidth: 3,
      width: "80%",
      height: 45,
      alignSelf: 'center',
      
      alignItems: "center",
      backgroundColor: bckColor,
    },
    icons: {
      borderBottomWidth: 3,
      marginLeft: -15,
      height: 45,
      fontSize: 30, 
      paddingLeft: 10,
      alignItems: 'center',
      backgroundColor: bckColor,
      color: 'black'
    },
    btn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      alignSelf: 'center',
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "black",
      color: 'white'
    },
    body: {
      backgroundColor: 'white',
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      borderStyle: 'solid',
      borderColor: 'black'
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: 'black',
    },
    sectionDescription: {
      textAlign: 'center',
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: 'black',
    },
    container: {
      flex: 1,
      backgroundColor: bckColor,
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  });

export default Signup