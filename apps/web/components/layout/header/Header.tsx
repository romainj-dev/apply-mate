'use client'

import type { ReactNode } from 'react'
import {
  BrandIcon,
  BrandLink,
  BrandName,
  BrandSparkles,
  Container,
  Content,
  HeaderRoot,
  Nav,
  NavLink,
  Actions,
} from './Header.styles'

interface HeaderProps {
  authSlot: ReactNode
}

export function Header({ authSlot }: HeaderProps) {
  return (
    <HeaderRoot>
      <Container>
        <Content>
          <BrandLink href="/">
            <BrandIcon>
              <BrandSparkles />
            </BrandIcon>
            <BrandName>ApplyMate</BrandName>
          </BrandLink>

          <Nav>
            <NavLink href="#how-it-works">How it works</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
          </Nav>

          <Actions>{authSlot}</Actions>
        </Content>
      </Container>
    </HeaderRoot>
  )
}
