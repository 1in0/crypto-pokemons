import {Button, Modal, Form} from 'react-bootstrap';
import React, { Component } from "react";


class SellPokemonButton extends Component {

  state = { price: 0, show: false };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    if (parseFloat(this.state.price) > 0) {
      this.props.handleSubmit(this.props.pokemonId, this.state.price);
    };
    this.handleChange({target: {name: 'show', value: false}});
    this.props.handleIsSelling();
  };

	render() {
    return (
      <>
        <Button variant="primary" size="sm" style={{fontSize: ".750rem"}} block onClick={this.handleShow}>Sell</Button>

        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Sell {this.props.nickname} ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupPrice">
                <Form.Label>Sell Price</Form.Label>
                <Form.Control type="text" placeholder="Enter price" name="price" value={this.state.price} onChange={this.handleChange}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Sell
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
	}

}

export default SellPokemonButton;