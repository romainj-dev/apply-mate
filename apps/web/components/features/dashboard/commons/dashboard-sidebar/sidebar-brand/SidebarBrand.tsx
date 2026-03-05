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

export function SidebarBrand() {
  return (
    <BrandSection>
      <BrandLink href="/">
        <BrandIcon>
          <BrandIconText>A</BrandIconText>
        </BrandIcon>
        <BrandText>
          <BrandTitle>ApplyMate</BrandTitle>
          <BrandSubtitle>Workspace</BrandSubtitle>
        </BrandText>
      </BrandLink>
    </BrandSection>
  )
}
