import React, { Component } from 'react';
import "./notebookMenu.css";
import DeviceOrientation, { Orientation } from 'react-screen-orientation'

class notebookMenu extends Component{

    state = {
        range: ""
    }

    action = (e) => {
        e.preventDefault();
        if(document.getElementById(e.target.id).style.color !== "white")
            document.getElementById(e.target.id).style.color = "white"
        else
            document.getElementById(e.target.id).style.color = "black"
    }

    click = (e) => {
        if(e.target.id !== "insertImage"){
            e.preventDefault();
            this.props.range(e.target.id);
        }
        else{
            e.preventDefault();
            document.getElementById("insertimage").click()
        }

    }

    change = (e) => {
        console.log(e.target.files[0].name)
        this.props.image(URL.createObjectURL(e.target.files[0]))
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
                    <div className="notebookMenu_horizontal" style={{fontFamily:"notebookMenuFont",fontSize:"2vw",color:"black"}}>
                        <div id="bold" style={{textAlign:"center",marginTop:"auto",marginLeft:"3vw",display:"inline-block",fontStyle:"Bold",fontSize:"X-Large"}}
                            onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                B</div>
                        <div id="italic" style={{textAlign:"center",marginTop:"auto",marginLeft:"3vw",display:"inline-block",fontStyle:"Italic",fontSize:"X-Large"}} 
                            onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                I</div>
                        <div id="underline" style={{textAlign:"center",marginTop:"auto",marginLeft:"3vw",display:"inline-block",textDecoration:"Underline",fontSize:"X-Large"}}
                            onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                U</div>
                        <div id="strikeThrough" style={{textAlign:"center",marginTop:"auto",marginLeft:"3vw",display:"inline-block",textDecoration:"line-through",fontSize:"X-Large"}}
                            onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                S</div>
                        <div id="largeFont" style={{textAlign:"center",marginTop:"auto",marginLeft:"3vw",display:"inline-block",fontSize:"X-Large"}}
                            onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Large</div>
                        <div id="normalFont" style={{textAlign:"center",marginTop:"auto",marginLeft:"3vw",display:"inline-block",fontSize:"Medium"}}
                            onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Normal</div>
                        <div id="smallFont" style={{textAlign:"center",marginTop:"auto",marginLeft:"3vw",display:"inline-block",fontSize:"Small",fontStyle:"Bold"}}
                            onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                Small</div>
                        <input style={{display:"none"}} type="file" id="insertimage" name="img" accept="image/*" onChange={(e) => {this.change(e)}}></input>
                        <div id="insertImage" style={{marginLeft:"3vw",display:"inline-block"}} onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                        </div>
                        <div id="justifyLeft" style={{marginLeft:"3vw",display:"inline-block"}} onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                        </div>
                        <div id="justifyCenter" style={{marginLeft:"3vw",display:"inline-block"}} onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                        </div>
                        <div id="justifyRight" style={{marginLeft:"3vw",display:"inline-block"}} onClick={(e) => {this.click(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                        </div>
                    </div>
                </Orientation>
                <Orientation orientation='portrait' alwaysRender={false}>
                    <div className="notebookMenu_vertical" style={{fontFamily:"menuFont",fontSize:"2vh",color:"black"}}>
                        <div id="Home" style={{textAlign:"center",marginRight:"auto",marginTop:"2vh"}}
                                onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                    Home</div>
                            <div id="Undo" style={{textAlign:"center",marginRight:"auto",marginTop:"2vh"}} 
                                onClick={(e) => {this.Undo(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                    Undo</div>
                            <div id="Redo" style={{textAlign:"center",marginRight:"auto",marginTop:"2vh"}}
                                onClick={(e) => {this.Redo(e)}} onMouseOver={(e) => {this.action(e)}} onMouseOut={(e) => {this.action(e)}}>
                                    Redo</div>
                    </div>
                </Orientation>
            </DeviceOrientation>
        )
    }
}

export default notebookMenu;