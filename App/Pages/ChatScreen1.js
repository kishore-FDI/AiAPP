import { View, Text , StyleSheet, SafeAreaView,TextInput,TouchableOpacity, FlatList} from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import {Ionicons} from '@expo/vector-icons'

const API="AIzaSyC6YROtkBNnythHbDT30zdYHx-WcmW8NGI"

const ChatScreen1=()=>{
  const [messages,setMessages]=useState([]);
  const [inputText,setInputText]=useState(' ');
  const generateText=async()=>{
    if(inputText.trim()==='')
    {
      return;
    }

    const apiUrl="https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText"

    const requestData={
      prompt:
      {
        // context:'',
        // examples:[],
        // messages:[{content:inputText}]
        text: inputText
      },
      // temperature:0.25,
      // top_k:40,
      // top_p:0.95,
      // candidate_count : 1,

    };
    const headers={
      'Content-Type':'application/json',

    };
    try{
      const response=await axios.post(`${apiUrl}?key=${API}`,requestData,{
        headers,
      });
      if(response.status===200)
      {
        if(response.data && response.data.candidates && response.data.candidates.length>0)
          {
            const botResponse=response.data.candidates[0].content;

            const newUserMessages={
                id:messages.length+1,
                text:inputText,
                sender:'user',
                timestamp:new Date().getTime(),

            };
            const newBotMessage={
              id:messages.length+2,
              text: botResponse,
              sender:'bot',
              timestamp:new Date().getTime()
            };
            setMessages([...messages,newUserMessages,newBotMessage]);
            setInputText('');
          }
          else
          {
            console.error("Olunga question kelu");
          }
      }
      else{
        console.error("Google Status la issue",response.status);
      }
  }
  catch(error)
  {
    console.error("Axios la issue",error)
  }
  
};
return(
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Test</Text>
      <FlatList
      data={messages}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item})=>{
        <View 
        style={{alignSelf:item.sender==='user'?'flex-end':'flex-start',
        marginBottom:12,

        }}>
        <View 
        style={{
          backgroundColor:item.sender==='user'?'#007AFF':'#E5E5EA',
          padding:10,
          borderRadius:10,
        }}
        >
        <Text style={{
          color:item.sender==='user'?'white':'black'
        }}>
        {item.sender==='user'?item.text:item.text}

        </Text>
        <Text style={{
          color:item.sender==='user'?'white':'black',
          fontSize:14,
          marginTop:14,
        }}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>


        </View>
          
        </View>
      }}
      />
      <View style={styles.inputContainer}>
          <TextInput
          placeholder='SO... Shall we Begin?'
          value={inputText}
          onChangeText={(text)=>setInputText(text)}
          style={styles.input}
          />
          <TouchableOpacity onPress={generateText} style={styles.sendButton}>
              <Ionicons name='send' size={24} color='white'/>
          </TouchableOpacity>
      </View>
    
  </SafeAreaView>
)
}

export default ChatScreen1
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems:'center',
      // justifyContent:'center'
      paddingHorizontal:16,
      paddingTop:24
    },
    title:{
      fontSize:24,
      color:'#fff',
      marginTop:16,
      fontWeight:'bold',
      textAlign:'center',
      marginTop:20
    },
    inputContainer:{
      backgroundColor:'#f0f0f0',
      padding:10,
      borderRadius:10,
      marginTop:20,
      width:'100%',
      alignSelf:'center',
      shadowColor:'#000',
      shadowOffset:{
        widht:0,
        heigth:2
      },
      shadowOpacity:0.25,
      shadowRadius:3.84,
      elevation:5,

    },
  input:{
      fontSize:16,
      color:'#333',
      paddingHorizontal:16,
      backgroundColor:'#f5f5f5',
      borderRadius:10,
      shadowColor:'#000',
      marginBottom:20,
      shadowOffset:{
        widht:0,
        heigth:2
      },
      shadowOpacity:0.1,
      shadowRadius:2,
      elevation:3,

    },
    sendButton:{
      padding:10,
      borderRadius:10,
      backgroundColor:'#007AFF',
    }
  }
  
  );