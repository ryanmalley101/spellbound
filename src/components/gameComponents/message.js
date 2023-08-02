import React, {useEffect, useState} from "react";
import styles from "../../styles/Message.module.css";
import * as PropTypes from "prop-types";
import {v4} from "uuid";
import useBattlemapStore from "@/stores/battlemapStore";
import {API, graphqlOperation} from "aws-amplify";
import {onCreateMessage} from "@/graphql/subscriptions";

function MessageWrapper({owner, content, createdAt, id}) {
  var awsDate = new Date(createdAt)
  var dateStr = awsDate.toLocaleString();
  const gamePlayers = useBattlemapStore((state) => state.gamePlayers)
  const playerID = useBattlemapStore((state) => state.playerID)
  const [renderedMessage, setRenderedMessage] = useState(null);

  const renderMessage = () => {
    const messagePlayer = gamePlayers.filter(player => player.id === owner)
    if (messagePlayer.length < 1) {
      console.log("No matching player for the message's owner")
      console.log(gamePlayers)
      console.log(owner)
      return null
    } else if (messagePlayer.length > 1) {
      console.log("Multiple matching players for message's owner, using the first one")
    }
    const playerName = messagePlayer[0].name
    const isMe = owner === playerID
    console.log("Rendering messages")
    return <div
      className={
        isMe ? styles.sentMessageContainer : styles.receivedMessageContainer
      }
      key={id}
    >
      <p className={styles.senderText}>{playerName}</p>
      <div className={isMe ? styles.sentMessage : styles.receivedMessage}>
        {dateStr}
        {content}
      </div>
    </div>;
  }

  useEffect(() => {
    if (gamePlayers === [] || !owner) {
      return
    }
    setRenderedMessage(renderMessage())
  }, [gamePlayers])

  return renderedMessage
}


export default function Message({message, isMe}) {
  // console.log(message)

  switch (message.messageType) {
    case "CHAT": {
      const content = <p>{message.messageText}</p>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                             id={message.id}/>
    }
    case "DICEROLL": {
      const rolls = JSON.parse(message.rolls)
      const content = <div>
        <p>Rolling {rolls.notation}</p>
        <p>{rolls.output}</p>
        <p>Total {rolls.total}</p>
      </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                             id={message.id}/>
    }
    case "ATTACK": {
      // console.log("Received attack message")
      // console.log(message)
      const rolls = JSON.parse(message.rolls).rolls
      const parsedDamageResults = JSON.parse(message.damageDiceResults)
      const damageString = parsedDamageResults.map((damage) => {
        return <p key={v4()}>{damage.rolls.output} {damage.damageType} damage</p>
      })
      const content =
        <div>
          <p>{message.abilityName}.</p>
          <p>Attack: {rolls[0].total} | {rolls[1].total}</p>
          {damageString}
        </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                             id={message.id}/>
    }
    case "SAVEDC": {
      const content = <div>
        <p>{mesage.abilityName}</p>
        <p>DC {message.saveScore}</p>
        <p>{message.saveAbility}</p>
        <p>{message.messageText}</p>
      </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                             id={message.id}/>
    }
    case "ABILITY": {
      const content = <div>
        <p>{message.abilityName}</p>
        <p>{message.messageText}</p>
      </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                             id={message.id}/>
    }
    case "CHECK": {
      const rolls = JSON.parse(message.rolls).rolls
      const content =
        <div>
          <p>{message.abilityName}.</p>
          <p>{rolls[0].total} | {rolls[1].total}</p>
        </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                             id={message.id}/>
    }
    default : {
      console.error("INVALID MESSAGE TYPE", message)
      const content =
        <div>
          <p>Invalid Message Type Returned</p>
        </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                             id={message.id}/>
    }
  }


}