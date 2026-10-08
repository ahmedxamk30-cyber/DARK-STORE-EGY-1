"use client";

import { useState } from "react";

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  if (!loggedIn) {
    return (
      <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#030303] p-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-yellow-400/20 bg-white/[0.04] p-8">
          <div className="mb-6">
            <div className="text-sm text-yellow-400">DARK STORE</div>
            <h1 className="mt-2 text-3xl font-black">لوحة التحكم</h1>
            <p className="mt-2 text-gray-500">منطقة الإدارة محمية</p>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة مرور الإدارة"
            className="w-full rounded-xl border border-white/10 bg-black p-4 outline-none focus:border-yellow-400"
          />

          <button
            onClick={() => setLoggedIn(true)}
            className="mt-4 w-full rounded-xl bg-yellow-400 p-4 font-black text-black"
          >
            دخول لوحة التحكم
          </button>
        </div>
      </main>
    );
  }

  const cards = [
    ["المبيعات", "0 ج"],
    ["الأرباح", "0 ج"],
    ["الطلبات", "0"],
    ["المستخدمون", "0"],
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-[#030303] text-white">
      <header className="border-b border-white/10 bg-black/60 p-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <div className="text-xl font-black">
              DARK <span className="text-yellow-400">CONTROL</span>
            </div>
            <div className="text-xs text-gray-500">إدارة DARK STORE</div>
          </div>

          <button
            onClick={() => setLoggedIn(false)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300"
          >
            تسجيل الخروج
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-5">
        <h1 className="text-3xl font-black">لوحة التحكم</h1>
        <p className="mt-2 text-gray-500">إدارة المتجر والطلبات والأرباح.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([title, value]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-sm text-gray-500">{title}</p>
              <p className="mt-3 text-2xl font-black text-yellow-400">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "إدارة المنتجات",
            "إدارة الطلبات",
            "إدارة المستخدمين",
            "المحفظة والإيداعات",
            "العروض والأسعار",
            "إعدادات API",
          ].map((item) => (
            <button
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-right font-bold transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
