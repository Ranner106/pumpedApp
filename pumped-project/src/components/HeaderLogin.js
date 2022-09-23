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
            <a
              className= 'espaco text-xl'
              href="https://github.com/Ranner106"
              target="_blank" 
              rel="external noreferrer"
            >
              {' '}
              suporte
              {' '}

            </a>
            <Link
              className= 'espaco text-xl'
              to="/search"
             
            >
              {' '}
              dowload
              {' '}

            </Link>

            <a
              className= 'espaco text-xl'
              href="https://www.linkedin.com/in/ranner-de-paula-7a902b232/"
              target="_blank" 
              rel="external noreferrer"
            >
              {' '}
              sobre nós
              {' '}

            </a>
          </nav>

          
        </header>

      );
    }
}

export default HeaderLogin;