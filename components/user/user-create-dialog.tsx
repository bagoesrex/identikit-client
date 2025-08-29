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
import api from "@/lib/axios"
import { useState } from "react"
import { CirclePlus } from "lucide-react"

interface Props {
    onCreated: () => void
}

export function UserCreateDialog({ onCreated }: Props) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<CreateUserInput>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            nama: "",
            email: "",
            nomorTelepon: "",
            departemen: "",
            statusAktif: true,
        },
    })

    const onSubmit = async (data: CreateUserInput) => {
        setLoading(true)
        try {
            await api.post("/users", data)
            onCreated()
            reset()
            setOpen(false)
        } catch (error) {
            console.error("Gagal menambahkan pengguna", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-purple-700 text-white hover:bg-purple-800 flex flex-row gap-2 justify-center items-center w-[23rem] sm:w-[9rem] py-2  text-sm rounded-md border transition text-center">
                    <CirclePlus width={18} />
                    Tambah User
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white/97">
                <DialogHeader>
                    <DialogTitle>Tambah Pengguna</DialogTitle>
                    <DialogDescription>Isi data pengguna baru.</DialogDescription>
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
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-700 text-white text-sm rounded-md hover:bg-transparent hover:text-purple-700 border border-purple-700 transition"
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
