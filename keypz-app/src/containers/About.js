
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import { increment } from '../actions/config-actions';

// /////////////////////////////////////////////////////////
// Redux components
// From http://redux.js.org/docs/basics/UsageWithReact.html
// Display component
const Counter = ({ count, incrementCounter }) => (
  <div>
    <p>Value: {count}</p>
    <button onClick={incrementCounter}>Increment</button>
  </div>
)
// Connexion with redux
const CounterConnected = connect(
  ({ counter: { count } }) => ({
    count,
  }),
  dispatch => ({
    incrementCounter: () => {
      console.log('FIREE1')
      dispatch(increment())
    }
  }),
)(Counter)

// /////////////////////////////////////////////////////////
// Actual container
const About = () => (
  <div>
    <h1>This is what we're all about.</h1>
    <p>React, static sites, performance, speed. It's the stuff that makes us tick.</p>
    <h2>Here is a person loaded from graphql:</h2>
    <h2>Here is a redux counter:</h2>
    <CounterConnected />
  </div>
)

export default About
