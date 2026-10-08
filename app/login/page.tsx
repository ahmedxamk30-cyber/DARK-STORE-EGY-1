export default function Login() {
  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#050505] p-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <h1 className="text-3xl font-black">تسجيل الدخول</h1>
        <p className="mt-2 text-gray-500">ادخل إلى حسابك في DARK STORE</p>

        <input
          className="mt-8 w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
          placeholder="رقم الهاتف أو البريد"
        />

        <input
          type="password"
          className="mt-3 w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
          placeholder="كلمة المرور"
        />

        <button className="mt-4 w-full rounded-xl bg-yellow-400 p-4 font-black text-black">
          دخول
        </button>
      </div>
    </main>
  );
}
