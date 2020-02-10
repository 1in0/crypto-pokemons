import {Table, Button} from 'react-bootstrap';
import React, { Component } from "react";

class MarketplaceTable extends Component {

	render() {
		return (
			<Table responsive>
			  <thead>
			    <tr>
			      <th></th>
			      <th>Name</th>
			      <th>Type</th>
			      <th>HP</th>
			      <th>ATK</th>
			      <th>DEF</th>
			      <th>SP-ATK</th>
			      <th>SP-DEF</th>
			      <th>LV</th>
			      <th>Gender</th>
			      <th>Action</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
			      <td style={{ padding: .2}}><img src={"pokemon_images/medium/" + String(1).padStart(3,'0') + '.png'} alt="test"/></td>
			      <td>Bulbasour</td>
			      <td>223</td>
			      <td>Ground</td>
			      <td>12</td>
			      <td>123</td>
			      <td>23</td>
			      <td>11</td>
			      <td>22</td>
			      <td>Male</td>
			      <td><Button variant="primary" size="sm" block>Buy</Button></td>
			    </tr>
			  </tbody>
			</Table>
		)
	}

}

export default MarketplaceTable;