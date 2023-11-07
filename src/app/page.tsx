import Link from "next/link"

export default function Home() {
  return (
    <main className="relative flex flex-col gap-6 place-items-center">

      <Link className="block backdrop-blur-sm px-12 py-6 text-center " href="https://wooten-tattoo.vercel.app/">Tattooing</Link>
      <Link className="block backdrop-blur-sm px-12 py-6 text-center " href="https://instagram.com/b.e.wooten/">Instagram</Link>

    </main>
  )
}