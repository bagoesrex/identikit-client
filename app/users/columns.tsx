"use client"

import { UserDeleteButton } from "@/components/user/user-delete-button";
import { generateIsoDate } from "@/lib/date";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const getColumns = (onDelete: (id: string) => void): ColumnDef<User>[] => [
    {
        accessorKey: "nama",
        header: "Nama",
    },
    {
        accessorKey: "email",
        header: "Email",
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
                    <Link href={`/users/edit/${user.id}`} className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                        <Pencil size={16} />
                        Edit
                    </Link>
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