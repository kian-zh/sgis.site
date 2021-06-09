import React from 'react'
import axios from 'axios'
import OSSClient from './OSSClient.js'
class VisiterCounter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    async componentDidMount() {
        let country = null
        let statistics = null
        await axios.get('https://api.country.is')
            .then((response) => {country = response.data.country})
            .catch((error) => {console.log(error)})
        statistics = await OSSClient.get('Statistics/','count.json')
        if(!statistics){
          return;
        }
        //  总访问量加一
        statistics.count_all += 1
        //  国家访问加一
        if(statistics.count_country[country]){
            statistics.count_country[country] += 1
        } else {
            statistics.count_country[country] = 1
        }
        await OSSClient.put('Statistics/','count.json', statistics)
    }
  
    componentDidUpdate() {
    }
  
    render() {
      return (
        <div>
        </div>
      )
    }
  }
  
  export default VisiterCounter;