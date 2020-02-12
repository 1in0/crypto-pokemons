import {Button, Badge, Modal, Table} from 'react-bootstrap';
import React, { Component } from "react";

class BreedPokemon extends Component {

  state = { choosenPokemon: null, show: false };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleBreedWith = this.handleBreedWith.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    });
  };

  handleClose() {
    this.handleChange({target: {name: 'show', value: false}});
  };

  handleShow() {
    this.handleChange({target: {name: 'show', value: true}});
  };

  handleBreedWith(event) {
    const {name, value} = event.target;
    // the pokemon with id 'name' is male
    if (value === "true") {
      this.props.breedWith(parseInt(this.props.pokemonId), parseInt(name));
    } else {
      this.props.breedWith(parseInt(name), parseInt(this.props.pokemonId));
    }
    this.handleClose();
  }

  createValidPartnerTable = () => {
    let table = []
    if (!!this.props.validPartners) {
      for (let i = 0; i < this.props.validPartners.length; i++) {
        let currentPokemon = this.props.validPartners[i];
        if (currentPokemon.pokemonId !== this.props.pokemonId && currentPokemon.breedReady) {
          let children = [
              <td style={{ padding: .2}}><img src={"pokemon_images/medium/" + String(currentPokemon.pokemonNumber).padStart(3,'0') + '.png'} alt="test"/></td>,
              <td>{currentPokemon.nickname}</td>,
              <td>{currentPokemon.type1}</td>,
              <td>{currentPokemon.level}</td>,
              <td>{currentPokemon.hp}</td>,
              <td>{currentPokemon.attack}</td>,
              <td>{currentPokemon.defense}</td>,
              <td><Button variant="info" onClick={this.handleBreedWith} value={currentPokemon.gender} name={currentPokemon.pokemonId}>Breed</Button></td>];
          table.push(<tr>{children}</tr>);
        }

      }
    }
    return table;
  }

	render() {
    return (
      <>
        <Badge variant="success" size="sm" style={{fontSize: ".750rem"}} onClick={this.handleShow}>Ready to Breed</Badge>

        <Modal show={this.state.show} onHide={this.handleClose} animation={false} scrollable={true}>
          <Modal.Header closeButton>
            <Modal.Title>Find a partner for {this.props.nickname} ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>LV</th>
                  <th>HP</th>
                  <th>ATK</th>
                  <th>DEF</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.createValidPartnerTable()}
              </tbody>
            </Table>
          </Modal.Body>

        </Modal>
      </>
    );
	}

}

export default BreedPokemon;