"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setMessage("");

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(
        mode === "login"
          ? "تم تسجيل الدخول بنجاح"
          : "تم إنشاء الحساب. راجع بريدك الإلكتروني إذا طُلب منك التأكيد."
      );
    }

    setLoading(false);
  }

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-7">
        <h1 className="text-3xl font-black">
          DARK <span className="text-cyan-400">STORE</span>
        </h1>

        <p className="mt-2 text-zinc-400">
          {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
        </p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-7 w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
          placeholder="البريد الإلكتروني"
          type="email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
          placeholder="كلمة المرور"
          type="password"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-cyan-400 py-4 font-black text-black disabled:opacity-50"
        >
          {loading
            ? "جاري التنفيذ..."
            : mode === "login"
              ? "دخول"
              : "إنشاء الحساب"}
        </button>

        {message && (
          <p className="mt-4 rounded-xl bg-white/5 p-3 text-sm text-zinc-300">
            {message}
          </p>
        )}

        <button
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMessage("");
          }}
          className="mt-5 w-full text-sm text-cyan-400"
        >
          {mode === "login"
            ? "ليس لديك حساب؟ إنشاء حساب"
            : "لديك حساب بالفعل؟ تسجيل الدخول"}
        </button>

        <Link href="/" className="mt-5 block text-center text-zinc-500">
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
