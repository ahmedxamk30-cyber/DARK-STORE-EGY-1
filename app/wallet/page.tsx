import Link from "next/link";

export default function Wallet() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white p-5">
      <Link href="/" className="text-cyan-400">← الرئيسية</Link>
      <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-cyan-400/20 bg-white/5 p-8">
        <p className="text-zinc-400">رصيد المحفظة</p>
        <h1 className="mt-2 text-5xl font-black">0.00 ج</h1>
        <button className="mt-8 w-full rounded-xl bg-cyan-400 py-4 font-black text-black">
          شحن المحفظة
        </button>
      </div>
    </main>
  );
}
