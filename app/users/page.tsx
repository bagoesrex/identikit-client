import { User } from "@/types/user"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { dummyUsers } from "@/data/users"

async function getData(): Promise<User[]> {
    return dummyUsers
}
export default async function UsersPage() {
    const data = await getData()
    return (
        <main className="flex flex-col justify-center max-w-4xl mx-auto py-20">
            <h1 className="font-bold text-2xl mb-4">Users</h1>
            <DataTable columns={columns} data={data} />
        </main>
    )
}