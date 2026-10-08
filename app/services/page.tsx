import Link from "next/link";

const services = [
  ["TikTok", "متابعين • لايكات • مشاهدات"],
  ["Facebook", "متابعين • تفاعلات • مشاهدات"],
  ["WhatsApp", "متابعين • تفاعلات • خدمات"],
];

export default function Services() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white p-5">
      <Link href="/" className="text-cyan-400">← الرئيسية</Link>
      <h1 className="mt-8 text-3xl font-black">الخدمات</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {services.map(([name, desc]) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-black">{name}</h2>
            <p className="mt-3 text-zinc-400">{desc}</p>
            <button className="mt-5 w-full rounded-xl border border-cyan-400/50 py-3 font-bold">
              اختيار الخدمة
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
