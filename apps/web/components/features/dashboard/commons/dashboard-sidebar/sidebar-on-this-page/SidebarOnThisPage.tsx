'use client'

import { useEffect, useState } from 'react'
import { useDashboardLayout } from '@/components/layout/dashboard-layout/DashboardLayout'
import {
  Divider,
  OnThisPageLabel,
  OnThisPageLink,
  OnThisPageList,
  OnThisPageWrapper,
} from './SidebarOnThisPage.styles'

interface SidebarOnThisPageProps {
  collapsed?: boolean
}

export function SidebarOnThisPage({
  collapsed = false,
}: SidebarOnThisPageProps) {
  const { sections, onCloseMobile } = useDashboardLayout()
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (sections.length === 0) return

    const observers: IntersectionObserver[] = []

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      sectionId: string
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(sectionId)
        }
      })
    }

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => observerCallback(entries, id),
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [sections])

  if (sections.length === 0 || collapsed) return null

  return (
    <>
      <Divider />
      <OnThisPageWrapper>
        <OnThisPageLabel>On this page</OnThisPageLabel>
        <OnThisPageList>
          {sections.map(({ id, label }) => (
            <li key={id}>
              <OnThisPageLink
                href={`#${id}`}
                $isActive={activeId === id}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  onCloseMobile()
                  const el = document.getElementById(id)
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    setActiveId(id)
                  }
                }}
              >
                {label}
              </OnThisPageLink>
            </li>
          ))}
        </OnThisPageList>
      </OnThisPageWrapper>
    </>
  )
}
