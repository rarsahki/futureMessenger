import React, { Component } from 'react';
import "./root.css";
import Form from '../Form';
import Notebook from '../Note Mail/notebook';

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