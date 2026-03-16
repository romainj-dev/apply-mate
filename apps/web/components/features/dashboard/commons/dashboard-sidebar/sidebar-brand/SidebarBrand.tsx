'use client'

import {
  BrandIcon,
  BrandIconText,
  BrandLink,
  BrandSection,
  BrandSubtitle,
  BrandText,
  BrandTitle,
} from './SidebarBrand.styles'

interface SidebarBrandProps {
  collapsed?: boolean
}

export function SidebarBrand({ collapsed = false }: SidebarBrandProps) {
  return (
    <BrandSection $collapsed={collapsed}>
      <BrandLink href="/" $collapsed={collapsed}>
        <BrandIcon>
          <BrandIconText>A</BrandIconText>
        </BrandIcon>
        {!collapsed && (
          <BrandText>
            <BrandTitle>ApplyMate</BrandTitle>
            <BrandSubtitle>Workspace</BrandSubtitle>
          </BrandText>
        )}
      </BrandLink>
    </BrandSection>
  )
}
