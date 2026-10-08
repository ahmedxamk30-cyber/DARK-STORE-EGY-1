"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        router.replace("/");
        return;
      }

      setAllowed(true);
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        جاري التحقق من صلاحيات الإدارة...
      </main>
    );
  }

  if (!allowed) return null;

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] p-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-yellow-400">
            DARK ADMIN
          </h1>
          <p className="mt-1 text-zinc-400">لوحة تحكم المتجر</p>
        </div>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.replace("/login");
          }}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm"
        >
          تسجيل الخروج
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["💰", "المبيعات", "0 ج"],
          ["📈", "الأرباح", "0 ج"],
          ["🧾", "الطلبات", "0"],
          ["👥", "المستخدمين", "0"],
        ].map(([icon, title, value]) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="text-2xl">{icon}</div>
            <p className="mt-3 text-zinc-400">{title}</p>
            <strong className="text-2xl">{value}</strong>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
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
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-right font-bold hover:border-yellow-400/50"
          >
            {item}
          </button>
        ))}
      </div>
    </main>
  );
}
