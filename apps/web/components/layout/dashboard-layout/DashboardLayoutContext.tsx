'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export interface PageSection {
  id: string
  label: string
}

interface DashboardLayoutContextValue {
  collapsed: boolean
  mobileOpen: boolean
  sections: PageSection[]
  onToggleCollapse: () => void
  onOpenMobile: () => void
  onCloseMobile: () => void
  registerSections: (sections: PageSection[]) => () => void
}

const DashboardLayoutContext = createContext<DashboardLayoutContextValue>({
  collapsed: false,
  mobileOpen: false,
  sections: [],
  onToggleCollapse: () => {},
  onOpenMobile: () => {},
  onCloseMobile: () => {},
  registerSections: () => () => {},
})

export function useDashboardLayout(): DashboardLayoutContextValue {
  return useContext(DashboardLayoutContext)
}

interface DashboardLayoutProviderProps {
  children: ReactNode
}

export function DashboardLayoutProvider({
  children,
}: DashboardLayoutProviderProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sections, setSections] = useState<PageSection[]>([])

  function handleToggleCollapse(): void {
    setCollapsed((prev) => !prev)
  }

  function handleOpenMobile(): void {
    setMobileOpen(true)
  }

  function handleCloseMobile(): void {
    setMobileOpen(false)
  }

  const registerSections = useCallback(
    (newSections: PageSection[]): (() => void) => {
      setSections(newSections)
      return () => setSections([])
    },
    []
  )

  const value: DashboardLayoutContextValue = {
    collapsed,
    mobileOpen,
    sections,
    onToggleCollapse: handleToggleCollapse,
    onOpenMobile: handleOpenMobile,
    onCloseMobile: handleCloseMobile,
    registerSections,
  }

  return (
    <DashboardLayoutContext.Provider value={value}>
      {children}
    </DashboardLayoutContext.Provider>
  )
}
