import Link from "next/link";
import Navbar from "./navbar";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 h-16 backdrop-blur-md">
            <div className="flex flex-row justify-between items-center max-w-4xl mx-auto h-full border-b-1 border-black px-5">
                <div>
                    <Link href={"/"}>
                        <h1><span className="text-purple-600 font-bold">USER MANAGEMENT APP</span></h1>
                    </Link>
                </div>
                <Navbar />
            </div>
        </header>
    );
}
