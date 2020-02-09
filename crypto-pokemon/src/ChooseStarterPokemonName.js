import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col, Card} from 'react-bootstrap';
import React, { Component } from "react";

class ChooseStarterPokemon extends Component {

	render() {
		if (this.props.currentStep !== 2) {
			return null;
		} else {
			return (
			    <div className="CardDeck">
			    <br/>
			    <Card body>Nice Choice!! Now, that you have chosen a pokemon, lets name it! Type its name below: </Card>
			      <br />
					<div className="ChooseStarterPokemon">
			          <Form.Group controlId="nickname">
			            <Form.Control type="text" placeholder="Nickname" name="nickname" value={this.props.nickname} onChange={this.props.handleChange}/>
			        </Form.Group>


				  <Row>
				    <Col xs lg="1">
			          <Button variant="secondary" type="submit" onClick={this.props.handlePrev}>
			            Prev
			          </Button>
				    </Col>
				    <Col></Col>
				    <Col xs lg="1">
			          <Button variant="primary" type="submit" onClick={this.props.handleSubmit}>
			            Submit
			          </Button>
				    </Col>
				  </Row>
		          	</div>
			    </div>
			)
		}

	}

}

export default ChooseStarterPokemon;