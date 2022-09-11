import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
// import foto1 from '../images/foto1.jpg';
// import foto2 from '../images/foto2.jpg';
// import foto3 from '../images/foto3.jpg';
// import foto4 from '../images/foto4.jpg';

class Search extends React.Component {
  state = {
    login: '',
    isSearchButtonDisabled: true,
    carregando: false,
    musicAlbums: [],
    searchNames: '',
  }

  searchButtonClick = async () => {
    const { searchNames } = this.state;
    this.setState({
      carregando: true,
    });
    const listaAlbuns = await searchAlbumsAPI(searchNames);
    this.setState({
      carregando: false,
      musicAlbums: [...listaAlbuns],
      login: '',
    });
    if (searchNames.length > 0) {
      return this.setState({
        login: searchNames,
        searchNames: '',
      });
    }
  }

  handleInputSearch = (event) => {
    const { target: { value } } = event;

    this.setState({ searchNames: value });
    if (value.length > 1) {
      this.setState({
        isSearchButtonDisabled: false,
      });
    } else {
      this.setState({
        isSearchButtonDisabled: true,
      });
    }
  }

  render() {
    const {
      login,
      isSearchButtonDisabled,
      carregando,
      searchNames,
      musicAlbums,
    } = this.state;
    if (carregando) {
      return <p>Carregando...</p>;
    }
    return (

      <div className="ui center aligned basic segment" data-testid="page-search">
        <Header />

        <form>
          {/* <div className="ui small images">
            <img src={ foto1 } alt=" som" />
            <img src={ foto2 } alt=" Logo" />
            <img src={ foto3 } alt=" Logo" />
            <img src={ foto4 } alt=" Logo" />
          </div> */}

          <div className="ui massive icon input">

            <input
              type="text"
              name="login"
              value={ searchNames }
              onChange={ this.handleInputSearch }
              data-testid="search-artist-input"
              placeholder="Qual artista você procura?"
            />

            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
              onClick={ this.searchButtonClick }
            >
              Pesquisar
            </button>
          </div>

        </form>
        {carregando && (
          <p>Carregando...</p>)}
        {musicAlbums.length > 0 ? (
          <p>
            {' '}
            Resultado de álbuns de:
            {' '}
            {login}
          </p>)
          : (<p>Nenhum álbum foi encontrado</p>)}
        {
          musicAlbums.map((elemento, index) => (
            <Link
              key={ index }
              data-testid={ `link-to-album-${elemento.collectionId}` }
              to={ `/album/${elemento.collectionId}` }
            >
              <div className="ui segment">

                <p className="ui left aligned header">
                  {elemento.collectionName}
                </p>
              </div>
              <div className="ui segment">

                <p className="ui left aligned header">
                  {elemento.artistName}
                </p>
              </div>
              <div className="ui small images">

                <img src={ elemento.artworkUrl100 } alt={ elemento.collectionName } />
              </div>
            </Link>
          ))
        }
      </div>
    );
  }
}

export default Search;
