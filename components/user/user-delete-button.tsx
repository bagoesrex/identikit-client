"use client"

import { Trash2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"

interface UserDeleteButtonProps {
    id: string
    name: string
    onDelete: (id: string) => void
}

export function UserDeleteButton({ id, name, onDelete }: UserDeleteButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="link"
                    className="text-red-600 text-sm flex items-center mx-0 py-0"
                >
                    <Trash2 size={16} />
                    Hapus
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Pengguna <b>{name}</b> akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-1 border-black hover:bg-transparent">Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(id)} className="bg-red-700 hover:bg-red-700">
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
