import React from 'react'
import { withSiteData } from 'react-static'

class Home extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    const API_KEY = 'ffAGGpR07MXTUwMB3ZcwknFfqo6GeYWW' || process.env.API_KEY;
    const requestUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&source=ticketmaster&countryCode=GB&classificationName=sport`

    fetch(requestUrl)
      .then((response) => response.json())
      .then(data => this.setState({ events: data._embedded.events }))
      .catch((error) => console.error(error))
  }

  render () {
    const { events } = this.state
    if (events.length === 0) {
      return null
    }

    return (
      <div>
        <h1>Tickets without the Touts.</h1>
        {events.map((event, index) => {
          if (event.name === "0") {
            return null
          }

          return (
            <div key={event.id}>
              <h2>{event.name}</h2>
              <a className="btn btn--cta" href={event.url}>Buy Tickets</a>
              <img src={event.images[0].url} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default withSiteData(Home)
