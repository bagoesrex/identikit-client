"use client"

import { User } from "@/types/user"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CircleUser, Hotel, Mail, Phone } from "lucide-react"
import { UserEditDialog } from "@/components/user/user-edit-dialog"
import { UserDeleteButton } from "./user-delete-button"

interface Props {
    users: User[]
    loading?: boolean
    error?: string
    onDelete: (id: string) => void
    onUpdated: () => void
}

export function UserListMobile({ users, loading, error, onDelete, onUpdated }: Props) {
    if (loading) return (
        <div className="min-h-[40vh] flex justify-center items-center">
            <p className="text-center">Memuat data...</p>
        </div>
    )
    if (error) return <p className="text-center text-red-500">{error}</p>
    if (!users.length) return (
        <div className="min-h-[40vh] flex justify-center items-center">
            <p className="text-center">Tidak ada pengguna ditemukan.</p>
        </div>
    )

    return (
        <div className="space-y-4">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="rounded-xl border bg-white/55 backdrop-blur-md shadow-md p-3 space-y-2 mx-5"
                >
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={`user-${user.id}`}>
                            <AccordionTrigger className="text-left text-base font-medium px-2">
                                {
                                    <div className="flex flex-row gap-2">
                                        <CircleUser />
                                        {user.nama}
                                    </div>
                                }
                            </AccordionTrigger>
                            <AccordionContent className="px-3 pb-2 text-sm text-gray-700 space-y-1">
                                <div className="flex flex-row gap-2">
                                    <Mail width={18} />
                                    <p>{user.email}</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Phone width={18} />
                                    <p>{user.nomorTelepon}</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Hotel width={18} />
                                    <p>{user.departemen}</p>
                                </div>

                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="flex  text-sm justify-between items-center px-2">
                        <p>
                            <span className={user.statusAktif ? "bg-green-100 text-green-800 py-1 px-3 rounded-md" : "bg-red-100 text-red-800 py-1 px-3 rounded-md"}>
                                {user.statusAktif ? "Aktif" : "Tidak Aktif"}
                            </span>
                        </p>
                        <div className="flex flex-row gap-2">
                            <UserEditDialog
                                user={user}
                                onUpdated={onUpdated}
                            />
                            <UserDeleteButton
                                id={String(user.id)}
                                name={user.nama}
                                onDelete={onDelete}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
