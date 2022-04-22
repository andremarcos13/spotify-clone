import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      userLogIn: false,
    };
  }

  inputValueHandler = ({ target }) => {
    this.setState({ name: target.value });
  }

  usingCreateUser = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, userLogIn: true });
  }

  render() {
    const minCharacter = 3;
    const { name, loading, userLogIn } = this.state;
    return (
      userLogIn ? <Redirect to="/search" /> : (
        <div data-testid="page-login" className="componente-login">
          Componente Login
          <label htmlFor="input-login">
            <input
              type="text"
              data-testid="login-name-input"
              name="input-login"
              id="input-login"
              placeholder="Nome"
              onChange={ this.inputValueHandler }
              value={ name }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ name.length < minCharacter }
              onClick={ this.usingCreateUser }
            >
              Entrar
            </button>
          </label>
          { loading && <Loading />}
        </div>
      )
    );
  }
}

export default Login;
