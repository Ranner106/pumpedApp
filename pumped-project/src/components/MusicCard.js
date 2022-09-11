import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';


class MusicCard extends React.Component {
  state = {
    isLoading: false,
    isChecked: false,
  }

  componentDidMount = async () => {
    const { favoritsList, trackId } = this.props;
    const musicList = await favoritsList;
    const result = musicList.some((music) => music.trackId === trackId);
    if (result) {
      this.setState({ isChecked: true });
    }
  }

  handleFavSellection = async () => {
    const { music } = this.props;
    this.setState({ isLoading: true });
    await addSong(music);
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <div>
        { isLoading && <p>Carregando...</p>}
        <div className="ui segment">

          <p className="ui left aligned header">{trackName}</p>
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkboxInput">
          Favorita
          <input
            id="checkboxInput"
            name="checkboxInput"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleFavSellection }
            checked={ isChecked }
          />

        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.objectOf(PropTypes.string).isRequired,
  favoritsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
