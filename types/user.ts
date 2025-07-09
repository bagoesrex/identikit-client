import { z } from "zod"
import { userSchema } from "@/validations/user.validation"

export type User = {
    id: number;
    nama: string;
    email: string;
    nomorTelepon: string;
    statusAktif: boolean;
    departemen: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateUserInput = z.infer<typeof userSchema>