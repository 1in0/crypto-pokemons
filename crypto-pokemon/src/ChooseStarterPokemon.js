import {CardDeck, Card, Button, Badge} from 'react-bootstrap';
import './Starter.css';
import React, { Component } from "react";

class ChooseStarterPokemon extends Component {


	render() {
		if (this.props.currentStep !== 1) {
			return null;
		} else {
			return (
			    <div className="CardDeck">
			    <br/>
			    <Card body>Hey, Explorer! Welcome to the world of Pokemon! Please pick a starter pokemon to start your journey.</Card>
			      <br />
			      <CardDeck>
			        <Card>
			          <Card.Img style={{width:"200px"}} className="starter-pokemon" variant="top" src="./pokemon_images/1.png" />
			          <Card.Body>
			            <Card.Title>Bulbasaur</Card.Title>
			            <Card.Text>
			               A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.
			            </Card.Text>
			            <div>
			              <Badge variant="success">Grass</Badge>
			              <Badge variant="secondary">Poison</Badge>
			            </div>
			          </Card.Body>
			          <Card.Footer>
			            <small className="text-muted"><Button variant="primary" name="pokemonNumber" value={0} onClick={this.props.handleChange}>Pick Me</Button>{' '}</small>
			          </Card.Footer>
			        </Card>
			        <Card>
			          <Card.Img variant="top" className="starter-pokemon" style={{width:"200px"}} src="./pokemon_images/4.png" />
			          <Card.Body>
			            <Card.Title>Charmander</Card.Title>
			            <Card.Text>
			              Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.
			            </Card.Text>
			            <Badge variant="danger">Fire</Badge>
			          </Card.Body>
			          <Card.Footer>
			            <small className="text-muted"><Button variant="primary" name="pokemonNumber" value={2} onClick={this.props.handleChange}>Pick Me</Button>{' '}</small>
			          </Card.Footer>
			        </Card>
			        <Card>
			          <Card.Img variant="top" className="starter-pokemon" style={{width:"200px"}}  src="./pokemon_images/7.png" />
			          <Card.Body>
			            <Card.Title>Squirtle</Card.Title>
			            <Card.Text>
			              After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.
			            </Card.Text>
			            <Badge variant="primary">Water</Badge>
			          </Card.Body>
			          <Card.Footer>
			            <small className="text-muted"><Button variant="primary" name="pokemonNumber" value={6} onClick={this.props.handleChange}>Pick Me</Button>{' '}</small>
			          </Card.Footer>
			        </Card>
			      </CardDeck>
			    </div>
			)
		}

	}

}

export default ChooseStarterPokemon;