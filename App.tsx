import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import Navigation from './navigation';
import Login from './navigation/Login'

export const GlobalCtx = React.createContext(null)

//url: "https://ray-recipe-book-api.herokuapp.com"
export default function App() {
  const [gState, setgState]= React.useState({token: false, user_id: null, user_email: null, user_username: null, url: "https://ray-recipe-book-api.herokuapp.com", error: null})

  const getItems = async () => {
    const token = await SecureStore.getItemAsync('secure_token')
    const user = await JSON.parse(SecureStore.getItemAsync('userid'))
    if (token) {
      return setgState({...gState, token: true, user_id: user.id, user_email: user.email, user_username: user.username})
    } else {
      return setgState({...gState, token: false, user_id: null})
    }
  }

  React.useEffect(() => {
    async () => {
      await getItems()
      console.log(gState)
    }
    }, [])
  
      

 
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <GlobalCtx.Provider value={{ gState, setgState }}>
      <SafeAreaProvider>
     <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
        </GlobalCtx.Provider>
    );
  }
}
