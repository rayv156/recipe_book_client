import * as React from 'react';
import { StyleSheet, TextInput,
  Button,
  TouchableOpacity,
  AsyncStorage, Image, SafeAreaView, ScrollView } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { GlobalCtx } from '../App'


const Home = () => {
  const {gState, setgState} = React.useContext(GlobalCtx)

  const [recipes, setRecipes]= React.useState([])

  const [formData, setFormData] = React.useState({
    term: "pasta",
  })

  const getRecipes = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${formData.term}&number=20&apiKey=b154528e8f6c4ade84dfdadf47dbeada`)
    const data = await response.json()
    setRecipes(data.results)
  }

  React.useEffect(() => {
    getRecipes()
  }, [])
  
  const removeKey = async () => {
    await AsyncStorage.removeItem('secure_token')
    setgState({...gState, token: null, user_id: null})
  }


  const loaded = () => (
    <View>
    {recipes.map((recipe)=> {
      return (
              <View>
                <Text>{recipe.title}</Text>
                <Image style={{width: '100%', height: 300}} source={{uri: `${recipe.image}`}} />
      <Button title="Delete" onPress={async ()=> {
        await fetch("https://dogs-app-api.herokuapp.com/dogs/" + recipe.id, {
          method: "delete"
        })
        getRecipes()
      }}></Button>
              </View>
        
    )
    })}
    </View>
    )

  const createChange = ({ type, text }) => 
  setFormData({...formData, [type]: text});

//our handle create function, for when the form is submitted
const handleSubmit = async () => {
  await fetch("https://dogs-app-api.herokuapp.com/dogs", {
    method: "post",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(formData)
  })
  getRecipes()
}

  return (
    <SafeAreaView>
      <ScrollView>
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 0, width: '110%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center'}}>
        <Image style={{width: 100, height: 33, margin: 0}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
        <TextInput autoCapitalize="none" type="text" name="search" value={formData.term} onChangeText={(text) => createChange({ type: 'term', text })} style={styles.input}/>
        <Text><Ionicons name="settings-outline"></Ionicons></Text>
      </View>


      {recipes.length > 0 ? loaded() : null}


    </View>
    </ScrollView>
    </SafeAreaView>
    

    
    
  );
}

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(199,114,80)'
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
    width: "70%",
    height: 45,
    margin: 'auto',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    backgroundColor: 'rgb(169,172,188)',
  },
});


export default Home