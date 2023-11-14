import { View, Text } from 'react-native'
import React, { useEffect ,useState,useCallback} from 'react'
import { useRoute } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat';
import GlobalApi from '../../Services/GlobalApi';
import axios from 'axios';
export default function ChatScreen() {
    const param=useRoute().params;
    const [messages, setMessages] = useState([]);
    const [loading,setLoading]=useState(false);
    const [selectedChatFace,setSelectedChatFace]=useState();
    const [inputText,setInputText]=useState('')
    const PALM_API_KEY = "AIzaSyC6YROtkBNnythHbDT30zdYHx-WcmW8NGI";

    const generateText=async(msg)=>{
      if (msg.trim()==='')
      {
        return;
      }
      const  apiUrl="https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage";

      const requestData={
        prompt:{
          // context:"",
          // examples:[],
          // messages:[{content:msg}], 
          // text:msg
          messages:[{content:msg}]

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
        const response=await axios.post(`${apiUrl}?key=${PALM_API_KEY}`,requestData,{
          headers,
        });
        if(response.status===200)
        {
          if(response.data && response.data.candidates && response.data.candidates.length>0)
          {
            const botResponse=response.data.candidates[0].content;
            // console.log(response.data.candidates[0].content)
            const newUserMessages={
                _id:1,
                text:msg,
                sender:'user',
                timestamp:new Date().getTime(),

            };
            console.log()
            const ChatAPIResp={
              _id:Math.random()*(9999999-1),
              text: botResponse,
              createdAt: new Date(),
              user: {
               _id: 2,
               name: 'React Native',
              avatar: param.selectedFace?.image,
          }

            };
            setMessages(previousMessages=>GiftedChat.append(previousMessages,ChatAPIResp))
            setLoading(false);
            // setMessage([...messages,newUserMessages,ChatAPIResp]);
            msg='';
          }
          else{
            setLoading(false);
            const ChatAPIResp={
                _id:Math.random()*(9999999-1),
                text:" Sorry i cannot help you with that , may contact the develop kishore22705@gmail.com for any issues" ,
                createdAt: new Date(),
                user: {
                 _id: 2,
                 name: 'React Native',
                avatar: param.selectedFace?.image,
            }
        }
        setMessages(previousMessages=>GiftedChat.append(previousMessages,ChatAPIResp))
          }
        }
        else{
          console.error("Sed Status");
          
        }
      }catch(error){
        console.error("Google API service sucks",error);
      }

    };


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        )
        setLoading(true)
        if (messages[0].text)
        {
          generateText(messages[0].text)
        }
      }, [])
  useEffect(() => {
    console.log(param.selectedFace)
    setSelectedChatFace(param.selectedFace);
    setMessages([
      {
        _id: 1,
        text: 'Hello I am '+param.selectedFace?.name+" .How can i help you Today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: param.selectedFace?.image,
        },
      },
    ])
  }, [])

// const getBardResp=(msg)=>{
//     GlobalApi.getBardApi(msg).then(resp=>{
//         if(resp.data.resp[1].content)
//         {
//             const ChatAPIResp={
//                 _id:2,
//                 text: resp.data.resp[1].content,
//                 createdAt: new Date(),
//                 user: {
//                  _id: 2,
//                  name: 'React Native',
//                 avatar: param.selectedFace?.image,
//             }
           
//         }
//         setMessages(previousMessages=>GiftedChat.append(previousMessages,ChatAPIResp))
//         setLoading(false);
//         }
//         else{
//             setLoading(false);
//             const ChatAPIResp={
//                 _id:Math.random()*(9999999-1),
//                 text:" Sorry i cannot help you with that , may contact the develop kishore22705@gmail.com for any issues" ,
//                 createdAt: new Date(),
//                 user: {
//                  _id: 2,
//                  name: 'React Native',
//                 avatar: param.selectedFace?.image,
//             }
//         }
//         setMessages(previousMessages=>GiftedChat.append(previousMessages,ChatAPIResp))
        

//         }
//     })
// }
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
        <GiftedChat
        isTyping={loading}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </View>
  )
}
// Sorry i cannot help you with that , may contact the develop kishore22705@gmail.com for any issues