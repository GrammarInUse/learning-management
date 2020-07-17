import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class Topics extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: false,


            topics: [],
            topicName: "",
            topicType: 1,
            topicTypes: null
        }
    }

    async collector(){
        const url = "http://localhost:8080/topics";
        const FetchOpts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(url, FetchOpts);
        const result = await response.json();

        this.setState({
            topics: result.data.topicsList
        });
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clickHandler = (e) => {
        localStorage.setItem("topicId", e.target.id);
    }

    clickAddHandler = () => {
        document.getElementById("addBlock").style.display = "block";
    }

    submitHandler = async () => {
        const url = "http://localhost:8080/topics";
        const data = {
            topicName: this.state.topicName,
            topicType: this.state.topicType
        }
        const fetchOpts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(url, fetchOpts);
        const result = await response.json();

        alert(result.userMessage);
        
        window.location.reload();
    }

    collectorTopicTypes = async () => {
        const auth = JSON.parse(localStorage.getItem("login"));
        if(auth && auth.login){
            this.setState({
                login: true
            });
        }
        const url = "http://localhost:8080/topics/types";
        const FetchOpts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(url, FetchOpts);
        const result = await response.json();
    }

    componentDidMount(){
        this.collector()
        .catch((err) => {
            console.log("Error at TOPICS COMPONENT REACT!!!");
            console.error(err);
        });

        this.collectorTopicTypes()
        .catch((err) => {
            console.log("Error at TOPICS COMPONENT REACT!!!");
            console.error(err);
        });
    }


    render() {
        return (
            this.state.login?
            <div>
                <div className="bg jumbotron">
                    <h1 style={{color: "red"}}>TOPICS</h1>
                </div>
                <a href="#" onClick={this.clickAddHandler} className="btn btn-primary">Add</a>
                <div className="row">
                    {
                    this.state.topics.length>=1?
                    this.state.topics.map((element) => {
                        
                        return (
                            element.id?
                            <div className="col-lg-4 col-md-6 mb-4" key={element.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="card-title">{element.name} - <p style={{display: "inline-block", fontSize: "18px"}}>Started at: {new Date(element.createdAt).toLocaleDateString()}</p></h4>
                                    </div>
                                    <div className="card-footer">
                                        <a href="/completedthing" id={element.id} onClick={this.clickHandler} className="btn btn-primary">Learn more</a>
                                    </div>
                                </div>
                            </div>:
                            <div></div>
                        )
                    }):
                    <div>
                        <h1>YOU HAVEN'T LEARNT ANYTHING</h1>
                    </div>
                    }
                </div>
                <div style={{display: "none", position: "fixed", }} id="addBlock" className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src="assets/img/header-learning.jpeg" id="icon" alt="User Icon" />
                        </div>
                        <form onSubmit={this.submitHandler}>
                            <input onChange={this.changeHandler} type="text" id="topicName" className="fadeIn second" name="topicName" placeholder="Topic Name" />
                            <br />Type: 
                            <select name="topicType" onChange={this.changeHandler}>
                                {
                                    this.state.topicTypes?
                                    this.state.topicTypes.map(element => 
                                        <option key={element.id} value={element.id}>{element.name}</option>
                                    ):
                                    <option>1</option>
                                }
                                
                            </select>
                            <input type="submit" className="fadeIn fourth" value="ADD" />
                        </form>
                        <div id="formFooter">
                            <a className="underlineHover" onClick={()=>document.getElementById("addBlock").style.display="none"} href="#">Cancel</a>
                        </div>
                    </div>
                </div>
            </div>:
            <div style={{textAlign: "center", paddingTop: "100px", marginBottom: "100px"}}>
                <img src="assets/auth-login.jpg" />
            </div>
        )
    }
}
