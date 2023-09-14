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
            <strong className={styles.senderText}>{playerName}</strong>
            <div className={isMe ? styles.sentMessage : styles.receivedMessage}>
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
    const critCheck = (rolls) => {
        if (!rolls.notation.includes("1d20")) {
            return null
        }

        if (rolls.total === rolls.maxTotal) {
            return <strong>(CRIT SUCCESS)</strong>
        } else if (rolls.total === rolls.minTotal) {
            return <strong>(CRIT FAIL)</strong>
        }
        return null
    }

    switch (message.messageType) {
        case "CHAT": {
            const content = <p>{message.messageText}</p>
            return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                                   id={message.id}/>
        }
        case "DICEROLL": {
            const rolls = JSON.parse(message.rolls)
            console.log(rolls)

            const content = <div>
                <strong>Rolling {rolls.notation}</strong>
                <p>{rolls.output}</p>
                <strong>Total {rolls.total} {critCheck(rolls)}</strong>
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
            let attackRoll
            if (message.advantage === "disadvantage") {
                if (rolls[1].total < rolls[0].total) {
                    attackRoll =
                        <p>Attack: {rolls[0].total} | <strong> {rolls[1].total} {critCheck(rolls[1])}</strong></p>
                } else {
                    attackRoll =
                        <p>Attack: <strong>{rolls[0].total} {critCheck(rolls[0])}</strong> | {rolls[1].total}</p>
                }
            } else if (message.advantage === "advantage") {
                if (rolls[1].total > rolls[0].total) {
                    attackRoll =
                        <p>Attack: {rolls[0].total} | <strong> {rolls[1].total} {critCheck(rolls[1])}</strong></p>
                } else {
                    attackRoll =
                        <p>Attack: <strong>{rolls[0].total} {critCheck(rolls[0])}</strong> | {rolls[1].total}</p>
                }
            } else {
                attackRoll = <p>Attack: <strong> {rolls[0].total} {critCheck(rolls[0])}</strong></p>
            }
            const content =
                <div>
                    <strong>{message.abilityName}.</strong>
                    {attackRoll}
                    <p>-----------------------------------</p>
                    {damageString}
                    <p>{message.messageText}</p>
                </div>
            return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                                   id={message.id}/>
        }
        case "SAVEDC": {
            const content = <div>
                <strong>{mesage.abilityName}</strong>
                <p>DC {message.saveScore}</p>
                <p>{message.saveAbility}</p>
                <p>{message.messageText}</p>
            </div>
            return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                                   id={message.id}/>
        }
        case "ABILITY": {
            const content = <div>
                <strong>{message.abilityName}</strong>
                <p>{message.messageText}</p>
            </div>
            return <MessageWrapper me={isMe} owner={message.owner} content={content} createdAt={message.createdAt}
                                   id={message.id}/>
        }
        case "CHECK": {
            const rolls = JSON.parse(message.rolls).rolls
            let checkRoll
            if (message.advantage === "disadvantage") {
                console.log(rolls)
                if (rolls[1].total < rolls[0].total) {
                    checkRoll =
                        <p>Total: {rolls[0].total} | <strong> {rolls[1].total} {critCheck(rolls[1])}</strong></p>
                } else {
                    checkRoll = <p>Total: <strong>{rolls[0].total} {critCheck(rolls[0])}</strong> | {rolls[1].total}</p>
                }
            } else if (message.advantage === "advantage") {
                if (rolls[1].total > rolls[0].total) {
                    checkRoll =
                        <p>Total: {rolls[0].total} | <strong> {rolls[1].total} {critCheck(rolls[1])}</strong></p>
                } else {
                    checkRoll = <p>Total: <strong>{rolls[0].total} {critCheck(rolls[0])}</strong> | {rolls[1].total}</p>
                }
            } else {
                checkRoll = <p>Total: <strong> {rolls[0].total} {critCheck(rolls[0])}</strong></p>
            }
            const content =
                <div>
                    <strong>{message.abilityName}.</strong>
                    {checkRoll}
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