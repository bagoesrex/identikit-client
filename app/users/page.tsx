"use client"

import { useEffect, useState } from "react"

import { User } from "@/types/user"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"
import { deleteUser, getUsers } from "@/lib/axios"
import { UserListMobile } from "@/components/user/user-list-mobile"
import { AxiosError } from "axios"
import { UserCreateDialog } from "@/components/user/user-create-dialog"

export default function UsersPage() {
    const [data, setData] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")

    const filteredData = data.filter((user) =>
        user.nama.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )

    const refreshData = async () => {
        try {
            const users = await getUsers()
            setData(users)
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message?: string }>
            const msg = axiosError.response?.data?.message || "Gagal memuat data pengguna"
            setError(msg)
        }
    }

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            setLoading(true)
            try {
                const users = await getUsers()
                if (isMounted) setData(users)
            } catch (err: unknown) {
                const axiosError = err as AxiosError<{ message?: string }>
                const msg = axiosError.response?.data?.message || "Gagal memuat data pengguna"
                setError(msg)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchData()
        return () => { isMounted = false }
    }, [])

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id)
            const users = await getUsers()
            setData(users)
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ message?: string }>
            const msg = axiosError.response?.data?.message || "Gagal menghapus pengguna"
            setError(msg)
        }
    }

    return (
        <main className="flex flex-col justify-center max-w-5xl sm:px-6 mx-auto py-20">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-center sm:text-left text-purple-700">Daftar Pengguna</h1>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        className="md:max-w-sm px-4 sm:mx-0 mx-6 py-2 border border-purple-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 placeholder:text-purple-700 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="flex flex-row justify-center items-center">
                        <UserCreateDialog onCreated={refreshData} />
                    </div>
                </div>

            </div>

            <div className="hidden md:block">
                <DataTable
                    columns={getColumns(handleDelete, refreshData)}
                    data={filteredData}
                    loading={loading}
                    emptyMessage={error || "Tidak ada pengguna ditemukan."}
                />
            </div>

            <div className="block md:hidden">
                <UserListMobile
                    users={filteredData}
                    loading={loading}
                    error={error}
                    onDelete={handleDelete}
                    onUpdated={refreshData}
                />
            </div>
        </main >
    )
}
