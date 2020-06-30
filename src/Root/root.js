import React, { Component } from 'react';
import Form from '/home/ark/Downloads/futuremessenger/src/Form.js';
import Notebook from '/home/ark/Downloads/futuremessenger/src/Note Mail/notebook.js';
import "./root.css";

class root extends Component{
    render(){
        return(
            <div className="root">
                <div id="notebook">
                    <Notebook/>
                </div>
                <div id="form">
                    <Form/>
                </div>
            </div>
        )
    }
}

export default root;