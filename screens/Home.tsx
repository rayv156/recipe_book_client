import * as React from 'react';
import { StyleSheet, TextInput,
  TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
  import {H3, Spinner, Fab, Icon, Button } from 'native-base'
  import { Ionicons } from '@expo/vector-icons';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { GlobalCtx } from '../App'
import * as SecureStore from 'expo-secure-store'

const Home = ({ navigation }) => {
  const {gState, setgState} = React.useContext(GlobalCtx)
  const [active, setActive] = React.useState(false)
  const [URL, setURL] = React.useState({
    url: `${gState.url}/databases/random`
})

  const [recipes, setRecipes]= React.useState([])

  const [formData, setFormData] = React.useState({
    term: "",
  })
  const removeKey = async () => {
    await SecureStore.deleteItemAsync('secure_token')
    setgState({...gState, token: null, user_id: null})
  }
  const getRecipes = async () => {
    const token = await SecureStore.getItemAsync('secure_token')
    const response = await fetch(URL.url, {
      method: "get",
      headers: {
        "Content-Type":"application/json",
        "Authorization": `bearer ${token}`
      }
    })
    const data = await response.json()
    if (data.recipes) {
      setRecipes(data.recipes)
    } else {
      setRecipes(data.results)
    }
  }

  React.useEffect(() => {
    getRecipes()
  }, [])

  
  

  const loaded = () => (
    <View style={{display: 'flex', width: '90%', backgroundColor: '#fffbf3'}}>
    {recipes.map((recipe, index)=> {
      return (
              <View key={`item${index}`} style={styles.card} >
                <TouchableOpacity onPress={() => navigation.navigate('Show', {
                  recipe: recipe})
                }>
                <H3 style={{textAlign: 'center', color: 'white', fontSize: 25, height: 80, justifyContent: 'center', padding: 10}}>{recipe.title}</H3>
                <Image style={{width: '100%', height: 300, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} source={{uri: `${recipe.image}`}} />
                </TouchableOpacity>
              </View>
        
    )
    })}
    </View>
    )

  const createChange = ({ type, text }) => {
  setFormData({...formData, [type]: text});
  setURL({...URL, url: `${gState.url}/databases/search/${formData.term}`});
  }

  //our handle create function, for when the form is submitted
  const handleSubmit = async () => {
  getRecipes()
}

  return (
    <>
      <ScrollView>
      <View style={styles.header}>
        <Image style={{width: 110, height: 50, margin: 5}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
        <View style={styles.input}>
        <TextInput autoCapitalize="none" type="text" name="search" placeholder="Search" value={formData.term} onChangeText={(text) => createChange({ type: 'term', text })} onSubmitEditing={()=> handleSubmit()} />
        
        <TouchableOpacity onPress={()=> handleSubmit()}>
        <Text ><Ionicons name="search-outline" style={{fontSize: 30}}></Ionicons></Text>
        </TouchableOpacity>
        </View>
        
      </View>
    <View style={styles.container}>


      {recipes.length > 0 ? loaded() : <Spinner color="rgb(37,74,80)"/>}


    <Fab
            active={active}
            direction="down"
            position="topRight"
            containerStyle={{marginTop: -90, marginRight: -5 }}
            style={{ backgroundColor: 'rgb(37,74,80)'}}
            onPress={() =>  setActive(!active) }>
            <Icon name="person" />
            <Button style={{ backgroundColor: 'red' }} onPress={() => removeKey()}>
              <Icon name="log-out" />
            </Button>
           
          </Fab>
    </View>
    </ScrollView>
   
</>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffbf3'
    
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
  input: {
    borderRadius: 15,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: "45%",
    height: 45,
    margin: 'auto',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    backgroundColor: '#fffbf3',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    borderRadius: 15, 
    marginBottom: 30,
    marginTop: 30, 
    width: '100%', 
    backgroundColor: 'rgb(37,74,80)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  header: {
    display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', padding: 15, paddingTop: 50,  shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
  
});


export default Home