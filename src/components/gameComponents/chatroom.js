import styles from "@/styles/Chatroom.module.css";
import React, {useState, useEffect} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {listMessages} from "@/graphql/queries";
import {onCreateMessage, onUpdateGame} from "@/graphql/subscriptions";
import Message from "@/components/gameComponents/message";
import {createMessage, updateGame} from "@/graphql/mutations";
import useBattlemapStore from "@/stores/battlemapStore";
import {DiceRoller, exportFormats} from '@dice-roller/rpg-dice-roller';

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
                id
                messageType
                messageText
                createdAt
                owner
                advantage
                disadvantage
                damageDice
                damageDiceResults
                rolls
                abilityName
                saveAbility
                saveScore
                messageText
                diceString
                placeholder
                createdAt
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

  }, [])

  useEffect(() => {
    // Define the subscription handler
    const subscriptionHandler = (data) => {
      const newMessage = data.value.data.onCreateMessage;
      console.log('New Message', newMessage);
      setMessages((prevMessages) => [newMessage].concat(prevMessages))
    };

    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, {gameMessageList: gameID}),
      {
        filter: {
          mutationType: {
            eq: 'create',
          }
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
    // Clean up the subscription when the component unmounts or the tab switches
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [])


  // useEffect(() => {
  //   setMessages(gameData.messageList.items);
  // }, [gameData])

  const handleSubmit = async (event) => {
    // Prevent the page from reloading
    event.preventDefault();
    let input = {}
    if (messageText.substring(0, 3) === "/r " || messageText.substring(0, 6) === "/roll ") {
      const dicestring = messageText.split(" ")[1]
      const roller = new DiceRoller()
      console.log(`Rolling dice ${dicestring}`)
      console.log(roller.roll(dicestring))
      input = {
        messageType: "DICEROLL",
        messageText: dicestring,
        owner: playerID,
        gameMessageListId: gameID
      };
    } else {
      // clear the textbox
      console.log(messages)
      input = {
        messageType: "CHAT",
        messageText: messageText,
        owner: playerID,
        gameMessageListId: gameID
      };
    }

    setMessageText("");

    // Call the createNewGame mutation
    const response = await API.graphql({
      query: `
          mutation ParseMessage($input: ParseMessageInput!) {
            parseMessage(input: $input) {
              id
            }
          }
        `,
      variables: {
        input
      },
    });
  }

  const compareFn = (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

  return (
    <div className={styles.container}>
      {/*<h1 className={styles.title}> Spellbound Live Chat </h1>*/}
      <div className={styles.chatbox}>
        {messages.sort(compareFn).map((message) => (
          <Message
            message={message}
            isMe={user.attributes.sub === message.owner}
            key={message.id} onSubmit={handleSubmit}/>))}
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