import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: ''
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file',this.uploadInput.files[0]);
    data.append('filename',this.fileName.value);

    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: data
    }).then(response => {
      response.json().then(body => {
        this.setState({imageURL: `http://localhost:4000/${body.file}`});
      });
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="display-4">Image Upload</h1>
        <form onSubmit={this.handleUploadImage}>
          <div className="form-group">
            <label for="fileUpload" className="mr-2">File: </label>
            <input id="fileUpload"
              ref={ref=>{this.uploadInput = ref;}}
              type="file"/>
          </div>
          <div className="form-group">
              <label for="desiredName" className="mr-2">Name: </label>
              <input id="desiredName"
              ref={ref=>{this.fileName=ref;}}
              type="text"
              placeholder="Enter the desired name of the file"/>
          </div>
          <br/>
          <div>
            <button className="btn btn-primary">Upload</button>
          </div>
          <hr/>
          <p className="display-4">Uploaded Image:</p>
          <div className="row">
            <div className="col-md-12">
              <img src={this.state.imageURL} alt="img"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
