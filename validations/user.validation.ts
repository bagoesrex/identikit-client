import { z } from 'zod';

export const userSchema = z.object({
    nama: z.string().min(1, { message: 'Nama wajib diisi' }),
    email: z.string().email({ message: 'Email tidak valid' }),
    nomorTelepon: z
        .string()
        .regex(/^[0-9]+$/, { message: 'Nomor telepon hanya boleh berisi angka' })
        .min(10, { message: 'Nomor telepon minimal 10 digit' }),
    statusAktif: z.boolean(),
    departemen: z.string().min(1, { message: 'Departemen wajib diisi' }),
});