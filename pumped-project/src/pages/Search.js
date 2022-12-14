import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import  '../index.css'
import Loading from '../components/Loading';


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
      return <Loading/>;
    }
    return (

      <div className='flex divPrincipal'>
        

        <Header />
        

        <main className='w-screen h-screen principal'>

        <form >
          {/* <div className="ui small images">
            <img src={ foto1 } alt=" som" />
            <img src={ foto2 } alt=" Logo" />
            <img src={ foto3 } alt=" Logo" />
            <img src={ foto4 } alt=" Logo" />
          </div> */}

          <div className="flex justify-center search-input">

            <input
              type="text"
              name="login"
              value={ searchNames }
              onChange={ this.handleInputSearch }
              data-testid="search-artist-input"
              placeholder="Qual artista voc?? procura?"
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

        <div className='mt-10 search-content'>
          
        {carregando && (
          
          <p>Carregando...</p>)}

          <span>

        {musicAlbums.length > 0 ? (
          <span>
          {' '}
            Resultado de ??lbuns de:
            {' '}
            {login}
          </span>)
          : (<p className='text-center'>Nenhum ??lbum foi encontrado</p>)}
          </span>
        <div className='album'>

        {
          musicAlbums.map((elemento, index) => (
            <Link
              key={ index }
              data-testid={ `link-to-album-${elemento.collectionId}` }
              to={ `/album/${elemento.collectionId}` }
              className="search-link"
            >
              <div className="albums-list">

              <div className="album-name-div">

                <p className="album-name">
                  {elemento.collectionName}
                </p>
              </div>
              <div className="artist-name-div">

                <p className="artist-name">
                  {elemento.artistName}
                </p>
              </div>
              <div className="artwork-div">

                <img src={ elemento.artworkUrl100 } alt={ elemento.collectionName } />
              </div>
              </div>
            </Link>
          ))
        }
        </div>
        </div>
        </main>
      </div>
    );
  }
}

export default Search;
