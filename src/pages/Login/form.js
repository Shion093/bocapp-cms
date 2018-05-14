import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

// Reducers
import { handleLogin, handleLoginInputs, clearUser } from '../../reducers/auth';

import './styles.css'

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      clearUser,
      handleLogin,
      handleLoginInputs,
    }, dispatch),
  };
}

class LoginForm extends Component {
  componentDidMount () {
    this.props.actions.clearUser()
  }
  login = () => {
    this.props.actions.handleLogin();
  };

  handleChange = (e, { name, value }) => {
    this.props.actions.handleLoginInputs('userInfo', name, value);
  };

  render() {
    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={ { maxWidth : 450, width : 450 } }>
          <Header as='h2' color='teal' textAlign='center'>
            { /*<Image src='/logo.png' />*/ }
            BocaApp
          </Header>
          <Form size='large' onSubmit={ this.login }>
            <Segment stacked>
              <Form.Input { ...{
                fluid        : true,
                icon         : 'user',
                iconPosition : 'left',
                placeholder  : 'E-mail',
                name         : 'email',
                onChange     : this.handleChange,
              } } />

              <Form.Input { ...{
                fluid        : true,
                icon         : 'lock',
                iconPosition : 'left',
                placeholder  : 'Contraseña',
                name         : 'password',
                type         : 'password',
                onChange     : this.handleChange,
              } } />
              <Button color='teal' fluid size='large'>Iniciar sesión</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
