import { Route, BrowserRouter } from 'react-router-dom';
import React, {Component} from 'react';

import Home from '../components/Home/Home';
import Trending from '../components/Trending/Trending';
import About from '../components/About/About';
import Header from '../components/Header/Header'

export default class Router extends Component {
    render() {
        return(
            <BrowserRouter>
                <Header/>
                {/* <Route path = "/home" component={Home}/>
                <Route path = "/trending" component={Trending}/>
                <Route path = "/about" component={About}/> */}
            </BrowserRouter>
        )
    }
}