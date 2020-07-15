import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import './Form.css'
import { Spinner} from "react-loading-io";

const addMessageMutation = gql`
    mutation($name:String!,$email:String!,$mess:String!,$subject:String!,$date:String!,$imageId:String!){
        addMessage(name:$name,email:$email,mess:$mess,subject:$subject,date:$date,imageId:$imageId),{
            name
            email
            mess
            subject
            date
            imageId
        }
    }
`

class Form extends Component{
    state = {
        name: "",
        email: "",
        mess: "",
        date: "",
        subject: "",
        imageId: "",
        sent: false,
        buttonText: "Submit",
        loading: false
    }

    formSubmit = (e) => {
        this.setState({loading:true})
        console.log(this.props.setImageId)
        e.preventDefault()
        this.setState({
            buttonText: "...Sending"
        })
        // axios.post('http://localhost:4444/',data).then(res => {
        //     this.setState({sent: true},this.resetForm())
        // }).catch(
        //     (err) => {
        //         console.log(err)
        //     }
        // )
        this.props.mutate({
            variables:{
                name: this.state.name,
                email: this.state.email,
                mess:this.state.mess,
                subject: this.state.subject,
                date: this.state.date,
                imageId: this.props.setImageId
            }
        });
        console.log(this.props.mutate)
        alert("Message Sent")
        this.resetForm()
    }

    resetForm = () => {
        this.setState({
            name: "",
            mess: "",
            sent: false,
            buttonText: "Submit"
        })
    }
    render() {
        console.log(this.props.mutate)
        return (
                <div class="App">
                    {this.state.loading?
                        <div style={{margin:"auto",height:"200px",width:"100px",
                            position: "absolute",
                            margin: "auto",
                            top: "0",
                            right: "0",
                            bottom: "0",
                            left: "0"}}><Spinner size={64}/>
                        </div>:<div></div>
                    }
                    <form onSubmit={ (e) => this.formSubmit(e)}>
                        <div>
                            <input onChange={e => this.setState({ subject: e.target.value})} name="subject" class="message-subject" type="text" placeholder="Subject" value={this.state.subject}/>
                        </div>
                        <br/>
                        <br/>
                        <div>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <label class="message-date" htmlFor="message-input">Date</label>
                            <input onChange={e => this.setState({ date: e.target.value})} name="date" class="message-date" type="date" placeholder="Input Date Here" value={this.state.date}/>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <input onChange={e => this.setState({ name: e.target.value})} name="name" class="message-name" type="text" placeholder="Your Name" value={this.state.name}/>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <input onChange={(e) => this.setState({ email: e.target.value})} name="email" class="message-email" type="email" placeholder="your@email.com" required value={this.state.email} />
                        </div>
                        <br/>
                        <br/>
                        <div className="button--container">
                            <button type="submit" className="btn btn-dark">{ this.state.buttonText }</button>
                        </div>
                    </form>
                </div>
        )
    }
}
export default graphql(addMessageMutation)(Form);