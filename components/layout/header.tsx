import Link from "next/link";
import Navbar from "./navbar";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 h-16 backdrop-blur-md bg-white/97">
            <div className="flex flex-row justify-between items-center max-w-5xl mx-auto h-full border-b-2 border-purple-600 px-5">
                <div>
                    <Link href={"/"}>
                        <h1 className="text-purple-600 font-bold ml-2">IDENTIKIT</h1>
                    </Link>
                </div>
                <Navbar />
            </div>
        </header>
    );
}
