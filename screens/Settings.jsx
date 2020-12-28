import * as React from 'react';
import * as SecureStore from 'expo-secure-store'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GlobalCtx } from '../App';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
import { H1, H3 } from 'native-base';
import { Avatar, ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';


const Settings = ({navigation}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const {user_email, user_username} = gState
    const removeKey = async () => {
        await SecureStore.deleteItemAsync('secure_token')
        setgState({...gState, token: null, user_id: null})
      }
    
  return (<>
    <View style={styles.header}>
    <H1 style={{color: 'white', paddingLeft: 50}}>Settings</H1>
        <Image style={{width: 150, height: 50, margin: 0, alignSelf: 'flex-end'}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
      </View>
    <View style={styles.container}>
      <H1>User: {user_username}</H1>
    <Avatar 
  size="xlarge"
  rounded
  containerStyle={{marginTop: 40}}
  titleStyle={{color: 'white'}}
  avatarStyle={{backgroundColor: 'gray', zIndex: -1}}
  title={(user_email.charAt(0)).toUpperCase()}
  
/>
<ListItem containerStyle={{width: '100%', backgroundColor: 'rgb(37,74,80)', padding: 20, marginTop: 20}} onPress={() => removeKey()} bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{color: 'white'}}>Logout</ListItem.Title>
          
        </ListItem.Content>
      </ListItem>
      
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', paddingTop: 50, height: 100, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
});

export default Settings