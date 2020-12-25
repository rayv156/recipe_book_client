import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalCtx } from '../App'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as SecureStore from 'expo-secure-store'

const GroceryList = () => {
  const {gState, setgState} = React.useContext(GlobalCtx)
  const [groceries, setGroceries]= React.useState([])

  const getGroceries = async () => {
    const token = await AsyncStorage.getItem('secure_token')
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
    getGroceries()
  }, [])

  const loaded = () => (
    <View>
    {groceries.map((grocery)=> {
      return (
              <View>
                <Text style={styles.title}>{grocery.aisle.map((item, index)=> {
                return(<>
                <Text>Aisle: {`${item} `}</Text>
                <Text>Item: {`${grocery.items[index]}`}</Text>
                </>
                )})}
                </Text>
                <Text >
                  {grocery.summary}
                </Text>
                <TouchableOpacity onPress={async ()=> {
        const token = await SecureStore.getItemAsync('secure_token');
      await fetch(`${gState.url}/grocery_lists/` + grocery.id, {
        method: "delete",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `bearer ${token}`
        },
      })
      getGroceries()
    }}><Text>Delete</Text></TouchableOpacity>
              </View>
        
    )
    })}
    </View>
    )


  return (
    <View style={styles.container}>
      
      {groceries.length > 0 ? loaded() : null}
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

export default GroceryList