import React, { Component } from 'react';
import "./notebook.css";
import Macha from './menu';
import Macha2 from './notebookMenu';
import html2canvas from 'html2canvas';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'antd/lib/form/Form';
import notebookMenu from './notebookMenu';
var imageId = "";
class notebook extends Component{
    state = {
        range: "",
        id: "",
        imageUrl: "",
        canvas: "",
        imageId: "5f0b5cec6c996b66cb50e76f"
    }
    contextMenu = (e) => {
        var range = document.getSelection().getRangeAt(0);
        this.setState({range:range})
    }
    exec = (id) => {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(this.state.range);
        document.execCommand(id,null,null);
    }
    submit = (e) => {
        html2canvas(document.getElementsByClassName("writingspace")[0],
        { logging: true, letterRendering: 1, allowTaint: false ,useCORS: true })
        .then(canvas => canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'filename.png');
            // Post via axios or other transport method
            axios.post('http://localhost:4444/upload', formData).then(res => {this.setState({imageId:res.data.imageId})})
            .catch((err) => {
                    console.log("Error: ", err)
                }
            )
        }))
    }
    shift = (e) => {
        console.log(this.state.imageId)
        this.props.getImageId(this.state.imageId)
        document.getElementsByClassName('App')[0].scrollIntoView({behavior: 'smooth'});
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
        var insertImageHtml = "<div style=\"max-height:500;max-width:500;resize:both;overflow:auto;display:inline-block;display:-moz-inline-stack\">" +
        "<img style=\"max-height:1000;max-width:1000\" src=\""+url+"\">" + "<\/div><div style=\"display:inline-block;display:-moz-inline-stack\">&nbsp</div>"
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
    render(){
        return(
            <div className="noteBook">
                <Macha2 range={this.exec} image={this.insertImage}/>
                <Macha/>
                <div onMouseUp={(e) => {this.contextMenu(e)}} contentEditable="true" className="writingspace">
                </div>
                <Button onClick={(e) => {this.submit(e)}}>Submit</Button>
                <Button onClick={(e) => {this.shift(e)}}>Shift</Button>
            </div>
        )
    }
}

export default notebook;