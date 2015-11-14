import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    return (
      <ol className='message-list'>
        {this.props.messages.map(message => {
          return (
            <li key={`message-${message.id}`}>
              {message.text}
            </li>
          );
        })}
      </ol>
    );
  }
}

export default MessageList;
