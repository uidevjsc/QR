import axios from 'axios'
import { apiRoute } from '../config/httpConfig'

class ServicesItems {
  async getItems() {
    return await axios.get(`${apiRoute.apiPath}items`)
  }

  async addItems(items) {
    return await axios.post(`${apiRoute.apiPath}items`, items)
  }
}

export default ServicesItems
