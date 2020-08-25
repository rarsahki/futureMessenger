import React, { Component } from 'react';
import "./menu.css";
import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { urlencoded } from 'body-parser';

class menu extends Component{
    Undo = (e) => {
        this.execCommandOnElement(document.getElementsByClassName("writingspace")[0],"undo","")
    }
    Redo = (e) => {
        this.execCommandOnElement(document.getElementsByClassName("writingspace")[0],"redo","")
    }
    action = (e) => {
        e.preventDefault();
        if(document.getElementById(e.target.id).style.color !== "white")
            document.getElementById(e.target.id).style.color = "white"
        else
            document.getElementById(e.target.id).style.color = "black"
    }
    method = (e) => {
            this.props.submit()
    }
    execCommandOnElement = (el, commandName, value) => {
        if (typeof value == "undefined") {
            value = null;
        }

        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();

            var savedRanges = [];
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                savedRanges[i] = sel.getRangeAt(i).cloneRange();
            }

            document.designMode = "on";

            sel = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(el);
            sel.removeAllRanges();
            sel.addRange(range);

            document.execCommand(commandName, false, value);

            document.designMode = "off";

            sel = window.getSelection();
            sel.removeAllRanges();
            for (var i = 0, len = savedRanges.length; i < len; ++i) {
            sel.addRange(savedRanges[i]);
            }
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.execCommand(commandName, false, value);
        }
    }
    render(){
        return(
            <DeviceOrientation lockOrientation={'landscape'}>
                <Orientation orientation='landscape' alwaysRender={false}>
                    <div className="menu_horizontal" style={{fontFamily:"menuFont",fontSize:"2vw",color:"black"}}>
                        <div id="Home" style={{textAlign:"center",marginTop:"auto",marginLeft:"3vw",display:"inline-block"}}
                            onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Home</div>
                        <div id="Undo" style={{textAlign:"center",marginTop:"auto",marginLeft:"5vw",display:"inline-block"}} 
                            onClick={(e) => {this.Undo(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Undo</div>
                        <div id="Redo" style={{textAlign:"center",marginTop:"auto",marginLeft:"5vw",display:"inline-block"}}
                            onClick={(e) => {this.Redo(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Redo</div>
                        <div id="Submit" style={{textAlign:"center",marginTop:"auto",marginLeft:"5vw",display:"inline-block"}}
                            onClick={(e) => {this.method(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Submit</div>
                    </div>
                </Orientation>
                <Orientation orientation='portrait' alwaysRender={false}>
                    <div className="menu_vertical" style={{fontFamily:"menuFont",fontSize:"2vh",color:"black"}}>
                        <div id="Home" style={{textAlign:"center",marginLeft:"auto",marginTop:"2vh"}}
                            onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Home</div>
                        <div id="Undo" style={{textAlign:"center",marginLeft:"auto",marginTop:"2vh"}} 
                            onClick={(e) => {this.Undo(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Undo</div>
                        <div id="Redo" style={{textAlign:"center",marginLeft:"auto",marginTop:"2vh"}}
                            onClick={(e) => {this.Redo(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Redo</div>
                        <div id="Submit" style={{textAlign:"center",marginLeft:"auto",marginTop:"2vh"}}
                            onClick={(e) => {document.getElementById('form').scrollIntoView({behavior: 'smooth'})}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Submit</div>
                    </div>
                </Orientation>
            </DeviceOrientation>
        )
    }
}

export default menu;