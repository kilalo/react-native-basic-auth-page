import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux'
import { Button } from 'react-native-paper'
import { register } from '../api/auth'


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      name: '',
      password: '',
      errors : null,
      loader: false
    }
  }

  registerAction() {
    this.setState({ loader : true })
    this.setState({ errors : null })
    const credentials = {
      'email' : this.state.email,
      'name' : this.state.name,
      'password' : this.state.password
    }
    register(credentials).then((data) => {
      this.setState({ loader : false })
      const action = { type: "TOGGLE_LOGIN", value: data.data  }
      this.props.dispatch(action)
      console.log('SUCCESS')
    }).catch(error => {
      this.setState({ loader : false })
      this.setState({ errors : error.response.data.errors })
      console.log(error.response.data.errors)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardForm}>
          <View style={styles.inputContainer}>
            <Button icon="account" style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Nom"
                underlineColorAndroid='transparent'
                onChangeText={(name) => this.setState({name})}/>
          </View>
          { this.state.errors && this.state.errors.name
            ? <Text style={styles.error}>Le champs nom est obligatoire</Text>
            : null
          }
          <View style={styles.inputContainer}>
            <Button icon="email" style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Adresse email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
          </View>
          { this.state.errors && this.state.errors.email
            ? <Text style={styles.error}>Le champs email est obligatoire</Text>
            : null
          }
          <View style={styles.inputContainer}>
            <Button icon="lock-question" style={styles.inputIcon}/>
            <TextInput style={styles.inputs}
                placeholder="Mot de passe"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>
          { this.state.errors && this.state.errors.password
            ? <Text style={styles.error}>Le champs mot de passe est obligatoire</Text>
            : null
          }
          <Button disabled={this.state.loader} loading={this.state.loader} style={styles.button}mode="contained" onPress={() => this.registerAction() }>
            Créer le compte
          </Button>
        </View>
        <TouchableHighlight style={[styles.buttonContainer]} onPress={() => this.props.registerCallback() }>
          <Text style={styles.loginText}>Connexion</Text>
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
    marginBottom: 20,
    marginTop: 20
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

export default connect(mapDispatchToProps)(Register)
 