import React from 'react'
import axios from 'axios'
class VisiterCounter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    async componentDidMount() {
        let country = ''
        await axios.get('https://api.country.is')
        .then((response) => {country = response.data.country})
        .catch((error) => {console.log(error)})
        
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