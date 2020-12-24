import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { GlobalCtx } from '../App'
import { Container, Text, Card, Header, Left, Thumbnail, CardItem, Button, Body, Fab, Icon } from 'native-base';
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
            instructions: [],
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
            prep_time: data.servings,
            cook_time: data.readyInMinutes,
            summary: data.summary,
            name: data.title,
            img: data.image

        })
        console.log(favorite)
        console.log(favoritesArray)
      }

      const getInstructions = async () => {
             const response = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?apiKey=b154528e8f6c4ade84dfdadf47dbeada`)

            const data = await response.json()

             data[0].steps.map((item) => {
            favorite.instructions.push(item.step)
        })
      }
    
      React.useEffect(() => {
        getRecipes()
        getInstructions()
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
        console.log(favorite)
      }

      const loaded = () => {
          
          return (
              
              <View style={{display: 'flex', width: '90%', backgroundColor: 'rgb(37,74,80)'}}>
                 <Text style={styles.title}>{item.title}</Text>
                 <Text>{item.sourceName}</Text>
                 <Text>{item.healthScore}</Text>
                 <Image style={{width: '100%', height: 300, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}} source={{uri: `${item.image}`}} />
                <Text style={styles.title}>Ingredients:</Text>
                 {item.extendedIngredients.map((ingredient, index)=>{
                     return (<>
                        <View key={`ingredient${index}`}>
                            <Text>
                                {`${ingredient.original}`}
                            </Text>
                        </View>
                     </>

)
})}
            <Text style={styles.title}>Instructions:</Text>
            {favorite.instructions.map((item)=> {
            return <Text>{item}</Text>
        })}
        </View>
            
        
        
        )
        
    }
    
    return (<>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', paddingTop: 50, height: 100}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={{color: 'white', height: 50, fontSize: 25}}><Ionicons name="chevron-back-outline" style={{fontSize: 25, color: 'white'}}></Ionicons>Back</Text>
      </TouchableOpacity>
        <Image style={{width: 150, height: 50, margin: 0}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
      </View>
        
          <ScrollView>
    <View style={styles.container}>
     

      

      {item.extendedIngredients ? loaded() : null}
    </View>
    </ScrollView>
        <Button style={{position: 'absolute',
    bottom: 10,
    right: 30,
    width: 80, 
    height: 80,
    borderRadius: 50,
    backgroundColor: 'rgb(199,114,80)'}} onPress={()=> handleFavorite()}><Icon style={{fontSize: 50, textAlign: 'center', alignSelf: 'center'}} name="add" /></Button>
    
       
   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 100
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
