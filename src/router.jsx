import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/shared/AppLayout'

// Auth
import LoginPage    from '@/features/auth/pages/LoginPage'
import OnboardingPage from '@/features/auth/pages/OnboardingPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import InvestorLoginPage from '@/features/auth/pages/InvestorLoginPage'
import InvestorOnboardingPage from '@/features/auth/pages/InvestorOnboardingPage'
import InvestorRegisterPage from '@/features/auth/pages/InvestorRegisterPage'

// Public
import LandingPage  from '@/features/public/pages/LandingPage'
import CaraKerjaPage from '@/features/public/pages/CaraKerjaPage'
import InvestorDirectoryPage from '@/features/public/pages/InvestorDirectoryPage'
import InvestorDetailPage from '@/features/public/pages/InvestorDetailPage'
import UmkmDirectoryPage from '@/features/public/pages/UmkmDirectoryPage'
import PassportDetailPage from '@/features/public/pages/PassportDetailPage'

// Investor
import InvestorLayout from '@/features/investor/components/InvestorLayout'
import InvestorDashboardPage from '@/features/investor/pages/InvestorDashboardPage'
import InvestorProposalPage from '@/features/investor/pages/InvestorProposalPage'
import InvestorProposalDetailPage from '@/features/investor/pages/InvestorProposalDetailPage'
import InvestorProposalBaruPage from '@/features/investor/pages/InvestorProposalBaruPage'
import InvestorProfilPage from '@/features/investor/pages/InvestorProfilPage'
import InvestorDisimpanPage from '@/features/investor/pages/InvestorDisimpanPage'
import UmkmDashboard from '@/features/umkm/pages/DashboardPage'
import UmkmEvidenceVault from '@/features/umkm/pages/EvidenceVaultPage'
import UmkmEvidenceIndicatorDetail from '@/features/umkm/pages/EvidenceIndicatorDetailPage'
import UmkmPassport from '@/features/umkm/pages/PassportPage'
import UmkmProfile   from '@/features/umkm/pages/ProfilePage'
import UmkmProposal  from '@/features/umkm/pages/ProposalPage'
import UmkmProposalBaru from '@/features/umkm/pages/ProposalBaruPage'
import UmkmProposalDetail from '@/features/umkm/pages/UmkmProposalDetailPage'

// Auditor
import AuditorDashboard from '@/features/auditor/pages/DashboardPage'
import AuditorReview    from '@/features/auditor/pages/ReviewPage'
import AuditorHistory   from '@/features/auditor/pages/HistoryPage'

// Admin
import AdminDashboard from '@/features/admin/pages/DashboardPage'
import AdminUsers     from '@/features/admin/pages/UsersPage'
import AdminSettings  from '@/features/admin/pages/SettingsPage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public — no sidebar */}
        <Route path="/"         element={<LandingPage />} />
        <Route path="/cara-kerja" element={<CaraKerjaPage />} />
        <Route path="/investor" element={<InvestorDirectoryPage />} />
        <Route path="/investor/:profileId" element={<InvestorDetailPage />} />

        {/* Investor dashboard — with sidebar */}
        <Route path="/direktori" element={<UmkmDirectoryPage />} />
        <Route path="/passport/:profileId" element={<PassportDetailPage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/investor/login" element={<InvestorLoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/investor/register" element={<InvestorRegisterPage />} />
        <Route path="/investor/onboarding" element={<InvestorOnboardingPage />} />

        <Route path="/investor/dashboard" element={<InvestorLayout />}>
          <Route index element={<InvestorDashboardPage />} />
        </Route>
        <Route path="/investor/proposal" element={<InvestorLayout />}>
          <Route index element={<InvestorProposalPage />} />
          <Route path="baru" element={<InvestorProposalBaruPage />} />
          <Route path=":proposalId" element={<InvestorProposalDetailPage />} />
        </Route>
        <Route path="/investor/profil" element={<InvestorLayout />}>
          <Route index element={<InvestorProfilPage />} />
        </Route>
        <Route path="/investor/disimpan" element={<InvestorLayout />}>
          <Route index element={<InvestorDisimpanPage />} />
        </Route>

        {/* UMKM — with sidebar */}
        <Route path="/umkm" element={<AppLayout><UmkmDashboard /></AppLayout>} />
        <Route path="/umkm/evidence" element={<AppLayout><UmkmEvidenceVault /></AppLayout>} />
        <Route path="/umkm/evidence/:indicatorCode" element={<AppLayout><UmkmEvidenceIndicatorDetail /></AppLayout>} />
        <Route path="/umkm/passport" element={<AppLayout><UmkmPassport /></AppLayout>} />
        <Route path="/umkm/claim" element={<Navigate to="/umkm/passport" replace />} />
        <Route path="/umkm/profile" element={<AppLayout><UmkmProfile /></AppLayout>} />
        <Route path="/umkm/proposal" element={<AppLayout><UmkmProposal /></AppLayout>} />
        <Route path="/umkm/proposal/baru" element={<AppLayout><UmkmProposalBaru /></AppLayout>} />
        <Route path="/umkm/proposal/:proposalId" element={<AppLayout><UmkmProposalDetail /></AppLayout>} />

        {/* Auditor — with sidebar */}
        <Route path="/auditor"         element={<AppLayout><AuditorDashboard /></AppLayout>} />
        <Route path="/auditor/review"  element={<AppLayout><AuditorReview /></AppLayout>} />
        <Route path="/auditor/history" element={<AppLayout><AuditorHistory /></AppLayout>} />

        {/* Admin — with sidebar */}
        <Route path="/admin"          element={<AppLayout><AdminDashboard /></AppLayout>} />
        <Route path="/admin/users"    element={<AppLayout><AdminUsers /></AppLayout>} />
        <Route path="/admin/settings" element={<AppLayout><AdminSettings /></AppLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
