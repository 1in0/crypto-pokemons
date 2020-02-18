import {Button, Modal, Form} from 'react-bootstrap';
import React, { Component } from "react";


class SharePokemonButton extends Component {

  state = { address: "", show: false };

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
    if (!!(this.state.address)) {
      this.props.handlePokemonShareCard(this.props.pokemonId, this.state.address);
    };
    this.handleChange({target: {name: 'show', value: false}});
    this.props.handleIsSharing();
  };

	render() {
    return (
      <>
        <Button variant="primary" size="sm" style={{fontSize: ".750rem"}} block onClick={this.handleShow}>Share</Button>

        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Share {this.props.nickname} ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupPrice">
                <Form.Label>Who would you like to share with? </Form.Label>
                <Form.Control type="text" placeholder="Address" name="address" value={this.state.address} onChange={this.handleChange}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Share
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
	}

}

export default SharePokemonButton;