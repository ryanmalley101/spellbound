import React from "react";
import styles from "../../styles/Message.module.css";
import * as PropTypes from "prop-types";
import {uuid} from "uuidv4";

function MessageWrapper({isMe, owner, content, createdAt}) {
  var awsDate = new Date(createdAt)
  var dateStr = awsDate.toLocaleString();

  return <div
    className={
      isMe ? styles.sentMessageContainer : styles.receivedMessageContainer
    }
  >
    <p className={styles.senderText}>{owner}</p>
    <div className={isMe ? styles.sentMessage : styles.receivedMessage}>
      {dateStr}
      {content}
    </div>
  </div>;
}


export default function Message({message, isMe}) {
  const {uuid} = require('uuidv4');


  switch (message.messageType) {
    case "CHAT": {
      const content = <p>{message.messageText}</p>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}/>
    }
    case "DICEROLL": {
      const rolls = JSON.parse(message.rolls)
      const content = <div>
        <p>Rolling {rolls.notation}</p>
        <p>{rolls.output}</p>
        <p>Total {rolls.total}</p>
      </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}/>
    }
    case "ATTACK": {
      const rolls = JSON.parse(message.rolls).rolls
      const damageString = message.damageDiceResults.map((damage) => {
        const damageRoll = JSON.parse(damage)[0]
        return <p key={message.id}>{damageRoll.rolls.output} {damageRoll.damageType} damage</p>
      })
      const content =
        <div>
          <p>{message.abilityName}.</p>
          <p>Attack: {rolls[0].total} | {rolls[1].total}</p>
          {damageString}
        </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}/>
    }
    case "SAVEDC": {
      const content = <div>
        <p>{mesage.abilityName}</p>
        <p>DC {message.saveScore}</p>
        <p>{message.saveAbility}</p>
        <p>{message.messageText}</p>
      </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}/>
    }
    case "ABILITY": {
      const content = <div>
        <p>{message.abilityName}</p>
        <p>{message.messageText}</p>
      </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}/>
    }
    case "CHECK": {
      const rolls = JSON.parse(message.rolls).rolls
      const content =
        <div>
          <p>{message.abilityName}.</p>
          <p>{rolls[0].total} | {rolls[1].total}</p>
        </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}/>
    }
    default : {
      console.error("INVALID MESSAGE TYPE", message)
      const content =
        <div>
          <p>Invalid Message Type Returned</p>
        </div>
      return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}/>
    }
  }


}