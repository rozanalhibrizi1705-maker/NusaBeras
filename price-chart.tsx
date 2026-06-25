// Halaman Dashboard Pemerintah (terproteksi).
// DashboardShell menangani proteksi rute & sidebar; DashboardContent berisi
// peta interaktif dan rekomendasi kebijakan.
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardContent />
    </DashboardShell>
  )
}
