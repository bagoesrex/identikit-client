import { User } from "@/types/user"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { dummyUsers } from "@/data/users"
import Link from "next/link"

async function getData(): Promise<User[]> {
    return dummyUsers
}
export default async function UsersPage() {
    const data = await getData()
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
            <DataTable columns={columns} data={data} />
        </main>
    )
}