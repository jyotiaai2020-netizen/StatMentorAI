"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const API_BASE_URL = "http://127.0.0.1:8000";

type LoginResponse = { access_token?: string; token?: string; detail?: string };

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as LoginResponse;
      if (!response.ok) throw new Error(data.detail ?? "Unable to sign in.");
      const jwt = data.access_token ?? data.token;
      if (!jwt) throw new Error("Login succeeded but no JWT was returned.");
      localStorage.setItem("statmentor_token", jwt);
      setSuccess(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unexpected login error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <Link href="/" className="text-sm font-semibold text-indigo-600">← Back to portal</Link>
        <h1 className="mt-6 text-3xl font-bold text-slate-950">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">Use your Lotus & Dorje credentials to access the SaaS portal.</p>
        <label className="mt-8 block text-sm font-semibold text-slate-700" htmlFor="username">Username</label>
        <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-950 outline-none focus:border-indigo-500" />
        <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-950 outline-none focus:border-indigo-500" />
        {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        {success ? <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Signed in successfully. JWT stored locally.</p> : null}
        <button disabled={loading} className="mt-6 w-full rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
      </form>
    </main>
  );
}
