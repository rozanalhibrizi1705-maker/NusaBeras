"use client"

// ============================================================================
// Halaman Login Pemerintah.
// Memakai kredensial dummy (admin / admin123). Setelah berhasil, pengguna
// otomatis diarahkan ke /dashboard.
// ============================================================================

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, ready } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Jika sudah login, langsung arahkan ke dashboard.
  useEffect(() => {
    if (ready && isAuthenticated) router.replace("/dashboard")
  }, [ready, isAuthenticated, router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulasi proses autentikasi singkat.
    setTimeout(() => {
      const ok = login(username, password)
      if (ok) {
        router.replace("/dashboard")
      } else {
        setError("Username atau password salah. Coba lagi.")
        setLoading(false)
      }
    }, 600)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        {/* Tombol kembali */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Halaman Utama
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Logo & judul */}
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="h-6 w-6" />
            </span>
            <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground">
              Login Pemerintah
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Masuk untuk mengakses Dashboard Rekomendasi Kebijakan
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={
                    showPass ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Pesan error */}
            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="mt-1 w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Masuk
                </>
              )}
            </Button>
          </form>

          {/* Petunjuk kredensial demo */}
          <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/50 px-4 py-3 text-center text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Kredensial Demo</span>
            <br />
            Username: <code className="font-mono text-foreground">admin</code>{" "}
            &nbsp;·&nbsp; Password:{" "}
            <code className="font-mono text-foreground">admin123</code>
          </div>
        </div>
      </div>
    </main>
  )
}
