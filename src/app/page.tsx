import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="flex gap-4 items-center flex-col sm:flex-row w-full h-full">
        <Link href="/projects">
          <p className="text-center">go</p>
        </Link>
      </div>
    </main>

  );
}
