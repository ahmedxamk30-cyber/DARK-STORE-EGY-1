"use client";

import { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  if (!login) {
    return (
      <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#050505] p-5 text-white">
        <div className="w-full max-w-md rounded-3xl border border-yellow-400/20 bg-white/5 p-7">
          <h1 className="text-3xl font-black text-yellow-400">DARK ADMIN</h1>
          <p className="mt-2 text-zinc-400">لوحة تحكم المتجر</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="كلمة مرور الإدارة"
            className="mt-7 w-full rounded-xl border border-white/10 bg-black p-4"
          />
          <button
            onClick={() => setLogin(true)}
            className="mt-4 w-full rounded-xl bg-yellow-400 py-4 font-black text-black"
          >
            دخول الإدارة
          </button>
        </div>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] p-5 text-white">
      <h1 className="text-3xl font-black text-yellow-400">DARK ADMIN</h1>

      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["💰", "المبيعات", "0 ج"],
          ["📈", "الأرباح", "0 ج"],
          ["🧾", "الطلبات", "0"],
          ["👥", "المستخدمين", "0"],
        ].map(([icon, title, value]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-2xl">{icon}</div>
            <p className="mt-3 text-zinc-400">{title}</p>
            <strong className="text-2xl">{value}</strong>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["إدارة المنتجات", "إدارة الطلبات", "إدارة المستخدمين", "المحفظة والإيداعات", "العروض والأسعار", "إعدادات API"].map((x) => (
          <button key={x} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-right font-bold hover:border-yellow-400/50">
            {x}
          </button>
        ))}
      </div>
    </main>
  );
}
