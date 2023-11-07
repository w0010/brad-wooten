import Link from "next/link"

export default function Home() {
  return (
    <main className="relative flex flex-col gap-6 place-items-center">

      <Link className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" href="https://wooten-tattoo.vercel.app/">Tattooing</Link>
      <Link className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" href="https://instagram.com/b.e.wooten/">Instagram</Link>

    </main>
  )
}