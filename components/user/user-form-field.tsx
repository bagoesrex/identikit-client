"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { userSchema } from "@/validations/user.validation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import api from "@/lib/axios"
import { CreateUserInput } from "@/types/user"

export default function UserFormField() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreateUserInput>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            statusAktif: true,
        },
    })

    const onSubmit = async (data: CreateUserInput) => {
        setLoading(true)
        try {
            const response = await api.post('/users', data)
            console.log(response)
            router.push("/users")
        } catch (error: any) {
            const msg = error?.response?.data?.message || "Gagal menambahkan user"
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 px-4 sm:px-0 max-w-xl mx-auto w-full"
        >
            <div>
                <Label className="mb-1 block">Nama</Label>
                <Input {...register("nama")} />
                {errors.nama && (
                    <p className="text-red-500 text-sm mt-1">{errors.nama.message}</p>
                )}
            </div>

            <div>
                <Label className="mb-1 block">Email</Label>
                <Input type="email" {...register("email")} />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <Label className="mb-1 block">Nomor Telepon</Label>
                <Input {...register("nomorTelepon")} />
                {errors.nomorTelepon && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.nomorTelepon.message}
                    </p>
                )}
            </div>

            <div>
                <Label className="mb-1 block">Departemen</Label>
                <Input {...register("departemen")} />
                {errors.departemen && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.departemen.message}
                    </p>
                )}
            </div>

            <div>
                <Label className="mb-1 block">Status Aktif</Label>
                <Select
                    name="statusAktif"
                    defaultValue="true"
                    onValueChange={(val) => setValue("statusAktif", val === "true")}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true">Aktif</SelectItem>
                        <SelectItem value="false">Tidak Aktif</SelectItem>
                    </SelectContent>
                </Select>
                {errors.statusAktif && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.statusAktif.message as string}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-4 bg-purple-700 text-white text-sm rounded-md hover:bg-transparent hover:text-purple-700 border border-purple-700 transition">
                {loading ? "Menyimpan..." : "Simpan"}
            </Button>
        </form>
    )
}
