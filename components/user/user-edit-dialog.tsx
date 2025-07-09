"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserInput } from "@/types/user"
import { userSchema } from "@/validations/user.validation"
import { editUser } from "@/lib/axios"
import { User } from "@/types/user"
import { useState } from "react"

interface Props {
    user: User
    onUpdated: () => void
}

export function UserEditDialog({ user, onUpdated }: Props) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateUserInput>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            nama: user.nama,
            email: user.email,
            nomorTelepon: user.nomorTelepon,
            departemen: user.departemen,
            statusAktif: user.statusAktif,
        },
    })

    const onSubmit = async (data: CreateUserInput) => {
        setLoading(true)
        try {
            await editUser(String(user.id), data)
            onUpdated()
            setOpen(false)
        } catch (error) {
            console.error("Gagal memperbarui pengguna", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    className="text-blue-600 text-sm flex items-center"
                >
                    <Pencil size={16} />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Pengguna</DialogTitle>
                    <DialogDescription>Perbarui data pengguna.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label className="mb-2">Nama</Label>
                        <Input {...register("nama")} />
                        {errors.nama && (
                            <p className="text-red-500 text-sm">{errors.nama.message}</p>
                        )}
                    </div>
                    <div>
                        <Label className="mb-2">Email</Label>
                        <Input type="email" {...register("email")} />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <Label className="mb-2">Nomor Telepon</Label>
                        <Input {...register("nomorTelepon")} />
                        {errors.nomorTelepon && (
                            <p className="text-red-500 text-sm">
                                {errors.nomorTelepon.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label className="mb-2">Departemen</Label>
                        <Input {...register("departemen")} />
                        {errors.departemen && (
                            <p className="text-red-500 text-sm">
                                {errors.departemen.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label className="mb-2">Status Aktif</Label>
                        <Controller
                            control={control}
                            name="statusAktif"
                            render={({ field }) => (
                                <Select
                                    value={field.value ? "true" : "false"}
                                    onValueChange={(val) => field.onChange(val === "true")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Aktif</SelectItem>
                                        <SelectItem value="false">Tidak Aktif</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.statusAktif && (
                            <p className="text-red-500 text-sm">
                                {errors.statusAktif.message as string}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}
