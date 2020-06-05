import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { gql } from 'apollo-boost';
import { graphql,compose } from 'react-apollo';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import axios from 'axios';

const addMessageMutation = gql`
    mutation($name:String!,$email:String!,$mess:String!,$subject:String!,$date:String!){
        addMessage(name:$name,email:$email,mess:$mess,subject:$subject,date:$date){
            name
            email
            mess
            subject
        }
    }
`
const getMessage = gql `
    {
        message{
            email
            name
            subject
            date
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
        sent: false,
        buttonText: "Submit"
    }

    formSubmit = (e) => {
        e.preventDefault()
        this.setState({
            buttonText: "...Sending"
        })
        var time = new Date().getMinutes();
        console.log(time);
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
            }
        });
        console.log(this.props)
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
        console.log(this.props)
        return (
                <div>
                    <form className="contact-form" onSubmit={ (e) => this.formSubmit(e)}>
                        <label class="message-subject" htmlFor="message-subject">Subject</label>
                        <input onChange={e => this.setState({ subject: e.target.value})} name="subject" class="message-subject" type="text" placeholder="Subject" value={this.state.subject}/>

                        <label class="message" htmlFor="message-input">Your Message</label>
                        <textarea onChange={e => this.setState({ mess: e.target.value})} name="message" class="message-input" type="text" placeholder="Please write your message here" value={this.state.mess}/>

                        <label class="message-date" htmlFor="message-input">Date</label>
                        <input onChange={e => this.setState({ date: e.target.value})} name="date" class="message-date" type="date" placeholder="Input Date Here" value={this.state.date}/>

                        <label class="message-name" htmlFor="message-name">Your Name</label>
                        <input onChange={e => this.setState({ name: e.target.value})} name="name" class="message-name" type="text" placeholder="Your Name" value={this.state.name}/>

                        <label class="message-email" htmlFor="message-email">Your Email</label>
                        <input onChange={(e) => this.setState({ email: e.target.value})} name="email" class="message-email" type="email" placeholder="your@email.com" required value={this.state.email} />

                        <div className="button--container">
                            <button type="submit" className="button button-primary">{ this.state.buttonText }</button>
                        </div>
                    </form>
                </div>
        )
    }
}
export default graphql(addMessageMutation)(Form);