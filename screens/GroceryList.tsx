import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { GlobalCtx } from '../App'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as SecureStore from 'expo-secure-store';
import { List, ListItem, H1 } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Tile } from 'react-native-elements'

const GroceryList = ({navigation}) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
  const [groceries, setGroceries]= React.useState([])

  const getGroceries = async () => {
    const token = await SecureStore.getItemAsync('secure_token')
    const response = await fetch(`${gState.url}/grocery_lists`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      }
    })
    const data = await response.json()
      setGroceries(data)
   
     
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getGroceries()
      });
      return unsubscribe
  }, [])

  const loaded = () => (
    
    <List>
    {groceries.map((grocery,index)=> {
      return (
        <ListItem key={`grocery${index}`} style={{width: '100%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('GroceryShow', {
            grocery: grocery})
          } style={{width: '100%',justifyContent: 'center'}}>
                <Text style={styles.title}>{grocery.name}</Text>
                <Text style={styles.title}>{grocery.date.slice(0,-14)}</Text>
          </TouchableOpacity>
              </ListItem>
    )
    })}
    </List>

    )

    const tile = () => (
      <View style={{display: 'flex', height: 800, justifyContent: 'center'}}>

        <TouchableOpacity key={`ToHome`} onPress={() => navigation.navigate('Home')
          }>
            
        <Tile
        imageSrc={{uri: "https://www.thedailymeal.com/sites/default/files/story/2017/Hero_Healthy%20Cart%20Under%2050_Shutterstock_edit.jpg"}}
        title="Open up a recipe and add the ingredients to your grocery list!" />
    
        </TouchableOpacity>
        
      </View>
  
    )


  return (<>
    <View style={styles.header}>
    <H1 style={{color: 'white', paddingLeft: 50}}>Grocery List</H1> 
        <Image style={{width: 150, height: 50, margin: 0, alignSelf: 'flex-end'}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
      </View>
    <ScrollView>
    <View style={styles.container}>
      
      {groceries.length > 0 ? loaded() : tile()}
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
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', paddingTop: 50, height: 100, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
});

export default GroceryList