import Link from "next/link";

export default function Orders() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white p-5">
      <Link href="/" className="text-cyan-400">← الرئيسية</Link>
      <h1 className="mt-8 text-3xl font-black">طلباتي</h1>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <div className="text-5xl">🧾</div>
        <p className="mt-4 text-zinc-400">لا توجد طلبات حتى الآن</p>
      </div>
    </main>
  );
}
