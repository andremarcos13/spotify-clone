import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.state = {
      albumId: id,
      artist: '',
      album: '',
      albumImage: '',
      arrayOfMusics: [],
    };
  }

  async componentDidMount() {
    const { albumId } = this.state;
    const results = await getMusics(albumId);
    console.log(results);
    const resultsFav = await getFavoriteSongs();
    results.forEach((elemt) => {
      const jcResult = resultsFav
        .find((favorites) => favorites.trackId === elemt.trackId);
      elemt.isFav = jcResult !== undefined;
    });
    this.setState({
      artist: results[0].artistName,
      album: results[0].collectionName,
      albumImage: results[0].artworkUrl60,
      arrayOfMusics: results,
    });
  }

  render() {
    const { artist, album, albumImage, arrayOfMusics } = this.state;
    return (
      <div
        data-testid="page-album"
        className="componente-album"
      >
        <Header />
        Componente Album
        <h2 data-testid="artist-name">
          { artist }
        </h2>
        <h2 data-testid="album-name">
          { album }
        </h2>
        <img src={ albumImage } alt={ album } />
        { arrayOfMusics.filter((element) => element.trackId)
          .map((parameter) => (
            <MusicCard
              checked={ parameter.isFav }
              data={ parameter }
              key={ parameter.trackId }
              trackId={ parameter.trackId }
              trackName={ parameter.trackName }
              previewUrl={ parameter.previewUrl }
            />
          ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default Album;
