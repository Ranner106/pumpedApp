import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import { TiHeart } from 'react-icons/ti';
import './components.css'



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
      <div className='main-song-div'>
        { isLoading && <p>Carregando...</p>}
        <div className='song-p-div'>

          <p className='track-name'>{trackName}</p>
        </div>
        <div className="audio-label-div">
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>


        
          <input
            id={ trackId }
            type="checkbox"
            onChange={ this.handleFavSellection }
            className="favorite-input"
            checked={ isChecked }
          />
        <label htmlFor={ trackId }>
        <TiHeart size={25} className="favorite-icon" />
        </label>

        </div>
          
          

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
