// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './App/Pages/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
// import HomeScreenNavigation from './App/Navigation/HomeScreenNavigation';
import HomeNavigation from './App/Navigation/HomeScreenNavigation';
import ChatScreen1 from './App/Pages/ChatScreen1';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ChatScreen1/> */}
      <NavigationContainer>
          <HomeNavigation/>
      </NavigationContainer>
      {/* <HomeScreen/> */}
     {/* <Text>Hi Hello</Text>  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // backgroundColor: '#fff',
    // alignItems:'center',
    // justifyContent:'center'
  },
});