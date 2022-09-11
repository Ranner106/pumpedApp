import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
        <header data-testid="header-component">
          <nav className="ui basic buttons">
            <Link
              className="ui button"
              to="/search"
              data-testid="link-to-search"
            >
              {' '}
              Pesquisa
              {' '}

            </Link>
            <Link
              className="ui button"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              {' '}
              Favoritos
              {' '}

            </Link>
            <Link
              className="ui button"
              to="/profile"
              data-testid="link-to-profile"
            >
              {' '}
              Perfil
              {' '}

            </Link>
          </nav>

          <div className="ui segment">

            <p className="ui center aligned header" data-testid="header-user-name">
              { login }
            </p>
          </div>
        </header>

      );
    }
}

export default Header;
