import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { GlobalCtx } from '../App'

export default function Show({
  route, navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const { user_id } = gState
    const { recipe } = route.params;

    const [item, setItem]= React.useState([])

    const [favorite, setFavorite] = React.useState(
        {
            ingredients: [],
            instructions: "",
            prep_time: "",
            cook_time: "",
            summary: "",
            name: "",
            img: "",
            user_id: user_id
        }
    )

    const [favoritesArray, setFavoritesArray] = React.useState([])
    

    const getRecipes = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=b154528e8f6c4ade84dfdadf47dbeada`)
        const data = await response.json()
        
          setItem(data)
          
        data.extendedIngredients.map((item) => {
            favorite.ingredients.push(item.original)
        })
        setFavorite({...favorite,  
            instructions: data.instructions,
            prep_time: data.servings,
            cook_time: data.readyInMinutes,
            summary: data.summary,
            name: data.title,
            img: data.image

        })
        console.log(favorite)
        console.log(favoritesArray)
      }
    
      React.useEffect(() => {
        getRecipes()
      }, [])

      const handleFavorite = async () => {
        const token = await AsyncStorage.getItem('secure_token')
        await fetch(gState.url + "/recipes", {
          method: "post",
          headers: {
            "Content-Type":"application/json",
            "Authorization": `bearer ${token}`
          },
          body: JSON.stringify(favorite)
        })
        favoritesArray.push(favorite.name)
      }

      const loaded = () => {
          
          return (
              <View style={{display: 'flex', width: '90%', backgroundColor: 'rgb(37,74,80)'}}>
                 <Text style={styles.title}>{item.title}</Text>
                 <Text>{item.sourceName}</Text>
                 <Text>{item.healthScore}</Text>
                 <Image style={{width: '100%', height: 300, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} source={{uri: `${item.image}`}} />
                <Text style={styles.title}>Ingredients:</Text>
                 {item.extendedIngredients.map((ingredient)=>{
                     return (<>
                        <View>
                            <Text>
                                {`${ingredient.original}`}
                            </Text>
                        </View>
                     </>

)
})}
            <Text style={styles.title}>Instructions:</Text>
            <Text>{item.summary}</Text>
            <TouchableOpacity onPress={()=> handleFavorite()}><Text>Add to Favorites</Text></TouchableOpacity>
            
        </View>
        )

                }

  return (
      <SafeAreaView>
          <ScrollView>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', padding: 15, height: 75}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={{color: 'white', height: 50, fontSize: 25}}><Ionicons name="chevron-back-outline" style={{fontSize: 25, color: 'white'}}></Ionicons>Back</Text>
      </TouchableOpacity>
        <Image style={{width: 150, height: 50, margin: 0}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
      </View>
    <View style={styles.container}>
     

      

      {item.extendedIngredients ? loaded() : null}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
