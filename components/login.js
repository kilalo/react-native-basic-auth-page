import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'
import { login } from '../api/auth'


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      error: null,
      loader: false
    }
  }
  loginAction() {
    this.setState({ loader : true })
    this.setState({ error : null })
    const credentials = {
      'email' : this.state.email,
      'password' : this.state.password
    }
    login(credentials).then((data) => {
      console.log(data.data)
      this.setState({ loader : false })
      const action = { type: "TOGGLE_LOGIN", value: data.data  }
      this.props.dispatch(action)
      console.log('SUCCESS')
    })
		.catch(error => {
      this.setState({ loader : false })
      this.setState({ error : error.response.data.error })
      console.log(error.response.data.error)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardForm}>
          <View style={styles.inputContainer}>
          <Button icon="account" style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
          </View>
          <View style={styles.inputContainer}>
            <Button icon="lock-question" style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>
          <Button disabled={this.state.loader} loading={this.state.loader} style={styles.button}mode="contained" onPress={() => this.loginAction() }>
            Connexion
          </Button>
          { this.state.error
            ? <Text style={styles.error}>Adresse mail ou mot de passe invalide</Text>
            : null
          }
        </View>
        <TouchableHighlight style={[styles.buttonContainer]} onPress={() => console.log(this.props) }>
          <Text style={styles.loginText}>Mot de passe oublié ?</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer]} onPress={() => this.props.loginCallback() }>
          <Text style={styles.loginText}>Créer un compte</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardForm: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 20,
    borderRadius:10,

  },
  button: {
    marginBottom: 20
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderColor: "#20232a",      
      borderBottomWidth: 2,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  error: {
    color: "red",
    marginBottom:20,
  },
  loginText: {
    color: 'black',
  },
  buttonContainer: {
    marginTop:25,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapDispatchToProps)(Login)
 