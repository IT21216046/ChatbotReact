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
