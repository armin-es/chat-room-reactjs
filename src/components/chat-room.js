import React, { Component } from 'react';

export default class ChatRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			message: ''
		};
		this.updateMessages = this.updateMessages.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	componentDidMount() {
		firebase.database().ref('/messages').on('value', (snapshot) => {
			const allMessages = snapshot.val();
			if (allMessages != null) {
				this.setState({messages: allMessages});
			}
		});
	}

	updateMessages(event) {
		// this.setState(() => {messages.push(message)});
		this.setState({message: event.target.value});
		console.log(this.state.message);
	}

	sendMessage(event) {
		const nextMessage = {
			id: this.state.messages.length,
			text: this.state.message
		};
		var list = Object.assign([], this.state.messages);
		list.push(nextMessage);
		this.setState({messages: list});
		// console.log(list);
		firebase.database().ref('messages/' + nextMessage.id).set(nextMessage);
		// firebase.database().ref().on('value', (snapshot) => {console.log(snapshot.val())});
	}

	render() {
		const messageList = this.state.messages.map((message) => {
			return (
					<li className="list-group-item" key={message.id}>{message.text}</li>
			);
		});

		// console.log(this.state.message);
		// console.log(messageList);

		return (
			<div>
				<ul className="list-group message-list-container">
					{messageList}
				</ul>
				<div className="message-input-container input-group">

					<input type="text"
						className="form-control message-input"
						onChange={this.updateMessages}
						placeholder="Type your message..." />
					<div className="input-group-addon">
						<button type="submit" className="btn" onClick={this.sendMessage}>Send</button>
					</div>
				</div>
			</div>
		);
	}
}