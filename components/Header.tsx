import * as React from 'react';
import { 
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Keyboard
        } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { GlobalCtx } from '../App';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Header = (props) => {
const {navigation} = props
    return(
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', paddingTop: 50, height: 100}}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
    <Text style={{color: 'white', height: 50, fontSize: 25}}><Ionicons name="chevron-back-outline" style={{fontSize: 25, color: 'white'}}></Ionicons>Back</Text>
</TouchableOpacity>
  <Image style={{width: 150, height: 50, margin: 0, alignSelf: 'center'}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
</View>
    )
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

export default Header