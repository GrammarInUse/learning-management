import React, { Component } from 'react'

export default class Details extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: false,

            title: "JAVASCRIPT",
            details: [],

            learningId: null,
            content: "", 
            semantic: "",
            syntax: "",
            example: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitHandler = async (e) => {
        const url = "http://localhost:8080/topics/learningDetail";
        const data = {
            learningId: this.state.learningId,
            content: this.state.content,
            semantic: "⭕Khái niệm: " + this.state.semantic ,
            syntax: "⭕Cú pháp: " + this.state.syntax ,
            example: "⭕Ví dụ: " + this.state.example 
        };
        const fetchOpts = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(url, fetchOpts);
        const result = await response.json();

        alert(result.userMessage);

        
        window.location.reload();
    }

    addClickHandler = (e) => {
        e.preventDefault();

        document.getElementById("addBlock").style.display = "block";
    }

    componentDidMount() {
        this.collector()
        .then(console.log("DONE"))
        .catch((err) => {
            console.error(err);
        });

        this.collectorLearning()
        .then(console.log("DONE"))
        .catch((err) => {
            console.error(err);
        });;
    }

    collector = async () => {
        const auth = JSON.parse(localStorage.getItem("login"));
        if(auth && auth.login){
            this.setState({
                login: true
            });
        }

        const detail = localStorage.getItem("detail");
        var url = "http://localhost:8080/completedthing/detail/" + detail;
        const fetchOpts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchOpts);
        const result = await response.json();

        this.setState({
            details: result.data
        });
    }

    collectorLearning = async () => {
        const detail = localStorage.getItem("detail");
        this.setState({
            learningId: detail
        });
        var url = "http://localhost:8080/completedthing/learning/" + detail;
        const fetchOpts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchOpts);
        const result = await response.json();

        this.setState({
            title: result.data.learningName
        });
    }

    

    render() {
        return (
            this.state.login?
            <div>
                <div className="bg jumbotron">
                    <h1 style={{color: "red"}}>{this.state.title}</h1>
                </div>
                <a className="btn btn-primary" onClick={this.addClickHandler}>Add</a>
                <div className="row container-fluid">
                {
                    this.state.details.length>0?
                    this.state.details.map((element) =>
                        <div key={element.learningId + element.STT} className="col-12" style={{marginBottom: "20px"}}>
                            <h1 style={{textAlign: "center", border: "1px solid black", backgroundColor: "#fafafa"}}>{element.name}</h1>
                            <div style={{border: "1px solid black"}}>
                                <p style={{paddingLeft: "20px", paddingTop: "20px"}}>{element.summarySyntax}</p> <br />
                                <p style={{paddingLeft: "20px"}}>{element.summarySemantic}</p> <br />
                                <p style={{paddingLeft: "20px"}}>{element.example}</p> <br />
                            </div>
                            
                        </div>
                    )
                    :<div style={{margin: "0 auto", marginBottom: "60px"}}>
                        <img src="assets/empty.jpg" />
                    </div>
                }
                </div>
                <div style={{display: "none", position: "fixed", top: "10vh"}} id="addBlock" className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src="assets/img/header-learning.jpeg" id="icon" alt="User Icon" />
                        </div>
                        <form onSubmit={this.submitHandler} style={{padding: "10px"}}>
                            <input style={{width: "100%"}} onChange={this.changeHandler} type="text" id="content" className="fadeIn second" name="content" placeholder="Content" />
                            <textarea style={{width: "100%"}} onChange={this.changeHandler} type="text" id="syntax" className="fadeIn second" name="syntax" placeholder="Tyntax" /><br />
                            <textarea style={{width: "100%"}} onChange={this.changeHandler} type="text" id="semantic" className="fadeIn second" name="semantic" placeholder="Semantic" /><br />
                            <textarea style={{width: "100%"}} onChange={this.changeHandler} type="text" id="example" className="fadeIn second" name="example" placeholder="Example" /><br />
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
