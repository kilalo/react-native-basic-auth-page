import React, { Component } from 'react';
import {
    View,
		StyleSheet,
		Text
} from 'react-native';
import { Button } from 'react-native-paper'
import { connect } from 'react-redux'

class Home extends Component {

  constructor(props) {
		super(props)
	}
	
	logoutAction() {
		const action = { type: "TOGGLE_LOGOUT" }
		this.props.dispatch(action)
  }

  render() {
    return (
      <View style={styles.container}>
				 <Text>Bonjour { this.props.user.name }</Text>
         <Text>Vous êtes connecté</Text>
				 <Button mode="contained" style={ styles.button } onPress={() => this.logoutAction() }>
            Déconnexion
          </Button>
      </View>   
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#DCDCDC',
	},
	button: {
		marginTop: 20
	}
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

const mapStateToProps = state => {
  return {
    user: state.toggleLogin.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
