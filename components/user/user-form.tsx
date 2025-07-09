import UserFormField from "./user-form-field";

export default function UserForm() {
    return (
        <div className="bg-white/70 backdrop-blur-3xl py-4 px-4 rounded-md mx-6 border-b-2 border-x-2 border-purple-600">
            <h1 className="text-2xl font-bold mb-6 text-center text-purple-700">Tambah User Baru</h1>
            <UserFormField />
        </div>
    )
}