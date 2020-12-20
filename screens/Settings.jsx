import * as React from 'react';
import { StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { GlobalCtx } from '../App';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const Settings = () => {
    const {gState, setgState} = React.useContext(GlobalCtx)


    const removeKey = async () => {
        await AsyncStorage.removeItem('secure_token')
        setgState({...gState, token: null, user_id: null})
      }
    
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => removeKey()}><Text>Logout</Text></TouchableOpacity>
    </View>
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
});

export default Settings