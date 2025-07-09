"use client"

import { UserDeleteButton } from "@/components/user/user-delete-button";
import { UserEditDialog } from "@/components/user/user-edit-dialog";
import { generateIsoDate } from "@/lib/date";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumns = (
    onDelete: (id: string) => void,
    onUpdate: () => void
): ColumnDef<User>[] => [
        {
            accessorKey: "nama",
            header: "Nama",
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => (
                <div className="max-w-[10rem] truncate text-sm">{row.getValue("email")}</div>
            ),
        },
        {
            accessorKey: "nomorTelepon",
            header: "Telepon",
        },
        {
            accessorKey: "departemen",
            header: "Departemen",
        },
        {
            accessorKey: "statusAktif",
            header: "Status",
            cell: ({ row }) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${row.original.statusAktif
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    {row.original.statusAktif ? "Aktif" : "Tidak Aktif"}
                </span>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Dibuat",
            cell: ({ row }) => {
                const date = new Date(row.original.createdAt)
                return <span>{generateIsoDate(date, "dd MMM yyyy HH:mm")}</span>
            },
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => {
                const user = row.original

                return (
                    <div className="flex gap-2">
                        <UserEditDialog
                            user={user}
                            onUpdated={onUpdate}
                        />
                        <UserDeleteButton
                            id={String(user.id)}
                            name={user.nama}
                            onDelete={onDelete}
                        />
                    </div>
                )
            }
        },
    ];