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

  const [URL, setURL] = React.useState({
    url: `https://api.spoonacular.com/recipes/random?number=20&apiKey=b154528e8f6c4ade84dfdadf47dbeada`
})

  const [recipes, setRecipes]= React.useState([])

  const [formData, setFormData] = React.useState({
    term: "",
  })

  const getRecipes = async () => {
    const response = await fetch(URL.url)
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
    <View>
    {recipes.map((recipe, index)=> {
      return (
              <View key={`item${index}`} style={{borderRadius: 15, marginBottom: 10}}>
                <Text style={{textAlign: 'center'}}>{recipe.title}</Text>
                <Image style={{width: '100%', height: 300}} source={{uri: `${recipe.image}`}} />
              </View>
        
    )
    })}
    </View>
    )

  const createChange = ({ type, text }) => 
  setFormData({...formData, [type]: text});
  
  //our handle create function, for when the form is submitted
  const handleSubmit = async () => {
  setURL({...URL, url: `https://api.spoonacular.com/recipes/complexSearch?query=${formData.term}&number=20&apiKey=b154528e8f6c4ade84dfdadf47dbeada`})
  console.log(URL.url)
  console.log(formData.term)
  getRecipes()
}

  return (
    <SafeAreaView>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', padding: 15}}>
        <Image style={{width: 100, height: 33, margin: 0}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
        <TextInput autoCapitalize="none" type="text" name="search" value={formData.term} onChangeText={(text) => createChange({ type: 'term', text })} style={styles.input}/>
        <TouchableOpacity onPress={()=> handleSubmit()}>
        <Text><Ionicons name="search-outline" style={{fontSize: 20}}></Ionicons></Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
    <View style={styles.container}>


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
    width: "50%",
    height: 45,
    margin: 'auto',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    backgroundColor: 'rgb(169,172,188)',
  },
});


export default Home