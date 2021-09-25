import React, { Component } from 'react';

const headerStyles = {

}

export default class Header extends Component {
    render(){
        return(
            <div>
                <nav>
                    <img src = "https://i.pinimg.com/originals/26/5b/11/265b1184cdfc341d454d2e9d1e94795f.jpg"/>
                    <ul>
                        <a class="active" href="./home" style={headerStyles}>Home</a>
                        <a href="./trending" style={headerStyles}>Trending</a>
                        <a href="./about" style={headerStyles}>About</a>
                    </ul>
                </nav>
            </div>
        )
    }
}