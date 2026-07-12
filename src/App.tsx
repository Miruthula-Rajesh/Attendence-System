import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { MarketingLayout } from './components/Layout/MarketingLayout';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { ToastContainer } from './components/ui/Notification';
import { CommandPalette } from './components/CommandPalette';
import { SmoothScroll } from './components/SmoothScroll';

// Pages
import { LandingPage, FeaturesPage, PricingPage, ContactPage, AboutUsPage, FAQPage } from './pages/marketing/MarketingPages';
import { LoginPage, ForgotPassword, ResetPassword } from './pages/auth/AuthPages';
import { SuperAdminPages } from './pages/super-admin/SuperAdminPages';
import { SchoolAdminPages } from './pages/school-admin/SchoolAdminPages';
import { TeacherPages } from './pages/teacher/TeacherPages';

const AppContent: React.FC = () => {
  const { currentPage, currentTab, authSubPage, currentRole } = useAppState();

  // --- 1. MARKETING ROUTING ---
  if (currentPage === 'marketing') {
    const renderMarketingContent = () => {
      switch (currentTab) {
        case 'home':
          return <LandingPage />;
        case 'features':
          return <FeaturesPage />;
        case 'pricing':
          return <PricingPage />;
        case 'about':
          return <AboutUsPage />;
        case 'contact':
          return <ContactPage />;
        case 'faq':
          return <FAQPage />;
        default:
          return <LandingPage />;
      }
    };

    return (
      <MarketingLayout>
        {renderMarketingContent()}
      </MarketingLayout>
    );
  }

  // --- 2. AUTHENTICATION ROUTING ---
  if (currentPage === 'auth') {
    switch (authSubPage) {
      case 'login':
        return <LoginPage />;
      case 'forgot':
        return <ForgotPassword />;
      case 'reset':
        return <ResetPassword />;
      default:
        return <LoginPage />;
    }
  }

  // --- 3. DASHBOARD WORKSPACE ROUTING ---
  if (currentPage === 'dashboard') {
    const renderDashboardContent = () => {
      switch (currentRole) {
        case 'super-admin':
          return <SuperAdminPages />;
        case 'school-admin':
          return <SchoolAdminPages />;
        case 'teacher':
          return <TeacherPages />;
        default:
          return <TeacherPages />;
      }
    };

    return (
      <DashboardLayout>
        {renderDashboardContent()}
      </DashboardLayout>
    );
  }

  return <LoginPage />;
};

export const App: React.FC = () => {
  return (
    <AppStateProvider>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
      <ToastContainer />
      <CommandPalette />
    </AppStateProvider>
  );
};

export default App;
