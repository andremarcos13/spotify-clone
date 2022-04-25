import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };
  }

  inputValueHandler = ({ target }) => {
    this.setState({ artistName: target.value });
  }

  render() {
    const minCharacter = 2;
    const { artistName } = this.state;
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
            value={ artistName }
            onChange={ this.inputValueHandler }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ minCharacter > artistName.length }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
