import React, { Component } from 'react';
import "./notebook.css";
import Macha from './menu';
import Macha2 from './notebookMenu';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { Spinner} from "react-loading-io";
import { Alert } from '@material-ui/lab';

class notebook extends Component{
    state = {
        range: "",
        id: "",
        imageUrl: "",
        canvas: "",
        imageId: "5f0b5cec6c996b66cb50e76f",
        buttonText: "Done",
        loading: false,
        entry: true,
        alert: false
    }
    rangeChange = (e) => {
        var el = document.getElementsByClassName("writingspace")[0];
        var range = document.createRange();
        var sel = document.getSelection();
        var length = el.childNodes[el.childNodes.length-1].textContent.length;
        console.log(length+":"+el.childNodes[el.childNodes.length-1].textContent)
        range.setStart(el.childNodes[el.childNodes.length-1],++length)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
        this.setState({range:range})
    }
    contextMenu = (e) => {
        var range = document.getSelection().getRangeAt(0);
        this.setState({range:range})
    }
    exec = (id) => {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(this.state.range);
        if(id === "largeFont"){
            document.execCommand("fontSize",null,6);
        }else if(id === "normalFont"){
            document.execCommand("fontSize",null,3);
        }else if(id === "smallFont"){
            document.execCommand("fontSize",null,2);
        }else{
            document.execCommand(id,null,null);
        }
    }
    submit = () => {
        this.setState({loading:true})
        html2canvas(document.getElementsByClassName("writingspace")[0],
        { logging: true, letterRendering: 1, allowTaint: false ,useCORS: true })
        .then(canvas => canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'filename.png');
            // Post via axios or other transport method
            axios.post('http://aqueous-castle-25723.herokuapp.com/upload', formData).then(res => {this.setState({imageId:res.data.imageId})
                                                                              this.setState({buttonText:"Submit"})
                                                                              this.setState({loading:false})
                                                                              document.getElementsByClassName("noteBook")[0].style.filter = "blur(0px)"
                                                                              this.shift()})
            .catch((err) => {
                    console.log("Error: ", err)
                    this.setState({entry:true})
                    this.props.getAlertStatus(true)
                    this.props.getAlertMessage("Network error! Please try again. Sorry for inconvenience")
                }
            )
        }))
    }
    shift = () => {
        console.log(this.state.imageId)
        this.props.getImageId(this.state.imageId)
        document.getElementsByClassName('App')[0].scrollIntoView({behavior: 'smooth'});
        this.setState({entry:true})
    }
    dataURLtoFile = (dataurl, filename) => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }
    insertImage = (url) => {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(this.state.range);
        //add to style for inline block display display:inline;display:-moz-inline-stack
        var insertImageHtml = "<div style=\"max-height:500;max-width:500;resize:both;overflow:auto;\">" +
        "<img style=\"max-height:1000;max-width:1000\" src=\""+url+"\">" + "<\/div><div>&nbsp</div>"
        document.execCommand("insertHtml",null,insertImageHtml);
        var el = document.getElementsByClassName("writingspace")[0];
        var range = document.createRange();
        var sel = document.getSelection();
        range.setStart(el.childNodes[el.childNodes.length-1],1)
        console.log(el.childNodes[el.childNodes.length-1]+" "+el.childNodes[el.childNodes.length-1].textContent)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
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

    enter = (e) => {
        this.setState({entry:false})
        this.props.getAlertStatus(false)
    }
    render(){
        return(
            <div className="note">
                {this.props.setAlertStatus?
                    <Alert severity="success">{this.props.setAlertMessage}</Alert>
                    :
                    <div/>
                }
                {this.state.entry?
                    <div className="noteBook">
                        <div class="Entry">
                            <div style={{position:"absolute",top:"20vh",left:"25.5vw",fontFamily:"Garamond",fontSize:"2.3vw",textAlign:"center"}}>
                                Welcome to futureMessenger!<br/>
                                This app lets you send messages to anyone<br/>
                                scheduled for any time in the future.
                            </div>
                            <button id="submitButton" onClick={(e)=>{this.enter(e)}}>LET'S GO WRITE</button>
                        </div>
                    </div>:
                    <div className="noteBook">
                        {this.state.loading?
                            <div style={{margin:"auto",height:"200px",width:"100px",
                                position: "absolute",
                                margin: "auto",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                left: "0"}}><Spinner size={100}/>
                            </div>:<div></div>
                        }
                        <div>
                            <Macha2 range={this.exec} image={this.insertImage}/>
                            <Macha buttonText={this.state.buttonText} submit={this.submit}/>
                            <div onMouseUp={(e) => {this.contextMenu(e)}} contentEditable="true" className="writingspace">
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default notebook;