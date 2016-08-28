import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {} from './style.less';
import MessageList from 'components/message-list';
import MessageEntryBox from 'components/message-entry-box';
import * as messageActionCreators from 'actions/message-actions';
import * as userActionCreators from 'actions/user-actions';

class App extends Component {
  render() {
    return this.props.user.id ? this.chatWindow() : this.userDetailScreen();
  }

  userDetailScreen() {
    return (
      <div>
        <div>
          <label>Your name</label>
          <input type="text" name="username"
            value={this.props.user.name}
            placeholder="John Smith"
            onChange={this.props.updateUsername} />
        </div>
        <div>
          <label>Your email</label>
          <input type="email" name="email"
            value={this.props.user.email}
            placeholder="john.smith@example.com"
            onChange={this.props.updateEmail} />
        </div>
        <div>
          <button role="button" onClick={this.handleAddUser.bind(this)}>Start</button>
        </div>
      </div>
    );
  }

  handleAddUser() {
    // XXX validate email and name
    this.props.addUser(this.props.user);
  };

  chatWindow() {
    return (
      <div>
        <MessageList userId={this.props.user.id} messages={this.props.messages}/>
        <MessageEntryBox
          value={this.props.currentMessage}
          userId={this.props.user.id}
          onChange={this.props.updateMessage}
          onSubmit={this.props.addMessage}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentMessage: state.currentMessage,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(messageActionCreators, dispatch),
    bindActionCreators(userActionCreators, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
