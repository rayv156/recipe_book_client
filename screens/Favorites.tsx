import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { GlobalCtx } from '../App'
import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { Container, Text, Card, Header, Left, Thumbnail, CardItem, Button, Body } from 'native-base';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';


const Favorites = ({navigation}) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
  const [favorites, setFavorites]= React.useState([])

  const getFavorites = async () => {
    const token = await SecureStore.getItemAsync('secure_token')
    const response = await fetch(`${gState.url}/recipes`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      }
    })
    const data = await response.json()
      setFavorites(data)
   
     
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    getFavorites()
    });
    return unsubscribe
  }, [])

  const loaded = () => (
    <View style={{width: 350}}>
    {favorites.reverse().map((favorite, index)=> {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('FaveShow', {
          favorite: favorite})
        }>
              <Card key={`favorite${index}`}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: `${favorite.img}`}}/>
                    <Body>
                      <Text>{favorite.name}</Text>
                    </Body>
                  </Left>
                </CardItem>
               
              </Card>
              </TouchableOpacity>
        
    )
    })}
    </View>
    )


  return (<>
    <View style={styles.header}>
          
        <Image style={{width: 150, height: 50, margin: 0, alignSelf: 'flex-end'}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
      </View>
    <ScrollView>
    <View style={styles.container}>
      {favorites.length > 0 ? loaded() : null}
    </View>
    </ScrollView>
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
    display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', paddingTop: 50, height: 100, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
});

export default Favorites
