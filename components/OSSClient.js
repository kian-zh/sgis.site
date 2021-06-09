import axios from 'axios'

const client = {
    /*
    *   path: 路径（可为空）
    *   name: 文件名
    *   file: 文件
    */
    put: async (path, name, file) => {
        try {
            let myFile = null
            if(file instanceof Blob){
                myFile = file
            }else{
                myFile = new Blob([JSON.stringify(file)], {type: 'application/json'})
            }
          return axios.put('http://sgis.site/' + path + name, myFile)
        } catch (e) {
          console.log(e);
        }
    },
    get: async (path, name) => {
        let result = null
        axios.get('http://sgis.site/' + path + name)
            .then((response) => {result = response.data})
            .catch((error) => {console.log(error)})
        return result
    }
}

export default client