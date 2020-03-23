import React, { Component } from 'react';
import { getQueryStringByName } from '../../utils/index'

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: '',
      longitude: '',
      mapKey: ''
    }
  }
  componentDidMount() {
    this.setState({
      latitude: getQueryStringByName('lat'),
      longitude: getQueryStringByName('lon'),
      mapKey: getQueryStringByName('mapKey')
    })
  }
  render() {
    return (
      <div className="geoPage" style={{height:'100vh',width:'100%'}}>
        <iframe
          title="myIframe"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src={
            'https://apis.map.qq.com/uri/v1/geocoder?coord=' +
            this.state.latitude +
            ',' +
            this.state.longitude +
            '&referer=' +
            this.state.mapKey
          }
        />

      </div>
    );
  }
}

export default Location
