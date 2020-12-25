import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GlobalCtx } from '../App'
import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { Container, Text, Card, Header, Left, Thumbnail, CardItem, Button, Body } from 'native-base';
import * as Font from 'expo-font';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const FaveShow = ({
    route, navigation,
  }: StackScreenProps<RootStackParamList, 'FaveShow'>) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
  const { favorite } = route.params;

  
      return (<>
          
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', paddingTop: 50, height: 100}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={{color: 'white', height: 50, fontSize: 25}}><Ionicons name="chevron-back-outline" style={{fontSize: 25, color: 'white'}}></Ionicons>Back</Text>
      </TouchableOpacity>
        <Image style={{width: 150, height: 50, margin: 0, alignSelf: 'center'}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
      </View>
          <ScrollView>
              <View style={styles.container}>
        <Container style={{width: 350}}>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: `${favorite.img}`}}/>
                    <Body>
                      <Text>{favorite.name}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Body>{favorite.ingredients.map((ingredient)=> (<Text>{`${ingredient} `}</Text>))}</Body>
                  </CardItem>
                  {favorite.instructions.map((item)=>{
                return <Text >{item}</Text>

                  })}
                <Button onPress={async ()=> {
        const token = await SecureStore.getItemAsync('secure_token');
      await fetch(`${gState.url}/recipes/` + favorite.id, {
        method: "delete",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `bearer ${token}`
        },
      })
      navigation.goBack()
    }}><Text>Delete</Text></Button>
              </Card>
        
        </Container>
        </View>
        </ScrollView>
        </>
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

export default FaveShow