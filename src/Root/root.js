import React, { Component } from 'react';
import "./root.css";
import Form from '../Form';
import Notebook from '../Note Mail/notebook';

class root extends Component{
    state = {
        imageId: "",
        alertMessage: "",
        alertStatus: false
    }
    setImageId = (imageId) => {
        this.setState({imageId:imageId})
    }
    setAlertMessage = (alertMessage) => {
        this.setState({alertMessage:alertMessage})
    }
    setAlertStatus = (alertStatus) => {
        this.setState({alertStatus:alertStatus})
    }
    render(){
        return(
            <div className="root">
                <div id="notebook">
                    <Notebook getImageId={this.setImageId} setAlertMessage={this.state.alertMessage}
                        setAlertStatus={this.state.alertStatus}
                        getAlertStatus={this.setAlertStatus}
                        getAlertMessage={this.setAlertMessage}/>
                </div>
                <div id="form">
                    <Form setImageId={this.state.imageId} getAlertMessage={this.setAlertMessage}
                        getAlertStatus={this.setAlertStatus}/>
                </div>
            </div>
        )
    }
}

export default root;