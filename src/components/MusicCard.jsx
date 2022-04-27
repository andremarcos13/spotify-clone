import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    const { checked } = this.props;
    this.state = {
      loading: false,
      clickFav: checked,
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async handleFavorite({ target }) {
    const { data } = this.props;
    this.setState({ loading: true });
    if (target.checked) await addSong(data);
    this.setState({ loading: false, clickFav: target.checked });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, clickFav } = this.state;
    return (
      <div className="componente-musiccard">
        { loading ? <Loading /> : (
          <>
            Componente Music Card
            <div>
              <h3>{trackName}</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  name="fav-song"
                  id={ trackId }
                  defaultChecked={ clickFav }
                  onChange={ this.handleFavorite }
                />
              </label>
            </div>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  data: PropTypes.arrayOf.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
