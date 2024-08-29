import Link from 'next/link';
export const runtime = "edge";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/">
        <button className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition">
          Go back home
        </button>
      </Link>
    </div>
  );
}
