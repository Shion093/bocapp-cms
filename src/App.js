import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <header>
            <Link to="/">Home</Link>
            <Link to="/about-us">About</Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
