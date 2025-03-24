import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Image src="/favicon.ico" alt="Logo" width={64} height={64} />
      <h1>intro</h1>
    </main>
  );
}
