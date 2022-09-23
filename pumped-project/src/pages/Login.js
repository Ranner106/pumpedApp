import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import capa from '../images/fotoDesktop.jpg'
import '../index.css';
import HeaderLogin from '../components/HeaderLogin';

class Login extends React.Component {
  state = {
    login: '',
    isLoginButtonDisabled: true,
    carregando: false,
  }

  onSaveButtonClick = async () => {
    const { login } = this.state;
    const { history } = this.props;
    this.setState({
      carregando: true,
    });
    await createUser({ name: login });
    this.setState({ carregando: false });
    history.push('/search');
  }

  onInputChange = (event) => {
    const { target: { value } } = event;

    this.setState({ login: value });
    if (value.length > 2) {
      this.setState({
        isLoginButtonDisabled: false,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
      });
    }
  }

  render() {
    const { login, isLoginButtonDisabled, carregando } = this.state;
    if (carregando) {
      return <p>Carregando...</p>;
    }
    return (

      <div className= 'main' >
        <HeaderLogin  className='cabeçalho'/>
        <form className="form flex justify-between">
          <img className=" capa" src={ capa } alt=" foto de capa " />

          <div className='flex flex-col forms '>
            <h1 className='curta p-6 top-72'>
            Curta músicas sem anúncios, modo offline e muito mais. Cancele quando quiser.
            </h1>
            <label htmlFor="login" className='inputLabel'>
              <input
                type="text"
                name="login"
                value={ login }
                onChange={ this.onInputChange }
                placeholder="Digite o seu nome"
                className='inputLogin '
              />
              <i className="search icon" />
              </label>

            <button
              type="submit"
              disabled={ isLoginButtonDisabled }
              onClick={ this.onSaveButtonClick }
              className= 'bg-blue-700 botaoLogin p-5 mt-4 rounded-lg hover:bg-blue-400'
              >
              <p className='entrar text-xl'>
              Entrar
              </p>
            </button>

          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default Login;
