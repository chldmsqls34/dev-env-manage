import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Link href="/projects">
          <p>로그인</p>
        </Link>
      </div>
    </main>

  );
}
