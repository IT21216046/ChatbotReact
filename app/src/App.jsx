import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'


function App() {
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      message: "Hello, i am Banshee",
      sender: "Banshee",
      direction: "incoming"
    }
  ]) // []

  const handleSend = async (message) =>{
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setTyping(true);

    await processMessagetoBanshee(newMessages) // process message to the gpt (send it and response)

  }

  async function processMessagetoBanshee(chatMessage) {
    //charMeassage { sender: "user" or "Banshee", message: "message content"}
    //apiMessage { role: "user" or "assistant", content: "message content"}

    let apiMessages = chatMessage.map((messageObject) =>{
      let role = "";
      if(messageObject.sender === "Banshee"){
        role = "assistant"
      }else{
        role = "user"
      }
      return { role: role, content: messageObject.message }
    });

    const systemMessage = {
      role: "system",
      content: "Speak like a pirate"
    }

    const apiBody = {
      "model": "gpt-3.5-turbo",
      "messages":[
        ...apiMessages 
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",{
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiBody)
    }
      

    ).then((data) =>{
      return data.json();
    }).then((data) =>{
      console.log(data)
      console.log(data.choices[0].messsage.content);
      setMessages(
        [...chatMessage, {
          message: data.choices[0].message.content,
          sender: "Banshee"
        }]
      );
      setTyping(false);
    });

  }

  return (
    <div className = "App">
      <div style={{position: "relative", height: "800px", width: "700px"}}>
      <MainContainer>
        <ChatContainer>
          <MessageList
          typingIndicator={typing ? <TypingIndicator content="Banshee is typing"/> :null}
            >
            {messages.map((message, i) => {
              return <Message key={i} model={message}/>
            })}

          </MessageList>
          <MessageInput placeholder='type here' onSend={handleSend}></MessageInput>
        </ChatContainer>
      </MainContainer>
      </div>


    </div>
  )
}

export default App
