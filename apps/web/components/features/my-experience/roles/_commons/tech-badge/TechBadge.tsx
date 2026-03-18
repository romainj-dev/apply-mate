import { getTechLabel } from '@/components/features/my-experience/roles/tech-catalog'
import {
  parseTechStack,
  RawTechStackItem,
  TechStackItem,
} from '@/types/tech-stack'
import { Container, TechBadge } from './TechBadge.styles'

interface TechBadgeItemProps {
  item: TechStackItem
}

export function TechBadgeItem({ item }: TechBadgeItemProps) {
  return <TechBadge variant="secondary">{getTechLabel(item)}</TechBadge>
}

interface TechBadgeProps {
  techStack: RawTechStackItem[]
}

export function TechBadgeRow({ techStack }: TechBadgeProps) {
  const parsedTechStack = parseTechStack(techStack)

  return (
    <Container>
      {parsedTechStack.map((item) => (
        <TechBadgeItem
          key={item.value === 'other' ? item.customLabel : item.value}
          item={item}
        />
      ))}
    </Container>
  )
}
