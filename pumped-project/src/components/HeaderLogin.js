import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/pumped.png'
import './components.css'

class HeaderLogin extends React.Component {
    
    render() {
      
      return (
        <header className='color flex justify-around '>
        
            <img className='login w-1/6' src={ logo } alt='Imagem Login' />
          <nav className= ' nav mt-20'>
            <Link
              className='espaco text-xl'
              to="/search"
              
            >
              {' '}
              Premium
              {' '}

            </Link>
            <Link
              className= 'espaco text-xl'
              to="/search"
              
            >
              {' '}
              suporte
              {' '}

            </Link>
            <Link
              className= 'espaco text-xl'
              to="/search"
             
            >
              {' '}
              dowload
              {' '}

            </Link>
          </nav>

          
        </header>

      );
    }
}

export default HeaderLogin;