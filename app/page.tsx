import Image from "next/image";
import Icon from "@/public/users.gif"

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center max-w-2xl mx-auto py-20">
      <Image src={Icon} alt={""} width={80} />
      <h1>Aloha</h1>
    </main>
  );
}
