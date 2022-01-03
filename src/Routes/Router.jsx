import { Route, BrowserRouter } from 'react-router-dom';
import React, {Component} from 'react';

import Trending from '../components/Trending/Trending';
import About from '../components/About/About';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HeroSection from '../components/HeroSection/HeroSection';


export default class Router extends Component {
    render() {
        return(
            <BrowserRouter>
                <Header/>
                <HeroSection/>
                <Footer/>
            </BrowserRouter>
        )
    }
}