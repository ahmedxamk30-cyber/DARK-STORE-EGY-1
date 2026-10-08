import Link from "next/link";

const products = [
  { name: "Free Fire", desc: "جواهر وشحن فري فاير", icon: "🔥" },
  { name: "PUBG Mobile", desc: "شحن UC", icon: "🎮" },
  { name: "Call of Duty", desc: "شحن CP", icon: "⚡" },
];

export default function Products() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white p-5">
      <Link href="/" className="text-cyan-400">← الرئيسية</Link>
      <h1 className="mt-8 text-3xl font-black">المنتجات</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {products.map((p) => (
          <div key={p.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-4xl">{p.icon}</div>
            <h2 className="mt-4 text-xl font-bold">{p.name}</h2>
            <p className="mt-2 text-zinc-400">{p.desc}</p>
            <button className="mt-5 w-full rounded-xl bg-cyan-400 py-3 font-bold text-black">
              عرض المنتجات
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
