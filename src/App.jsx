import React, {Component} from "react"
import {HashRouter as Reactr, Redirect, Route, Switch} from "react-router-dom";

import Home from './components/home'
import Shoppingcar from './components/shoppingcar'
import List from "./components/list/list";
// import Olist from "./components/list/olist";
import Content from "./components/content/content";
import Login from "./components/login";
import Register from "./components/register";
import Myinfo from './components/myinfo'
import Resulto from "./components/Resulto";
import Changeway from "./components/changepassword/changeway";
import Phoneyz from "./components/changepassword/phoneyz";


class App extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <Reactr>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Redirect exact from="/" to="/home/home"/>
                    <Route path='/shoppingcar' component={Shoppingcar}/>
                    {/*列表页*/}
                    <Route exact path="/list/:id" component={List}/>
                    {/*<Route exact path="/list/:id" component={Olist}/>*/}
                    <Route exact path='/content/:id' component={Content}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/myinfo' component={Myinfo}/>
                    <Route exact path='/resulto' component={Resulto}/>
                    <Route exact path='/changeway' component={Changeway}/>
                    <Route exact path='/phoneyz' component={Phoneyz}/>

                </Switch>
            </Reactr>
        );
    }
}

export default App;