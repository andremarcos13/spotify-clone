import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const getUserFunc = await getUser();
    this.setState({ userName: getUserFunc.name, loading: false });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <div
        data-testid="header-component"
        className="componente-header"
      >
        Componente Header
        <h2 data-testid="header-user-name">
          Bem-vindo,
          { loading && <Loading />}
          { userName }
          !
        </h2>
        <nav className="nav-link">
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
