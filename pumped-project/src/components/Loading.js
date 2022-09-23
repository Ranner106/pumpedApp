import React from 'react';
import pumped from '../images/pumped.png'
import './components.css'


class Loading extends React.Component {
  render() {
    return (
      <div className="divPrincipal background">
        <div className="search-icon-div">
          <img src={pumped} alt='logo Pumped' size={45} className="search-icon" />
        </div>
      </div>
    );
  }
}

export default Loading;