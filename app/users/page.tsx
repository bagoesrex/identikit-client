"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { User } from "@/types/user"
import { getColumns } from "./columns"
import { DataTable } from "./data-table"
import { deleteUser, getUsers } from "@/lib/axios"

export default function UsersPage() {
    const [data, setData] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

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
        <main className="flex flex-col justify-center max-w-4xl mx-auto py-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Daftar Pengguna</h1>
                <Link
                    href="/users/create"
                    className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-transparent hover:text-black border border-black transition"
                >
                    + Tambah User
                </Link>
            </div>

            <DataTable
                columns={getColumns(handleDelete, async () => {
                    const users = await getUsers()
                    setData(users)
                })}
                data={data}
                loading={loading}
                emptyMessage={error || "Tidak ada pengguna ditemukan."}
            />
        </main>
    )
}
