import React, { useState } from 'react'
// import PropTypes from 'prop-types'


export default function Navbar(props) {
    const [text, setText] = useState('');
    const readTxt = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function (event) {
            setText(event.target.result);
        };
        reader.readAsText(file);
    }

    return (
        <nav className={`navbar
        navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <a className="navbar-brand" href="/">{props.title}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/"><span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            {props.aboutText}</a>
                    </li>
                </ul>
                <input type="file" className="btn btn-secondary my-1" accept="text/plain" onChange={readTxt} />

                <div className="custom-control custom-switch mx-4">
                    <input type="checkbox" className="custom-control-input" onClick={props.toggleMode} id="customSwitch1"/>
                        <label className="custom-control-label" htmlFor="customSwitch1"></label>
                </div>
            </div>
        </nav>
    )
}

// Navbar.propTypes = {
//     title: PropTypes.string.isRequired,
//     aboutText: PropTypes.string
// }

// Navbar.defaultProps = {
//     title: 'set title here',
//     aboutText: 'About text here'
// }

