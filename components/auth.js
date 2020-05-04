import React, { Component } from 'react';
import Login from './login'
import Register from './register'
import Home from './home'
import {
    View,
    StyleSheet,
    Alert,
    Image
} from 'react-native';
import {AsyncStorage} from 'react-native';
import { connect } from 'react-redux'

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: true,
      isLoggedIn: false
    }
  }

  componentDidMount() {
    this.isUserLoggedIn()
  }

  isUserLoggedIn () {
    try {
      const state = AsyncStorage.getItem('auth');
      if (state) {
        this.setState({ isLoggedIn: state.isLoggedIn, user: state.user });
      }
    } catch (error) {
      console.error(error)
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    let page
    if (this.props.isLoggedIn) {
      page = <Home loginCallback={() => this.setState({login : false}) } />
    } else {
      if (this.state.login) {
        page = <Login loginCallback={() => this.setState({login : false}) } />
      } else {
        page = <Register registerCallback={() => this.setState({login : true}) } />
      }
    }
    
    return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
         <Image
            style={styles.image}
            source={require('../images/pwd-ico.png') } />
         </View>
          { page }
      </View>   
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DCDCDC',
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    image: {
      width: 100,
      height: 125
    }
});

const mapStateToProps = state => {
  return {
    isLoggedIn: state.toggleLogin.isLoggedIn
  }
}

export default connect(mapStateToProps)(Auth)
 