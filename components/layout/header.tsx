import Navbar from "./navbar";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 h-16">
            <div className="flex flex-row justify-between items-center backdrop-blur-md max-w-2xl mx-auto h-full border-b-1 border-black px-5">
                <div>
                    <h1>{`< Header Icon />`}</h1>
                </div>
                <Navbar />
            </div>
        </header>
    );
}
