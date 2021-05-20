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
        //  总访问量加一
        statistics.count_all += 1
        //  国家访问加一
        const countryList = Object.keys(statistics.count_country)
        if(country in countryList){
            statistics.count_country[country] += 1
        }else{
            statistics.count_country[country] = 1
        }
        console.log(statistics)
        await OSSClient.put('Statistics/','count.json', statistics)
    }
  
    componentDidUpdate() {
    }
  
    render() {
      return (
        <div>
            {/*
            <script type="text/javascript">
                var userip
            </script>
            <script type="text/javascript" src="https://l2.io/ip.js?var=userip"></script>
            <script type="text/javascript">
                console.log(userip)
            </script>
            */}
        </div>
      )
    }
  }
  
  export default VisiterCounter;