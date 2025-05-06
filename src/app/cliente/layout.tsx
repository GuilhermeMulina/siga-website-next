import type React from 'react';
import type { Metadata } from 'next';
import ClientNavbar from '@/components/client-navbar';
import ClientSidebar from '@/components/client-sidebar';


export const metadata: Metadata = {
  title: 'Área do Cliente | Siga Imóveis Sob Medida',
  description: 'Gerencie seus imóveis, contratos e pagamentos',
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ClientNavbar />
      <div className="flex-grow flex">
        <div className="hidden lg:block">
          <ClientSidebar />
        </div>
        <main role="main" aria-label="Área principal do cliente" className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );}