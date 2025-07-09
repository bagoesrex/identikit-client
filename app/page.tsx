"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Lottie from "lottie-react"
import animationData from "@/public/lotties/homepage-lottie.json"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
        Selamat Datang di <span className="text-purple-600">Identikit</span>
      </h1>
      <p className="text-md sm:text-lg text-gray-600 max-w-2xl">
        Kelola data pengguna dengan mudah dan cepat. Tambah, ubah, dan hapus pengguna dalam satu dashboard yang intuitif.
      </p>

      <Lottie animationData={animationData} className="size-50 -mt-8" />

      <Link href="/users">
        <Button size="lg" className="text-base px-6 py-4 flex flex-row gap-2 justify-center items-center bg-black text-white rounded-md hover:bg-transparent hover:text-black border border-black transition text-center">
          <Users className="w-5 h-5 mr-2" />
          Lihat Pengguna
        </Button>
      </Link>
    </main>
  )
}
