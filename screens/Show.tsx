import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../types';

export default function Show({
  route, navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
    const { recipe } = route.params;

    const [item, setItem]= React.useState([])

    const getRecipes = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=b154528e8f6c4ade84dfdadf47dbeada`)
        const data = await response.json()
        
          setItem(data)
        
      }
    
      React.useEffect(() => {
        getRecipes()
      }, [])


      const loaded = () => {
          
          return (
              <View style={{display: 'flex', width: '90%', backgroundColor: 'rgb(37,74,80)'}}>
                 <Text>{item.title}</Text>
                 <Text>{item.sourceName}</Text>
                 <Text>{item.healthScore}</Text>
            
        </View>
        )

                }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>

      {item.extendedIngredients ? loaded() : null}
    </View>
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
