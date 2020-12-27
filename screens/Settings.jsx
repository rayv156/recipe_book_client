import * as React from 'react';
import * as SecureStore from 'expo-secure-store'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GlobalCtx } from '../App';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
import { H1 } from 'native-base'

const Settings = ({navigation}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)


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
      <TouchableOpacity onPress={() => removeKey()}><Text>Logout</Text></TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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