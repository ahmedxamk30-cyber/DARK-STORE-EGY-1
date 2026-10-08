"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-7">
        <h1 className="text-3xl font-black">
          DARK <span className="text-cyan-400">STORE</span>
        </h1>
        <p className="mt-2 text-zinc-400">تسجيل الدخول</p>

        <input className="mt-7 w-full rounded-xl border border-white/10 bg-black p-4 outline-none" placeholder="البريد الإلكتروني" type="email" />
        <input className="mt-3 w-full rounded-xl border border-white/10 bg-black p-4 outline-none" placeholder="كلمة المرور" type="password" />

        <button
          onClick={() => setLoading(true)}
          className="mt-5 w-full rounded-xl bg-cyan-400 py-4 font-black text-black"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>

        <Link href="/" className="mt-5 block text-center text-zinc-400">
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
