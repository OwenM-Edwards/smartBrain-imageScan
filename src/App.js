import React, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: '6c8742e148964814b2d8d24f21bd82bb'
});

const particlesOptions = {
  particles: {
    number: {
      value:70,
      density:{
        enable:true,
        value_area:600
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL:this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      // URL
      this.state.input)

      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange ={this.onInputChange} 
          onButtonSubmit ={this.onButtonSubmit}
        />
        <FaceRecognition imageURL={this.state.imageURL} />
      </div>
    );
  }
}
export default App;