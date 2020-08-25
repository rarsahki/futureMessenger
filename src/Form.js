import React, { Component, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { graphql } from 'react-apollo';
import './Form.css'
import { Spinner} from "react-loading-io";
import { Redirect } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

const addMessageMutation = gql`
    mutation($name:String!,$email:String!,$mess:String!,$subject:String!,$date:String!,$time:String!,$imageId:String!){
        addMessage(name:$name,email:$email,mess:$mess,subject:$subject,date:$date,time:$time,imageId:$imageId),{
            name
            email
        }
    }
`
class Form extends Component{
    state = {
        name: "",
        email: "",
        mess: "",
        date: "",
        time: "",
        subject: "",
        imageId: "",
        sent: false,
        buttonText: "Submit",
        loading: false,
        entry: true,
        submitted:false,
        error: false,
        errorMessage: ""
    }
    formSubmit = (e) => {
        e.preventDefault()
        this.setState({error:false,sent:false})
        if(this.state.subject!==""){
            if(this.state.date!==""||this.state.time!==""){
                var date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
                var date1 = new Date(date).toISOString().slice(0,10);
                var currDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
                var currDate1 = new Date(currDate)
                var hours = currDate1.getHours()
                var minutes = currDate1.getMinutes()
                if(this.state.date === date1.toString()){
                    if(parseInt(this.state.time.substring(0,2))===hours&&parseInt(this.state.time.substring(3,5))>minutes+1){
                        if(this.state.name!==""){
                            if(this.state.email!==""){      
                                this.setState({loading:true})
                                e.preventDefault()
                                this.setState({
                                    buttonText: "...Sending"
                                })
                                this.props.mutate({
                                    variables:{
                                        name: this.state.name,
                                        email: this.state.email,
                                        mess:this.state.mess,
                                        subject: this.state.subject,
                                        date: this.state.date,
                                        time: this.state.time,
                                        imageId: this.props.setImageId
                                    }
                                }).then(data => {console.log(data)
                                                    this.resetForm()
                                                    document.getElementsByClassName('note')[0].scrollIntoView({behavior: 'smooth'});
                                                    this.props.getAlertStatus(true)
                                                    this.props.getAlertMessage("Success!")
                                                }).catch((error) => {
                                                    console.log(error)
                                                    this.props.getAlertStatus(true)
                                                    this.props.getAlertMessage("Network error! Please try again. Sorry for inconvenience")
                                                    document.getElementsByClassName('note')[0].scrollIntoView({behavior: 'smooth'});
                                                });
                            }else{
                                this.setState({error:true})
                                this.setState({errorMessage:"Please enter an email"})
                            }
                        }else{
                            this.setState({error:true})
                            this.setState({errorMessage:"Please enter a name"})
                        }
                    }else if(parseInt(this.state.time.substring(0,2))>hours){
                        if(this.state.name!==""){
                            if(this.state.email!==""){      
                                this.setState({loading:true})
                                e.preventDefault()
                                this.setState({
                                    buttonText: "...Sending"
                                })
                                this.props.mutate({
                                    variables:{
                                        name: this.state.name,
                                        email: this.state.email,
                                        mess:this.state.mess,
                                        subject: this.state.subject,
                                        date: this.state.date,
                                        time: this.state.time,
                                        imageId: this.props.setImageId
                                    }
                                }).then(data => {console.log(data)
                                                    this.resetForm()
                                                    document.getElementsByClassName('note')[0].scrollIntoView({behavior: 'smooth'});
                                                    this.props.getAlertStatus(true)
                                                    this.props.getAlertMessage("Success!")
                                                }).catch((error) => {
                                                    console.log(error)
                                                    this.props.getAlertStatus(true)
                                                    this.props.getAlertMessage("Network error! Please try again. Sorry for inconvenience")
                                                    document.getElementsByClassName('note')[0].scrollIntoView({behavior: 'smooth'});
                                                });
                            }else{
                                this.setState({error:true})
                                this.setState({errorMessage:"Please enter an email"})
                            }
                        }else{
                            this.setState({error:true})
                            this.setState({errorMessage:"Please enter a name"})
                        }
                    }else{
                        this.setState({error:true})
                        this.setState({errorMessage:"Please enter a valid date and time"})
                    }
                }else if(parseInt(this.state.date.substring(0,4))===parseInt(date1.toString().substring(0,4)) && parseInt(this.state.date.substring(5,7))===parseInt(date1.toString().substring(5,7)) && parseInt(this.state.date.substring(8,10))>parseInt(date1.toString().substring(8,10))){
                    if(this.state.name!==""){
                        if(this.state.email!==""){      
                            this.setState({loading:true})
                            e.preventDefault()
                            this.setState({
                                buttonText: "...Sending"
                            })
                            this.props.mutate({
                                variables:{
                                    name: this.state.name,
                                    email: this.state.email,
                                    mess:this.state.mess,
                                    subject: this.state.subject,
                                    date: this.state.date,
                                    time: this.state.time,
                                    imageId: this.props.setImageId
                                }
                            }).then(data => {console.log(data)
                                            this.resetForm()
                                            document.getElementsByClassName('note')[0].scrollIntoView({behavior: 'smooth'});
                                            this.props.getAlertStatus(true)
                                            this.props.getAlertMessage("Success!")
                                        }).catch((error) => {
                                            console.log(error)
                                            this.props.getAlertStatus(true)
                                            this.props.getAlertMessage("Network error! Please try again. Sorry for inconvenience")
                                            document.getElementsByClassName('note')[0].scrollIntoView({behavior: 'smooth'});
                                        });
                        }else{
                            this.setState({error:true})
                            this.setState({errorMessage:"Please enter an email"})
                        }
                    }else{
                        this.setState({error:true})
                        this.setState({errorMessage:"Please enter a name"})
                    }
                }else if(parseInt(this.state.date.substring(0,4))>parseInt(date1.toString().substring(0,4))){
                    if(this.state.name!==""){
                        if(this.state.email!==""){      
                            this.setState({loading:true})
                            e.preventDefault()
                            this.setState({
                                buttonText: "...Sending"
                            })
                            this.props.mutate({
                                variables:{
                                    name: this.state.name,
                                    email: this.state.email,
                                    mess:this.state.mess,
                                    subject: this.state.subject,
                                    date: this.state.date,
                                    time: this.state.time,
                                    imageId: this.props.setImageId
                                }
                            }).then(data => {console.log(data)
                                                this.resetForm()
                                                document.getElementsByClassName('note')[0].scrollIntoView({behavior: 'smooth'});
                                                this.props.getAlertStatus(true)
                                                this.props.getAlertMessage("Success!")
                                            }).catch((error) => {
                                                console.log(error)
                                                this.props.getAlertStatus(true)
                                                this.props.getAlertMessage("Network error! Please try again. Sorry for inconvenience")
                                                document.getElementsByClassName('note')[0].scrollIntoView({behavior: 'smooth'});
                                            });
                        }else{
                            this.setState({error:true})
                            this.setState({errorMessage:"Please enter an email"})
                        }
                    }else{
                        this.setState({error:true})
                        this.setState({errorMessage:"Please enter a name"})
                    }
                }else{
                    this.setState({error:true})
                    this.setState({errorMessage:"Please enter a valid date and time"})
                }
            }else{
                this.setState({error:true})
                this.setState({errorMessage:"Please enter a valid date and time"})
            }
        }else{
            this.setState({error:true})
            this.setState({errorMessage:"Please enter a Subject"})
        }
    }

    resetForm = () => {
        this.setState({
            name: "",
            mess: "",
            loading:false,
            buttonText: "Submit",
        })
    }

    render() {
        return (
            <div>
                {this.state.error?
                    <Alert severity="error">{this.state.errorMessage}</Alert>
                    :
                    <div></div>
                }
                <div className="App">
                    <div class="Envelope">
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
                        <form onSubmit={ (e) => this.formSubmit(e)}>
                            <div id="subject">
                                <input onChange={e => this.setState({ subject: e.target.value})} name="subject" class="message-subject" type="text" placeholder="Subject" value={this.state.subject}/>
                            </div>
                            <div id="date">
                                <input onChange={e => this.setState({ date: e.target.value})} name="date" class="message-date" type="date" placeholder="Input Date Here" value={this.state.date}/>
                                <input onChange={e => this.setState({ time: e.target.value})} name="time" class="message-time" type="time" placeholder="Input Time Here" value={this.state.time}/>
                            </div>
                            <br/>
                            <br/>
                            <div id="name">
                                <input onChange={e => this.setState({ name: e.target.value})} name="name" class="message-name" type="text" placeholder="Your Name" value={this.state.name}/>
                            </div>
                            <br/>
                            <div id="email">
                                <input onChange={(e) => this.setState({ email: e.target.value})} name="email" class="message-email" type="email" placeholder="your@email.com" required value={this.state.email} />
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div className="button--container">
                                <button type="submit" className="btn btn-dark">{ this.state.buttonText }</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default graphql(addMessageMutation)(Form);