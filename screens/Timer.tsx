import { DefaultTransition } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import * as React from 'react';
import { StyleSheet, Image, Animated, TextInput, TouchableOpacity } from 'react-native';
import { H1, H3 } from 'native-base'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';

const Timer = () => {
  const [time, setTime] = React.useState({
    hours: "",
    minutes: "",
    seconds: "",
    stopper: false,
    showTimer: false,
  })

const [duration, setDuration] = React.useState(30)

  const createChange = ({ type, text }) =>
  setTime({...time, [type]: text});

  const getDuration = () => {
    setDuration((Number(time.hours)*3600) + (Number(time.minutes)*60) + (Number(time.seconds)))
  }

  const onSubmitHandle = async() => {
    await getDuration();
    await setTime({...time, showTimer: !time.showTimer})
  }

  React.useEffect(() => {
     getDuration()
      
    }, [duration])

    const newTimer = () => {
      return (<>
        <CountdownCircleTimer
          isPlaying={time.stopper}
          duration={duration}
          colors={[
            ['#004777', 0.4],
            ['#F7B801', 0.4],
            ['#A30000', 0.2],
          ]}
          onComplete={() => {
      // do your stuff here
          alert("Timer is done!")}}
  >
    {({ remainingTime, animatedColor }) => (
      
      <Animated.Text style={{ color: animatedColor, fontSize: 40, fontFamily: 'digital'}}>
        {new Date (Number(remainingTime) * 1000).toISOString().substr(11,8)}
      </Animated.Text>
    )}
  </CountdownCircleTimer>
  <TouchableOpacity style={styles.btn} onPress={()=> setTime({...time, stopper: !time.stopper})}><Text style={{color: 'white'}}>Start/Stop</Text></TouchableOpacity>
      </>
      )
    }
  
  return (<>
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 'auto', width: '100%', backgroundColor: 'rgb(169,172,188)', alignItems: 'center', paddingTop: 50, height: 100}}>
         <H1 style={{color: 'white', paddingLeft: 50}}>Timer</H1> 
        <Image style={{width: 150, height: 50, margin: 0, alignSelf: 'flex-end'}} source={{uri: 'https://i.imgur.com/YSnmYeW.png'}}/>
      </View>
      <ScrollView>
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', width: '40%', justifyContent: 'space-between', alignItems: 'center'}}>
      <H3 style={{fontFamily: 'digital', fontSize: 30}}>Hours:</H3>
      <TextInput style={styles.input} value={time.hours} placeholder="00" keyboardType="numeric" onChangeText={(text) => createChange({ type: 'hours', text })}></TextInput>
      </View>
      <Text></Text>
      <Text></Text>
      <View style={{display: 'flex', flexDirection: 'row', width: '40%', justifyContent: 'space-between', alignItems: 'center'}}>
      <H3 style={{fontFamily: 'digital', fontSize: 30}}>Minutes:</H3>
      <TextInput style={styles.input} value={time.minutes} placeholder="00" keyboardType="numeric" onChangeText={(text) => createChange({ type: 'minutes', text })}></TextInput>
      </View>
      <Text></Text>
      <Text></Text>
      <View style={{display: 'flex', flexDirection: 'row', width: '40%', justifyContent: 'space-between', alignItems: 'center'}}>
      <H3 style={{fontFamily: 'digital', fontSize: 30}}>Seconds:</H3>
      <TextInput style={styles.input} value={time.seconds} placeholder="00" keyboardType="numeric" onChangeText={(text) => createChange({ type: 'seconds', text })}></TextInput>
      </View>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity style={styles.btn} onPress={()=>onSubmitHandle()}><Text style={{color: 'white'}}>Set/Reset Timer</Text></TouchableOpacity>
      {time.showTimer ? newTimer() : null}
    
    
    </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  input: {
    borderBottomWidth: 3,
    width: "40%",
    height: 45,
    alignItems: 'center',
    paddingLeft: 15,
    justifyContent: 'space-between',
    alignSelf: "center",
    fontSize: 30,
    fontFamily: 'digital'
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
  btn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    alignSelf: 'center',
    justifyContent: "center",
    margin: 40,
    backgroundColor: "rgb(37,74,80)",
    color: 'white'
  },
});

export default Timer