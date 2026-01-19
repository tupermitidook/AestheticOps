'use client'

import * as React from 'react'
import { GlobalSearch } from '@/components/dashboard/global-search'
import { AIAgent } from '@/components/dashboard/ai-agent'

export default function DashboardLayout({
      children,
}: {
      children: React.ReactNode
}) {
      return (
            <div className="relative min-h-screen">
                  {children}
                  <GlobalSearch />
                  <AIAgent />
            </div>
      )
}
