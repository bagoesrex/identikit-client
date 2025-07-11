import { CreateUserInput } from '@/types/user'
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function createUser(data: CreateUserInput) {
    const response = await api.post('/users', data)
    return response.data
}

export async function getUsers() {
    const response = await api.get('/users')
    return response.data.data
}

export async function deleteUser(id: string) {
    const response = await api.delete(`/users/${id}`)
    return response.data
}

export async function editUser(id: string, data: CreateUserInput) {
    const response = await api.put(`/users/${id}`, data)
    return response.data
}

export default api
