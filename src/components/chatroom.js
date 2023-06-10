import React from "react";
import styles from "@/styles/Home.module.css";

class ChatRoom extends React.Component {
  render() {
    return <div className={styles.container}>
      <h1 className={styles.title}> AWS Amplify Live Chat</h1>
      <div className={styles.chatbox}>
        {this.props.stateMessages
          // sort messages oldest to newest client-side
          .sort(this.props.compareFn)
          .map(this.props.callbackfn)}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={this.props.onSubmit} className={styles.formBase}>
          <input
            type="text"
            id="message"
            name="message"
            autoFocus
            required
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder="💬 Send a message to the world 🌎"
            className={styles.textBox}
          />
          <button style={{marginLeft: "8px"}}>Send</button>
        </form>
      </div>
    </div>;
  }
}

export default ChatRoom