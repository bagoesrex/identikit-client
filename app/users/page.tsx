"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { User } from "@/types/user"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"
import { deleteUser, getUsers } from "@/lib/axios"
import { UserListMobile } from "@/components/user/user-list-mobile"
import { CirclePlus } from "lucide-react"

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
        } catch (err) {
            setError("Gagal memuat data pengguna")
        }
    }

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            setLoading(true)
            try {
                const users = await getUsers()
                if (isMounted) setData(users)
            } catch (err) {
                setError("Gagal memuat data pengguna")
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
        } catch (err) {
            setError("Gagal menghapus pengguna")
        }
    }

    return (
        <main className="flex flex-col justify-center max-w-5xl sm:px-6 mx-auto py-20">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-center sm:text-left">Daftar Pengguna</h1>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        className="md:max-w-sm px-4 sm:mx-0 mx-6 py-2 border rounded-md shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link
                        href="/users/create"
                        className="flex flex-row gap-2 justify-center items-center px-4 mx-10 sm:mx-0 py-2 bg-black text-white text-sm rounded-md hover:bg-transparent hover:text-black border border-black transition text-center"
                    >
                        <CirclePlus width={18} />
                        Tambah User
                    </Link>
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
        </main>
    )
}
