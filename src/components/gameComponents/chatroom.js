import styles from "@/styles/Chatroom.module.css";
import React, {useState, useEffect} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {listMessages} from "@/graphql/queries";
import {onCreateMessage} from "@/graphql/subscriptions";
import Message from "@/components/gameComponents/message";
import {createMessage} from "@/graphql/mutations";

const ChatRoom = ({user}) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {

    // Subscribe to creation of message
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: ({provider, value}) => {
        setMessages((messages) => [
          ...messages,
          value.data.onCreateMessage,
        ]);
      },
      error: (error) => console.warn(error),
    });
  }, [])


  useEffect(() => {
    const getMessages = async () => {
      try {
        const messagesReq = await API.graphql({
          query: listMessages,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        setMessages([...messagesReq.data.listMessages.items]);
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();
  }, [])

  const handleSubmit = async (event) => {
    // Prevent the page from reloading
    event.preventDefault();

    // clear the textbox
    setMessageText("");

    const input = {
      // id is auto populated by AWS Amplify
      message: messageText, // the message content the user submitted (from state)
      owner: user.username, // this is the username of the current user
    };

    // Try make the mutation to graphql API
    try {
      await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: createMessage,
        variables: {
          input: input,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  const callbackfn = (message) => (
    <Message
      message={message}
      user={user}
      isMe={user.username === message.owner}
      key={message.id} onSubmit={handleSubmit} value={messageText} onChange={(e) => setMessageText(e.target.value)}/>
  )
  // Call the fetchMessages function when the component mounts

  const compareFn = (a, b) => b.createdAt.localeCompare(a.createdAt)

  return (
    <div className={styles.container}>
      {/*<h1 className={styles.title}> Spellbound Live Chat </h1>*/}
      <div className={styles.chatbox}>
        {messages.sort(compareFn).map(callbackfn)}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.formBase}>
          <input
            type="text"
            id="message"
            name="message"
            autoFocus
            required
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="💬 Send a message to the world 🌎"
            className={styles.textBox}
          />
          <button style={{marginLeft: "8px"}}>Send</button>
        </form>
      </div>
    </div>
  )
}


export default ChatRoom