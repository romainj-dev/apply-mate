'use client'

import {
  Bottom,
  BottomContent,
  BrandColumn,
  BrandIcon,
  BrandLink,
  BrandName,
  BrandSparkles,
  Column,
  ColumnTitle,
  Container,
  Copyright,
  Description,
  FooterLink,
  FooterRoot,
  LinkList,
  SocialLinks,
  TopGrid,
} from './footer.styles'

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Security', href: '#security' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'GDPR', href: '/gdpr' },
  ],
}

export function Footer() {
  return (
    <FooterRoot>
      <Container>
        <TopGrid>
          <BrandColumn>
            <BrandLink href="/">
              <BrandIcon>
                <BrandSparkles />
              </BrandIcon>
              <BrandName>ApplyMate</BrandName>
            </BrandLink>
            <Description>
              Smarter job applications powered by AI. Land your dream job with
              tailored resumes and cover letters.
            </Description>
          </BrandColumn>

          <Column>
            <ColumnTitle>Product</ColumnTitle>
            <LinkList>
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>Company</ColumnTitle>
            <LinkList>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>Legal</ColumnTitle>
            <LinkList>
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </LinkList>
          </Column>
        </TopGrid>

        <Bottom>
          <BottomContent>
            <Copyright>© 2026 ApplyMate. All rights reserved.</Copyright>
            <SocialLinks>
              <FooterLink href="#">Twitter</FooterLink>
              <FooterLink href="#">LinkedIn</FooterLink>
              <FooterLink href="#">GitHub</FooterLink>
            </SocialLinks>
          </BottomContent>
        </Bottom>
      </Container>
    </FooterRoot>
  )
}
