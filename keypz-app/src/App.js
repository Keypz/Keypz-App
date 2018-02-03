import React from 'react'
import { Router, Link } from 'react-static'
//
import Routes from 'react-static-routes'
//
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import client from './connectors/apollo'
import store from './connectors/redux'

import './app.css'

export default () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <Link to="/">
              <img className="brand" src="https://static1.squarespace.com/static/5918cdf8d2b857e0cc16de69/t/598dd0759f7456293a323b99/1509479739226/?format=1500w" />
            </Link>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            
          </nav>
          <div className="content">
            <Routes />
          </div>
        </div>
      </Router>
    </Provider>
  </ApolloProvider>
)
