import * as React from 'react';
import { StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { GlobalCtx } from '../App'
import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { Container, Text, Card, Header, Left, Thumbnail, CardItem, Button, Body } from 'native-base';
import * as Font from 'expo-font';

const Favorites = ({navigation}) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
  const [favorites, setFavorites]= React.useState([])

  const getFavorites = async () => {
    const token = await AsyncStorage.getItem('secure_token')
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
    <Container style={{width: 350}}>
    {favorites.map((favorite)=> {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('FaveShow', {
          favorite: favorite})
        }>
              <Card>
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
    </Container>
    )


  return (
    <View style={styles.container}>
      {favorites.length > 0 ? loaded() : null}
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

export default Favorites
