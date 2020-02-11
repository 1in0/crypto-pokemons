import {Card} from 'react-bootstrap';
import React, { Component } from "react";

class MyAccount extends Component {

	render() {
		return (
			<Card>
			  <Card.Header>My Account</Card.Header>
			  <Card.Body>
			    <Card.Text >
			      <b>Address</b> : {this.props.account} <br/>
			      <b>Tokens Owned</b> : {this.props.tokenCount}
			    </Card.Text>
			  </Card.Body>
			</Card>
		)

	}

}

export default MyAccount;