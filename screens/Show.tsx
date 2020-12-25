import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { GlobalCtx } from '../App'
import { Container, Text, Card, Header, Left, Thumbnail, CardItem, Button, Body, Fab, Icon, H1 } from 'native-base';
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
        const token = await SecureStore.getItemAsync('secure_token')
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
              
              <Card style={{width: '100%', shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,}}>
             <CardItem>
                 <Body>
                 <H1 style={styles.title}>{item.title}</H1>
                 <Text>Source: {item.sourceName}</Text>
                 <Text>Health Score: {item.healthScore}</Text>
                 </Body>
                 </CardItem>
                 <CardItem>
                     <Body>

                 <Image style={{width: '100%', height: 300}} source={{uri: `${item.image}`}} />
                 </Body>
                 </CardItem>
                 <CardItem>
                     <Body>
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
</Body>
</CardItem>
 <CardItem>
     <Body>
            <Text style={styles.title}>Instructions:</Text>
            {favorite.instructions.map((item)=> {
            return <Text>{item}</Text>
        })}
        </Body>
        </CardItem>
        </Card>
       
            
        
        
        )
        
    }
    
    return (<>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', paddingTop: 50, height: 100}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={{color: 'rgb(37,74,80)', height: 50, fontSize: 25}}><Ionicons name="chevron-back-outline" style={{fontSize: 25, color: 'rgb(37,74,80)'}}></Ionicons>Back</Text>
      </TouchableOpacity>
        <Image style={{width: 150, height: 50, margin: 0}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
      </View>
        
          <ScrollView style={{backgroundColor: 'rgb(37,74,80)'}}>
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
    backgroundColor: 'rgb(37,74,80)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 100
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
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
