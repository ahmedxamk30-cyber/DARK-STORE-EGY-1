"use client";

import Link from "next/link";

const cards = [
  ["💰", "المحفظة", "/wallet"],
  ["🧾", "طلباتي", "/orders"],
  ["🛍️", "المنتجات", "/products"],
  ["⚡", "الخدمات", "/services"],
];

export default function Dashboard() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white p-5">
      <h1 className="text-3xl font-black">
        DARK <span className="text-cyan-400">STORE</span>
      </h1>
      <p className="mt-2 text-zinc-400">لوحة حسابك</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {cards.map(([icon, title, href]) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/50"
          >
            <div className="text-3xl">{icon}</div>
            <div className="mt-3 font-bold">{title}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
