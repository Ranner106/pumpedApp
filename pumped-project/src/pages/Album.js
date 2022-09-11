import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    musicState: [],
    band: {},
    carregando: true,
    favoritsList: [],

  }

  xablau = async () => {
    const { match: { params: { id } } } = this.props;
    const callGetMusic = await getMusics(id);
    console.log(callGetMusic);

    this.setState({
      musicState: [...callGetMusic],
    });
    return this.setState({
      band: callGetMusic[0],
    });
  }

  showMeFavoriteSongs = async () => {
    const result = await getFavoriteSongs();
    this.setState({ carregando: false });
    this.setState({ favoritsList: result });
    return result;
  }

  componentDidMount = () => {
    this.xablau();
    const favorites = this.showMeFavoriteSongs();
    this.setState({ favoritsList: favorites });
  }

  render() {
    const { musicState, band, favoritsList, carregando } = this.state;
    if (carregando) {
      return <p>Carregando...</p>;
    }
    return (
      <div data-testid="page-album">

        <h1>Music</h1>
        <Header />

        <div>
          <p data-testid="artist-name">{band.artistName}</p>
          <p data-testid="album-name">{band.collectionName}</p>
        </div>
        {musicState
          .slice(1)
          .map((value, index) => (
            <MusicCard
              key={ index }
              trackName={ value.trackName }
              previewUrl={ value.previewUrl }
              trackId={ value.trackId }
              music={ musicState }
              favoritsList={ favoritsList }
            />
          ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
