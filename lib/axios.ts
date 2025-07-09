import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function createUser(data: any) {
    const response = await api.post('/users', data)
    return response.data
}

export default api
