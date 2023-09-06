import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
