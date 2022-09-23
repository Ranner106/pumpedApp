import React from 'react';
import pumped from '../images/pumped.png'


class Loading extends React.Component {
  render() {
    return (
      <div className="main-loading-div">
        <div className="loading-div">
          <img src={pumped} alt='logo Pumped' />
        </div>
      </div>
    );
  }
}

export default Loading;