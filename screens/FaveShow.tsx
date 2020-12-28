import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GlobalCtx } from '../App'
import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { Container, Text, Card, Left, Tabs, Right, Tab, TabHeading, Header, Thumbnail, CardItem, Button, Body, H3, ListItem, List } from 'native-base';
import * as Font from 'expo-font';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store'

const FaveShow = ({
    route, navigation,
  }: StackScreenProps<RootStackParamList, 'FaveShow'>) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
  const { favorite } = route.params;

  
      return (<>
          
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={{color: 'white', height: 50, fontSize: 25}}><Ionicons name="chevron-back-outline" style={{fontSize: 25, color: 'white'}}></Ionicons>Back</Text>
      </TouchableOpacity>
        <Image style={{width: 150, height: 50, margin: 0, alignSelf: 'center'}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
      </View>
          <ScrollView>
              <View style={styles.container}>
        
              <Card >
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: `${favorite.img}`}}/>
                    <Body>
                      <Text>{favorite.name}</Text>
                    </Body>
                  </Left>
                  <Right>
                    
                    <Button style={{justifyContent: 'center', width: '30%', backgroundColor: 'red'}} onPress={async ()=> {
        const token = await SecureStore.getItemAsync('secure_token');
      await fetch(`${gState.url}/recipes/` + favorite.id, {
        method: "delete",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `bearer ${token}`
        },
      })
      navigation.goBack()
    }}><Ionicons style={{fontSize: 30, color: 'white'}} name="trash-outline"></Ionicons></Button>
                    
                  </Right>
                </CardItem>
                <Header style={{height: 15}} hasTabs/>
                <Tabs>
                  <Tab style={{width: 350, padding: 20}} heading={<TabHeading><Text>Ingredients</Text></TabHeading>}>
                <CardItem cardBody>
                  <Body>
                    <List>
                    {favorite.ingredients.map((ingredient)=> (<ListItem><Text>{`${ingredient} `}</Text></ListItem>))}
                    </List>
                    </Body>
                 
                 </CardItem>
                  </Tab>
                  <Tab style={{width: 350, padding: 20}} heading={<TabHeading><Text>Instructions</Text></TabHeading>}>
                  {favorite.instructions.map((item, index)=>{
                return (<><Text >{`${index+1}. ` + item}</Text>
                    <Text></Text></>)
                  })}
                  </Tab>
                </Tabs>     
                
              </Card>
        
        
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
    marginBottom: 100
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

export default FaveShow