"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Deposit = {
  id: string;
  amount: number;
  method: string | null;
  reference: string | null;
  status: string;
  created_at: string;
};

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [depositPhone, setDepositPhone] = useState("01153110205");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function loadWallet() {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("سجّل الدخول أولًا لاستخدام المحفظة.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("balance")
      .eq("id", user.id)
      .single();

    if (profile) {
      setBalance(Number(profile.balance || 0));
    }

    const { data: settings } = await supabase
      .from("site_settings")
      .select("deposit_phone")
      .limit(1)
      .single();

    if (settings?.deposit_phone) {
      setDepositPhone(settings.deposit_phone);
    }

    const { data: depositData } = await supabase
      .from("deposits")
      .select("id, amount, method, reference, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (depositData) {
      setDeposits(depositData);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadWallet();
  }, []);

  async function submitDeposit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setMessage("اكتب مبلغًا صحيحًا.");
      return;
    }

    if (!reference.trim()) {
      setMessage("اكتب رقم الهاتف الذي تم التحويل منه.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("يجب تسجيل الدخول أولًا.");
      return;
    }

    setSending(true);

    const { error } = await supabase.from("deposits").insert({
      user_id: user.id,
      amount: numericAmount,
      method: "تحويل نقدي",
      reference: reference.trim(),
      status: "pending",
    });

    if (error) {
      setMessage("تعذر إرسال الطلب. تأكد من تسجيل الدخول وحاول مرة أخرى.");
      setSending(false);
      return;
    }

    setAmount("");
    setReference("");
    setMessage("تم إرسال طلب الشحن. سيتم مراجعته وإضافة الرصيد بعد التأكد من التحويل.");
    await loadWallet();
    setSending(false);
  }

  function statusText(status: string) {
    if (status === "approved") return "تم القبول";
    if (status === "rejected") return "مرفوض";
    return "قيد المراجعة";
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] px-4 py-6 text-white">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300">
          ← الرئيسية
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/[0.04] shadow-2xl">
          <div className="border-b border-white/10 bg-gradient-to-l from-cyan-400/10 to-yellow-400/10 p-7">
            <p className="text-sm text-zinc-400">رصيد المحفظة</p>

            <h1 className="mt-2 text-5xl font-black">
              {loading ? "..." : `${balance.toFixed(2)} ج`}
            </h1>
          </div>

          <div className="p-6">
            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5">
              <p className="text-sm text-zinc-400">رقم التحويل لشحن الرصيد</p>
              <p className="mt-2 text-2xl font-black text-yellow-300">
                {depositPhone}
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                حوّل المبلغ أولًا، ثم سجّل بيانات التحويل في النموذج بالأسفل.
              </p>
            </div>

            <form onSubmit={submitDeposit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  المبلغ بالجنيه المصري
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="مثال: 100"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  رقم الهاتف الذي تم التحويل منه
                </label>
                <input
                  type="tel"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-cyan-400"
                />
              </div>

              {message && (
                <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-cyan-200">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-xl bg-cyan-400 py-4 font-black text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? "جاري إرسال الطلب..." : "إرسال طلب شحن"}
              </button>
            </form>
          </div>
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-black">طلبات الشحن السابقة</h2>

          {deposits.length === 0 ? (
            <p className="mt-5 text-sm text-zinc-500">
              لا توجد طلبات شحن حتى الآن.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {deposits.map((deposit) => (
                <div
                  key={deposit.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <div>
                    <p className="font-bold">{Number(deposit.amount).toFixed(2)} ج</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {new Date(deposit.created_at).toLocaleString("ar-EG")}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      deposit.status === "approved"
                        ? "bg-green-400/10 text-green-300"
                        : deposit.status === "rejected"
                          ? "bg-red-400/10 text-red-300"
                          : "bg-yellow-400/10 text-yellow-300"
                    }`}
                  >
                    {statusText(deposit.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
