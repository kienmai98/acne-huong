import { API_SERVER } from 'config/constants'

async function getListVideosApi() {
  try {
    const res = await fetch(`${API_SERVER}/api/items`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

export default getListVideosApi
