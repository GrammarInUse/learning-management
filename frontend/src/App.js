import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavMenu from './components/NavMenu';
import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';
import Client from './components/Clients';
import CompletedThings from './components/CompletedThings';
import Topics from './components/Topics';
import Details from './components/Details';
import Signup from './components/Signup';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: null,
      token: null,
      login: true,

      fullName: null,
      dOB: null,
      sex: null,
      job: null,
      address: null,
      email: null,
      phone: null,
      avatar: null,

      topicId: null
    }
  }

  storeCollector = async() => {
    try{
      let store = JSON.parse(localStorage.getItem("login"));

      if(store && store.login){
        const url = "http://localhost:8080/users/" + store.currentUser.id;
        await fetch(url, {
          headers: {
            "Authorization": "Bearer " + store.token,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: "GET"
        })
        .then((response) => {
          response.json()
          .then((result) => {
            this.setState({
              fullName: result.fullName,
              dOB: result.dOB,
              sex: result.sex,
              job: result.job,
              address: result.address,
              email: result.email,
              phone: result.phone,
              avatar: result.avatar
            });
          })
          .catch((err) => {
            console.log("FAILED CONVERT RESPONSE GET A USER TO JSON: " + err);
          });
        })
        .catch((err) => {
          console.log( "FAILED FETCH GET A USER: " + err);
        });

        this.setState({
          currentUser: store.currentUser.id,
          token: store.token,
          login: true
        })
      }else{
        console.log("SAI DIEU KIEN");
        this.setState({
          login: false
        })
      }

    }catch(err){
      console.log(err);
    }
  }

  componentDidMount(){
    this.storeCollector();

    setTimeout(() => {
      localStorage.removeItem("login");
      window.location.reload();
    }, 60*60*1000)
  }

  render(){
    console.log(this.state.avatar);
    return (
      <div className="App">
        <NavMenu login={this.state.login} fullName={this.state.fullName} dOB={this.state.dOB} sex={this.state.sex} job={this.state.job} address={this.state.address}/>
        
        <Router>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Header />
            </Route>
            <Route path="/profile">
              <Client id={this.state.currentUser} avatar={this.state.avatar} phone={this.state.phone} email={this.state.email} fullName={this.state.fullName} login={this.state.login} />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/completedthing" >
              <CompletedThings />
            </Route>
            <Route path="/detail">
              <Details />
            </Route>
            <Route path="/">
              <Header />
            </Route>
          </Switch>
        </Router>

        <Footer />
      </div>
    );
  }
}

export default App;
