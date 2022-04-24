import React from 'react';
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
        <h2>
          Bem-vindo,
          { loading && <Loading />}
          { userName }
          !
        </h2>
      </div>
    );
  }
}

export default Header;
