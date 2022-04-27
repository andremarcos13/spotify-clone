import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      loading: false,
      albumList: [],
      artistName: '',
    };
  }

  inputValueHandler = ({ target }) => {
    this.setState({ inputValue: target.value });
  }

  usingSearchAlbumAPI = async () => {
    const { inputValue } = this.state;
    this.setState({ loading: true });
    const results = await searchAlbumsAPI(inputValue);
    this.setState({
      inputValue: '',
      loading: false,
      albumList: results,
      artistName: inputValue });
  }

  render() {
    const minCharacter = 2;
    const { inputValue, loading, albumList, artistName } = this.state;
    return (
      <div
        data-testid="page-search"
        className="componente-search"
      >
        <Header />
        Componente Search
        <label htmlFor="artist-search">
          <input
            data-testid="search-artist-input"
            type="text"
            name="artist-search"
            id="artist-search"
            placeholder="Nome do artista"
            value={ inputValue }
            onChange={ this.inputValueHandler }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ inputValue.length < minCharacter }
          onClick={ this.usingSearchAlbumAPI }
        >
          Pesquisar
        </button>
        {loading && <Loading />}
        {albumList.length > 0 ? (
          <div>
            <div>
              <h4>
                { `Resultado de álbuns de: ${artistName}`}
              </h4>
            </div>
            {albumList.map((element) => (
              <div key={ element.collectionId }>
                <li>
                  { element.collectionName }
                  <Link
                    to={ `/album/${element.collectionId}` }
                    data-testid={ `link-to-album-${element.collectionId}` }
                  >
                    Go to album
                  </Link>
                </li>
                <img src={ element.artworkUrl100 } alt={ element.collectionName } />
              </div>
            ))}
          </div>
        ) : (<p>Nenhum álbum foi encontrado</p>)}
      </div>
    );
  }
}

export default Search;
