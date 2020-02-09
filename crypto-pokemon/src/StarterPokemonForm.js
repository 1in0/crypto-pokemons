import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import ChooseStarterPokemon from "./ChooseStarterPokemon";
import ChooseStarterPokemonName from "./ChooseStarterPokemonName";

class StarterPokemonForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      pokemonNumber: '',
      nickname: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handlePokemonPick = this.handlePokemonPick.bind(this);

    this._prev = this._prev.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    });
  }
  
  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault()
    const { pokemonNumber, nickname } = this.state
    if (!!pokemonNumber && !!nickname) {
      this.props.handleChange({
        target: {
          name: "newTrainer",
          value: false
        }
      })
    }
  }

  handlePokemonPick(event) {
    const {name, value} = event.target;
    let currentStep = this.state.currentStep;
    this.setState({
      [name]: value,
      currentStep: currentStep + 1
    });
  }

  _prev() {
    let currentStep = this.state.currentStep
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  get previousButton(){
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if(currentStep !== 1){
      return (
        <Button variant="secondary" onClick={this._prev}>Previous</Button>
      )
    }
    return null;
  }
  
  render() { 
    return (
      <React.Fragment>        
      <Form onSubmit={this.handleSubmit}>
        <ChooseStarterPokemon 
          currentStep={this.state.currentStep} 
          handleChange={this.handlePokemonPick}
          pokemonNumber={this.state.pokemonNumber}
        />
        <ChooseStarterPokemonName 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          nickname={this.state.nickname}
          handlePrev={this._prev}
        />     
      </Form>
      </React.Fragment>
    )
  }
}

export default StarterPokemonForm;