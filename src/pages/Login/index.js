import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import Particles from 'react-particles-js';

// Reducers
import { fakeLogin } from '../../reducers/auth';

import './styles.css'


function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      fakeLogin,
    }, dispatch),
  };
}

class Login extends Component {
  login = () => {
    this.props.actions.fakeLogin();
  };

  render () {
    return (
      <div className='loginCont'>
        <Particles {...{
          params : {
            particles : {
              number      : {
                value : 100
              },
              line_linked : {
                shadow : {
                  enable : true,
                  color  : '#3CA9D1',
                  blur   : 5
                }
              }
            }
          },
          style  : {
            position        : 'fixed',
            top             : 0,
            left            : 0,
            width           : '100%',
            height          : '100%',
            backgroundColor : '#000000'
          }
        }} />
        <Grid textAlign='center' verticalAlign='middle'>
          <Grid.Column style={{ maxWidth : 450, width : 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              {/*<Image src='/logo.png' />*/}
              BocaApp
            </Header>
            <Form size='large' onSubmit={this.login}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Button color='teal' fluid size='large'>Login</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
