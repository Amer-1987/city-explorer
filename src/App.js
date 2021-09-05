import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// import Header from './Header';
// import Footer from './Footer';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      displayName: '',
      mapStatus: false,
      showError: false,
    }
  }


  getData = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    const key = 'pk.faf2850435d2e009e64aef4bffa3dead'
    const URL = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityName}&format=json`

    try {
      let respResult = await axios.get(URL);
      console.log(respResult);
      this.setState({
        lat: respResult.data[0].lat,
        lon: respResult.data[0].lon,
        displayName: respResult.data[0].display_name,
        mapStatus: true,
      })
    }
    catch {
      console.log('error');
      this.setState({
        showError: true,
      })
    }
  }

  render() {
    return (
      <>
        <h1>Location App </h1>
        <Form onSubmit={this.getData}>
          <Form.Group className="mb-3" controlId="horned">
            <Form.Label>Where Would you like to explore?</Form.Label>


            <Form.Control type='text' name='cityName' placeholder="Name of The city" />
            <Button variant="primary" type='submit'> Explore
            </Button>
          </Form.Group>
        </Form>
        <h1>Welcome to {this.state.displayName}</h1>
        <h5>{this.state.displayName}  is located at {this.state.lat} by {this.state.lon}</h5>

      


        {this.state.mapStatus && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.faf2850435d2e009e64aef4bffa3dead&center=${this.state.lat},${this.state.lon}&zoom=<zoom>&size=<width>x<height>&format=JSON&maptype=<MapType>&markers=icon:<icon>|${this.state.lat},${this.state.lon}&markers=icon:<icon>|${this.state.lat},${this.state.lon}`} />}

        {this.state.showError && <p>Error, sorry for that</p>}

      </>
    )
  }
}


export default App;
