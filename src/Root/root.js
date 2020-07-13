import React, { Component } from 'react';
import Form from '/home/ark/Downloads/futuremessenger/src/Form.js';
import Notebook from '/home/ark/Downloads/futuremessenger/src/Note Mail/notebook.js';
import "./root.css";

class root extends Component{
    state = {
        imageId: ""
    }
    setImageId = (imageId) => {
        this.setState({imageId:imageId})
    }
    render(){
        return(
            <div className="root">
                <div id="notebook">
                    <Notebook getImageId={this.setImageId}/>
                </div>
                <div id="form">
                    <Form setImageId={this.state.imageId}/>
                </div>
            </div>
        )
    }
}

export default root;