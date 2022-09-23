import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (

      <div className='flex divPrincipal'>
        <Header />
        <div className='flex flex-col  w-screen h-screen principal'>
        <h1 className='entrar'>Em manutenção, Logo mais tá pronto!!</h1>

        </div>
      </div>
    );
  }
}

export default Profile;
