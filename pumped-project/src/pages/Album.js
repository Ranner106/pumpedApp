import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../index.css'
import './Album.css'
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    musicState: [],
    band: {},
    carregando: true,
    favoritsList: [],
    songData:[],

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

  getReleaseDate = async () => {
    const { songData } = this.state;
    if (songData.length) {
      const { releaseDate } = songData[0];
      return releaseDate.split('-')[0];
    }
  }

  getData = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({ songData: result });
  }

  componentDidMount = () => {
    this.xablau();
    this.showMeFavoriteSongs();
    
  }

  render() {
    const { musicState, band, favoritsList, carregando } = this.state;
    if (carregando) {
      return <Loading/>;
    }
    return (
      <div className='flex divPrincipal'>

        
        <Header />

        <div className='flex flex-col  w-screen h-screen principal'>
          
          <div className=' flex topo '>
          <div className="album-artwork-div">
              <img className='w-40' src={ band.artworkUrl100 } alt={ band.collectionName } />
            </div>
            <div className='flex flex-col justify-center gap-4 '>
          <p className='album-name text-2xl'>{band.collectionName}</p>
          <p className='artist-name text-xl'>{band.artistName}</p>

            </div>

          </div>

          <div className='flex flex-col track'>

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
            </div>
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
