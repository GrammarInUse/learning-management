import React, { PureComponent } from 'react'
import ComletedThing from './ComletedThing';

export default class CompletedThings extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            login: false,


            title: "",
            subtitle: [
                {
                    id: 1,
                    name: "JAVA"
                }, 
                {
                    id: 2,
                    name: "PHP"
                }
            ],
            learningName: "",
            topicId: null
        }
    }

    submitHandler = async (e) => {
        const url = "http://localhost:8080/topics/learning";
        const data = {
            learningName: this.state.learningName,
            topicId: this.state.topicId
        }
        const FetchOpts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, FetchOpts);
        const result = await response.json();
        
        alert(result.userMessage);

        window.location.reload();
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addClickHandler = (e) => {
        e.preventDefault();

        document.getElementById("addBlock").style.display = "block";
    }

    async collector(){
        const auth = JSON.parse(localStorage.getItem("login"));
        if(auth && auth.login){
            this.setState({
                login: true
            });
        }


        const topicId = localStorage.getItem("topicId");
        this.setState({
            topicId
        })
        const url = "http://localhost:8080/completedthing/" + topicId;
        const FetchOpts = {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const response = await fetch(url, FetchOpts);
        const result = await response.json();

        this.setState({
            title: result.data.topic,
            subtitle: result.data.subtitle
        });
    }

    componentDidMount(){
        this.collector()
        .then(() => {
            console.log("DONE");
        })
        .catch(err => {
            console.log("ERROR: " + err);
        });


    }
    //Nghiệp vụ

    render() {
        if(this.state.subtitle && this.state.login){
            return (
                <div>
                    <div className="bg jumbotron">
                        <h1 style={{color: "red"}}>{this.state.title}</h1>
                    </div>

                    <a onClick={this.addClickHandler} className="btn btn-primary">Add</a>
    
                    <div style={{margin: "0 auto"}} className="container row text-center">
                        {
                            this.state.subtitle.map((element) => 
                                element.id?
                                <ComletedThing key={element.id} id={element.id} name={element.name}/>:
                                <div></div>

                            )
                        }
                    </div>  

                    <div style={{display: "none", position: "fixed", }} id="addBlock" className="wrapper fadeInDown">
                        <div id="formContent">
                            <div className="fadeIn first">
                                <img src="assets/img/header-learning.jpeg" id="icon" alt="User Icon" />
                            </div>
                            <form onSubmit={this.submitHandler}>
                                <input onChange={this.changeHandler} type="text" id="learningName" className="fadeIn second" name="learningName" placeholder="Learning Name" />
                                <input type="submit" className="fadeIn fourth" value="ADD" />
                            </form>
                            <div id="formFooter">
                                <a className="underlineHover" onClick={()=>document.getElementById("addBlock").style.display="none"} href="#">Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else if(this.state.login){
            return(
                <div>
                    <img src="assets/empty.jpg" />
                </div>
            )
        }else{
            return(
                <div style={{textAlign: "center", paddingTop: "100px", marginBottom: "100px"}}>
                    <img src="assets/auth-login.jpg" />
                </div>
            )
        }
        
    }
}
