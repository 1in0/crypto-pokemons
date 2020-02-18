import {Button, Modal, Form, ListGroup} from 'react-bootstrap';
import React, { Component } from "react";


class PokemonBattleDialogue extends Component {

  state = { pokemonId: -1, 
            show: false, 
            pokemonChosen: false, 
            turns: ["Preparing to Battle"], 
            subscribedEvents: [],
            pokemonName: "",
            pokemonHP: -1,
            pokemonNumber: -1 };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.subscribeLogEvent(this.props.contract, "PokemonBattle");
    console.log(this.state.subscribedEvents);
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    });
  };

  handleClose() {
    this.handleChange({target: {name: 'show', value: false}});
    this.handleChange({target: {name: 'pokemonChosen', value: false}});
    this.setState({pokemonName: "", pokemonHP: -1, pokemonNumber: -1, turns: []});
  };

  handleShow() {
    this.handleChange({target: {name: 'show', value: true}});
  };

  handleSubmit() {
    if (parseInt(this.state.pokemonId) > 0) {
      console.log(this.state.pokemonId);
      const currentPokemon = this.getPokemonDetail(this.state.pokemonId);
      this.setState({pokemonName: currentPokemon.nickname, pokemonHP: currentPokemon.hp, pokemonNumber: currentPokemon.pokemonNumber});
      this.props.handleBattleBetweenPokemon(this.state.pokemonId, this.props.enemyPokemonId).then(function(a) {
        console.log(a);
      });

    };
    this.handleChange({target: {name: 'pokemonChosen', value: true}});
  };

  createTableBody = () => {
    let table = []
    for (let i = 0; i < this.props.ownedPokemons.length; i++) {
      let currentPokemon = this.props.ownedPokemons[i];
      let children = currentPokemon.nickname + " ( LV: " + currentPokemon.level + " " + currentPokemon.pokemonName + " )"; 
      table.push(<option value={currentPokemon.pokemonId}>{children}</option>);
    }
    return table;
  };

  createDialogue = () => {
    let table = []
    table.push(<ListGroup.Item><img src={"pokemon_images/medium/" + String(this.state.pokemonNumber).padStart(3,'0') + '.png'} alt="test"/> {this.state.pokemonName} is Ready</ListGroup.Item>)
    table.push(<ListGroup.Item><img src={"pokemon_images/medium/" + String(this.props.enemyPokemonNumber).padStart(3,'0') + '.png'} alt="test"/> {this.props.enemyPokemonName} is Ready</ListGroup.Item>)
    for (let i = 0; i < this.state.turns.length; i++) {
      table.push(<ListGroup.Item>{this.state.turns[i]}</ListGroup.Item>);
    }
    return table;
  }

  getPokemonDetail = (pokemonId) => {
    for (let i = 0; i < this.props.ownedPokemons.length; i++) {
      let currentPokemon = this.props.ownedPokemons[i];
      if (currentPokemon.pokemonId == pokemonId) {
        return currentPokemon;
      }
    }
    return this.props.ownedPokemons[0];
  }

  subscribeLogEvent = (contract, eventName) => {
    const eventJsonInterface = this.props.web3.utils._.find(
      contract._jsonInterface,
      o => o.name === eventName && o.type === 'event',
    )
    const subscription = this.props.web3.eth.subscribe('logs', {
      address: contract.options.address,
      topics: [eventJsonInterface.signature]
    }, (error, result) => {
      if (!error) {
        const eventObj = this.props.web3.eth.abi.decodeLog(
          eventJsonInterface.inputs,
          result.data,
          result.topics.slice(1)
        )
        console.log(`New ${eventName}!`, eventObj);
        if (eventObj.pokemonId1 === this.state.pokemonId && eventObj.pokemonId2 === this.props.enemyPokemonId) {
          const {turns} = this.state;
          for (var i = 0; i < eventObj.turns.length; i++) {
            if (eventObj.whosTurn[i] === "1") {
              if (eventObj.turns[i] === "0") {
                turns.push(this.state.pokemonName + " has missed!");
              } else {
                turns.push(this.state.pokemonName + " just hit and caused " + eventObj.turns[i] + " damage!");
              }
            } else if(eventObj.whosTurn[i] === "2") {
              if (eventObj.turns[i] === "0") {
                turns.push(this.props.enemyPokemonName + " has missed!");
              } else {
                turns.push(this.props.enemyPokemonName + " just hit and caused " + eventObj.turns[i] + " damage!");
              }
            } else {
              if (i > 0) {
                if (eventObj.whosTurn[i-1] == "2") {
                  turns.push(this.state.pokemonName + " has fainted!");
                  break;
                } else {
                  turns.push(this.props.enemyPokemonName + " has fainted!");
                  break;
                }
              }
            }
          }
          this.setState({turns: turns});
        }

      }
    });
    const {subscribedEvents} = this.state;

    subscribedEvents[eventName] = subscription
    this.setState({subscribedEvents: subscribedEvents});
  }


	render() {
    return (
      <>
        <Button variant="primary" size="sm" style={{fontSize: ".750rem"}} block onClick={this.handleShow}>Battle</Button>
        
          {!this.state.pokemonChosen ?
            (
            <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Choose your Pokemon!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Control as="select" name="pokemonId" onChange={this.handleChange} multiple>
                    {this.createTableBody()}
                  </Form.Control>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>
                  Battle
                </Button>
              </Modal.Footer>
            </Modal>
            ) : (

            <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Battle</Modal.Title>

              </Modal.Header>
              <Modal.Body>
              <ListGroup variant="flush">
                {this.createDialogue()}
              </ListGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            )


          }
      </>
    );
	}

}

export default PokemonBattleDialogue;