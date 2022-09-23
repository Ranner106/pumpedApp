import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../images/pumped.png';
import lupa from '../images/lupa.ico';
import favoritos from '../images/favorits-icon.png';
import perfil from '../images/profile-group-icon.png';



class Header extends React.Component {
  state = {
    carregando: false,
    login: '',
  }

  
  async componentDidMount() {
    this.setState({ carregando: true });
    const { name } = await getUser();
    this.setState({
      carregando: false,
      login: name,

    });
  }

  render() {
    const { carregando, login } = this.state;
    if (carregando) {
      return <p>Carregando...</p>;
    }
    return (
      <header className='flex header' >


        <img className='login' src={logo} alt='Imagem Login' />

        <div className='name'>

          <p className='letraH text-xl'>
            {login}
          </p>
        </div>

        <nav className='navHeader flex'>
          <div className='flex justify-start gap-2 p-2'>

            <img className='figHeader' src={lupa} alt='lupa' />


            <Link
              className="ui button"
              to="/search"
              data-testid="link-to-search"
            >

              {' '}
              <p className='letraH text-lg'>
                
              Pesquisa
              </p>
              {' '}

            </Link>
          </div>

          <div className='flex justify-start gap-2 p-2'>
         
          <img className='figHeader' src={favoritos} alt='Coração' />

          <Link
            className="ui button"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            {' '}
            <p className='letraH text-lg'>

            Favoritos
            </p>
            {' '}

          </Link>
          </div>

          <div className='flex justify-start gap-2 p-2'>

          <img className='figHeader' src={perfil} alt='bonequinhos'/>
          <Link
            className="ui button"
            to="/profile"
            data-testid="link-to-profile"
          >
            {' '}
            <p className='letraH text-lg'>

            Perfil
            </p>
            {' '}

          </Link>


          </div>

          {/* <img className='mt-14 w-60' src={linha} alt='bonequinhos'/> */}

            <p className='teste mt-14'>

            </p>
       
        


          <Link
          className='instalar ml-10'
          to="/search"
          >
            <p className='letraH text-lg'>

          Instalar Aplicativo
            </p>
          </Link>
         
        </nav>

        


      </header>

    );
  }
}

export default Header;
