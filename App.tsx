import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import Navigation from './navigation';
import Login from './navigation/Login'

export const GlobalCtx = React.createContext(null)


export default function App() {
  const [gState, setgState]= React.useState({token: false, user_id: null, url: "https://ray-recipe-book-api.herokuapp.com"})

  const getItems = async () => {
    const token = await AsyncStorage.getItem('secure_token')
    const user = await JSON.parse(AsyncStorage.getItem('userid'))
    if (token) {
      return setgState({...gState, token: true, user_id: user.id})
    } else {
      return setgState({...gState, token: false, user_id: null})
    }
  }

  React.useEffect(() => {
      getItems()
      console.log(gState)
    }, [])
  
      

 
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <GlobalCtx.Provider value={{ gState, setgState }}>
      <SafeAreaProvider>
      {gState.token ? <Navigation colorScheme={colorScheme} /> : <Login />}
        <StatusBar />
      </SafeAreaProvider>
        </GlobalCtx.Provider>
    );
  }
}
