import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React, { Component } from "react";

class PokemonNavbar extends Component {

	state = { newTrainer: false };

	constructor(props) {
		super(props);
		if (!!props.newTrainer) {
			this.state.newTrainer = true;
		}
	}

	render() {

		if (!!this.state.newTrainer) {
			return (
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
					<Navbar.Brand href="#home">CryptoMons</Navbar.Brand>
				</Navbar>
			)
		} else {
			return (
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
					<Navbar.Brand href="home">CryptoMons</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
  					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav>
							<Nav.Link href="explore">Explore</Nav.Link>
							<Nav.Link href="team"> My Team </Nav.Link>
							<Nav.Link href="marketplace"> Marketplace </Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			)
		}

	}

}

export default PokemonNavbar;