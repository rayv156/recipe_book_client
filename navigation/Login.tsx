import * as React from 'react';
import { 
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  AsyncStorage,
  Image
        } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { GlobalCtx } from '../App';


const Login = ({history}) => {
  const {gState, setgState} = React.useContext(GlobalCtx)

  const {url} = gState
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
      })

    const createChange = ({ type, text }) => 
    setFormData({...formData, [type]: text});


  //our handle create function, for when the form is submitted
  const handleCreate = async () => {
    
    await fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(async (data) => {
      try {
        if (data.token) {
        await AsyncStorage.setItem('secure_token', `${data.token}`);
        await AsyncStorage.setItem('userid', `${data.user}`)
        setgState({...gState, token: true, user_id: data.user.id})
        } else {
          setgState({...gState, token: false, user_id: null})
        }

      } catch (err) {
        alert(err);
      }
    })
  }
    return (
        <View style={styles.container}>
          <Image style={{width: 300, height: 300}} source={{uri: 'https://i.imgur.com/5gpNhHF.png',}}/>
          
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.icons}><Ionicons name="person-outline" style={{fontSize: 30}}/></Text>
        <TextInput autoCapitalize="none" type="text" name="username" value={formData.username} onChangeText={(text) => createChange({ type: 'username', text })} style={styles.input}/>
        </View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.icons}><Ionicons name="lock-closed-outline" style={{fontSize: 30, marginBottom: -10}}/></Text>
        <TextInput autoCapitalize="none" secureTextEntry={true} textContentType="password" name="password" value={formData.password} onChangeText={(text) => createChange({ type: 'password', text })} style={styles.input}/>
        </View>
        <TouchableOpacity style={styles.btn} onPress={()=> handleCreate()}>
            <Text style={{color: 'white'}}>
                Login
            </Text>
        </TouchableOpacity>
        </View>
    )
  }

  const styles = StyleSheet.create({
    input: {
      borderBottomWidth: 3,
      width: "70%",
      height: 45,
      
      paddingLeft: 15,
      marginRight: -3,
      paddingRight: 15,
      alignItems: "center",
      backgroundColor: 'rgb(169,172,188)',
    },
    icons: {
      borderBottomWidth: 3,
      marginLeft: -15,
      height: 45,
      fontSize: 30, 
      paddingLeft: 10,
      alignItems: 'center',
      backgroundColor: 'rgb(169,172,188)',
      color: 'black'
    },
    btn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
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
      backgroundColor: 'rgb(169,172,188)',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  });

export default Login