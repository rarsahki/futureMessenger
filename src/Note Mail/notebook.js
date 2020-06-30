import React, { Component } from 'react';
import "./notebook.css";
import Macha from './menu';
import Macha2 from './notebookMenu';
import Button from 'react-bootstrap/Button';

class notebook extends Component{
    contextMenu = (e) => {
        if(window.getSelection()!== null){
            return(<div>Macha</div>)
        }else{

        }
    }

    render(){
        return(
            <div className="noteBook">
                <Macha2/>
                <Macha/>
                <div onMouseUp={(e) => {this.contextMenu(e)}} contentEditable="true" className="writingspace">
                </div>
            </div>
        )
    }
}

export default notebook;