import React, { Component } from 'react';
import Particles from 'react-particles-js';

// Components
import LoginForm from './form';

import './styles.css';

class Login extends Component {
  render() {
    return (
      <div className='loginCont'>
        <Particles { ...{
          params : {
            particles : {
              number      : {
                value : 100
              },
              line_linked : {
                shadow : {
                  enable : false,
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
        } } />
        <LoginForm />
      </div>
    )
  }
}

export default Login;
