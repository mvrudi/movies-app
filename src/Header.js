import React from 'react';
import './styles/styles.css'

export default class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <div className="jumbotron m-4"><h1 id="title">{this.props.title}</h1>
                    <p className="lead">Your favorite movies you will find here!</p>
                    <hr className="my-4"/>
                </div>
            </div>

    )}
}