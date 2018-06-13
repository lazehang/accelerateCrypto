import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddCoinForm from './AddCoinForm';
import EditCoinForm from './EditCoinForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static propTypes = {
    coins: PropTypes.object,
    addCoin: PropTypes.func,
    updateCoin: PropTypes.func,
    deleteCoin: PropTypes.func,
    loadSampleCoins: PropTypes.func
  }

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async (authData) => {
    // 1. Lookup current store in firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2. Claim if no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null })
  }

  render() {
    const logout = <button onClick={this.logout}>Log out</button>

    // 1. Check if user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    // 2. Check if user is not owner of store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the store owner</p>
          {logout}
        </div>
      )
    }

    // 3. If user == owner, render inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.coins).map(key =>
          <EditCoinForm
            key={key}
            index={key}
            coin={this.props.coins[key]}
            updateCoin={this.props.updateCoin}
            deleteCoin={this.props.deleteCoin}
          />
        )}
        <AddCoinForm addCoin={this.props.addCoin} />
        <button onClick={this.props.loadSampleCoins}>Load sample coins</button>
      </div>
    )
  }
}

export default Inventory;