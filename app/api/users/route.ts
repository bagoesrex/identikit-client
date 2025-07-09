import { NextResponse } from 'next/server'
import { userSchema } from '@/validations/user.validation'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = userSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { message: 'Validasi gagal', errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const userData = result.data

        console.log(userData)

        return NextResponse.json({ message: 'User berhasil dibuat' })
    } catch (error) {
        console.error("Gagal membuat user:", error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
