import styles from "@/styles/Chatroom.module.css";
import React, {useState, useEffect} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {listMessages} from "@/graphql/queries";
import {onCreateMessage, onUpdateGame} from "@/graphql/subscriptions";
import Message from "@/components/gameComponents/message";
import {createMessage, updateGame} from "@/graphql/mutations";
import useBattlemapStore from "@/stores/battlemapStore";

const ChatRoom = ({user}) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const gameID = useBattlemapStore((state) => state.gameID)
  const playerID = useBattlemapStore((state) => state.playerID)

  useEffect(() => {
    const getMessages = async () => {
      const response = await API.graphql({
        query: `
        query GetGameMessageList($id: ID!) {
          getGame(id: $id) {
            messageList {
              items {
                message
                createdAt
                owner
              }
              # Include any other fields you need from the messageList object
            }
          }
        }
      `,
        variables: {
          id: gameID,
        },
      });
      console.log(response)
      setMessages(response.data.getGame.messageList.items)
    }
    getMessages()

    // Define the subscription handler
    const subscriptionHandler = (data) => {
      const updatedGame = data.value.data.onUpdateGame.messageList;
      console.log('Updated Game:', updatedGame);

      // Handle the new message in the updated game
      setMessages(updatedGame)
      // console.log('New Message:', newMessage);
      // Update your chatroom UI with the new message
    };

    const subscription = API.graphql(
      graphqlOperation(onUpdateGame, {id: gameID}),
      {
        filter: {
          mutationType: {
            eq: 'update',
          },
          updatedFields: {
            contains: 'messageList',
          },
        },
      }
    ).subscribe({
      next: (data) => {
        subscriptionHandler(data);
      },
      error: (error) => {
        console.error('Subscription Error:', error);
      },
    });
  }, [])


  // useEffect(() => {
  //   setMessages(gameData.messageList.items);
  // }, [gameData])

  const handleSubmit = async (event) => {
    // Prevent the page from reloading
    event.preventDefault();

    // clear the textbox
    setMessageText("");
    console.log(messages)
    const input = {
      id: gameID,
      messageList: [...messages,
        {
          message: messageText,
          createdAt: Date.now(),
          owner: playerID
        },
      ],
    };

// Call the updateGame mutation
    API.graphql(graphqlOperation(updateGame, {input}))
      .then((response) => {
        const updatedGame = response.data.updateGame;
        console.log('Updated Game:', updatedGame);
      })
      .catch((error) => {
        console.error('Error updating game:', error);
      });
  }

  const compareFn = (a, b) => b.createdAt - a.createdAt

  return (
    <div className={styles.container}>
      {/*<h1 className={styles.title}> Spellbound Live Chat </h1>*/}
      <div className={styles.chatbox}>
        {messages.sort(compareFn).map((message) => (
          <Message
            message={message}
            user={user}
            isMe={user.attributes.sub === message.owner}
            key={message.createdAt} onSubmit={handleSubmit} value={messageText}
            onChange={(e) => setMessageText(e.target.value)}/>))}
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