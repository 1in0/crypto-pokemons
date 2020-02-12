import {Card, Button} from 'react-bootstrap';
import React, { Component } from "react";

class MyAccount extends Component {

	render() {
		return (
			<Card>
			  <Card.Header>My Account</Card.Header>
			  <Card.Body>
			    <Card.Text >
			      <b>Address</b> : {this.props.account} <br/>
			      <b>Tokens Owned</b> : {this.props.tokenCount} <br/>
			      <b> Pending Withdrawal</b> : {this.props.pendingWithdrawal + " Ether"}
			    </Card.Text>
			    {
			    	this.props.pendingWithdrawal > 0 &&
			    	<Button variant="primary" size="sm" onClick={this.props.handleWithdrawal}>Withdrawal</Button>
			    }
			  </Card.Body>
			</Card>
		)

	}

}

export default MyAccount;