import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Alert, Modal, TextInput, TouchableOpacity, View, Image, AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { GlobalCtx } from '../App'
import { Container, Text, Card, Header, Left, DatePicker, Thumbnail, CardItem, Button, Body, Fab, Icon, H1 } from 'native-base';
import LottieView from 'lottie-react-native';




export default function Show({
  route, navigation,
}: StackScreenProps<RootStackParamList, 'Show'>) {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const { user_id } = gState
    const { recipe } = route.params;
    const [modal, setModal] = React.useState(false)
    const [active, setActive] = React.useState(false)
    const [item, setItem]= React.useState([])
    const [groceryList, setGroceryList] = React.useState({
      aisle: [],
      items: [],
      name: "",
      date: "",
      user_id: user_id
    })
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
            groceryList.aisle.push(item.aisle)
            groceryList.items.push(item.original)
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
      const handleGrocery = async () => {
        const token = await SecureStore.getItemAsync('secure_token')
        await fetch(gState.url + "/grocery_lists", {
          method: "post",
          headers: {
            "Content-Type":"application/json",
            "Authorization": `bearer ${token}`
          },
          body: JSON.stringify(groceryList)
        })
        Alert.alert("Added to your Grocery List!")
      }


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
        Alert.alert("Added to your favorites!")
      }

      const createChange = ({ type, text }) => 
    setGroceryList({...groceryList, [type]: text});

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
    <Modal animationType="slide" transparent={true} visible={modal} >
      <View style={{marginTop: 150, padding: 20, backgroundColor: 'white'}}>
        <Text>List Name: </Text>
      <TextInput autoCapitalize="none" type="text" name="name" value={groceryList.name} onChangeText={(text) => createChange({ type: 'name', text })} style={styles.input}/>
      <Text>Date: </Text>
      <TextInput autoCapitalize="none" type="text" name="date" value={groceryList.date} onChangeText={(text) => createChange({ type: 'date', text })} style={styles.input}/>
      
            <Button style={{ backgroundColor: 'green' }} onPress={()=> {handleGrocery(); setModal(!modal)}}>
              <Icon name="cart-outline" />
            </Button>
      </View>
    </Modal>
      <Fab
            active={active}
            direction="left"
            containerStyle={{ }}
            style={{ backgroundColor: 'rgb(199,114,80)' }}
            position="bottomRight"
            onPress={() => setActive(!active)}>
            <Icon name="add" />
            <Button style={{ backgroundColor: 'green' }} onPress={() => {setModal(!modal)}}>
              <Icon name="cart-outline" />
            </Button>
            <Button style={{ backgroundColor: 'red' }} onPress={()=> handleFavorite()}>
              <Icon name="heart-outline" />
            </Button>
          </Fab>
        
    
       
   
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
  input: {
    borderBottomWidth: 3,
    width: "80%",
    height: 45,
    alignItems: 'center',
    paddingLeft: 15,
    justifyContent: 'space-between',
    alignSelf: "center",
    backgroundColor: 'white',
  },
  icons: {
    borderBottomWidth: 3,
    height: 45,
    fontSize: 30, 
    paddingLeft: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black'
  },
  btn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "black",
    color: 'white',
    textAlign: 'center'
  },
});
