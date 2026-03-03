# Tailwind -> styled-components Worked Examples

Use this file only when you need a concrete transformation example.

## Example: DashboardHeader

### Before (`header.tsx` with Tailwind)

```tsx
export function DashboardHeader({
  title,
  subtitle,
}: {
  title: string | React.ReactNode
  subtitle: string
}) {
  return (
    <div className="mb-8 relative">
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>
      </div>
    </div>
  )
}
```

### After (`header.styles.ts`)

```tsx
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.space.xl};
`

export const Inner = styled.div`
  position: relative;
  z-index: 10;
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  max-width: 42rem; /* layout constraint, no theme token */
`
```

### After (`header.tsx`)

```tsx
import { Wrapper, Inner, Title, Subtitle } from './header.styles'

export function DashboardHeader({
  title,
  subtitle,
}: {
  title: string | React.ReactNode
  subtitle: string
}) {
  return (
    <Wrapper>
      <Inner>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Inner>
    </Wrapper>
  )
}
```
