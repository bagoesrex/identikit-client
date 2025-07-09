export async function createUser(data: any) {
    const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Gagal membuat user")
    }

    return res.json()
}
