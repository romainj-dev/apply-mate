'use client'

import type { SkillCategory } from '../../utils'
import {
  CategoryColorDot,
  CategoryContainer,
  CategoryHeader,
  CategoryHeaderLeft,
  CategoryTitle,
  EmptyState,
  EmptyStateText,
  FloatingDot,
  MonoBadge,
  ProgressFill,
  ProgressTrack,
  SkillCard,
  SkillHeader,
  SkillItem,
  SkillName,
  SkillScore,
  SkillsGrid,
} from './CategoryDetails.styles'

interface CategoryDetailsProps {
  category: SkillCategory
}

export function CategoryDetails({ category }: CategoryDetailsProps) {
  return (
    <CategoryContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <CategoryHeader>
        <CategoryHeaderLeft>
          <CategoryColorDot $color={category.color} />
          <CategoryTitle>{category.name} Skills</CategoryTitle>
        </CategoryHeaderLeft>
        <MonoBadge variant="secondary">Total: {category.totalScore}</MonoBadge>
      </CategoryHeader>

      <SkillsGrid>
        {category.skills.map((skill, idx) => (
          <SkillItem
            key={skill.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <SkillCard>
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <SkillScore>{skill.score}</SkillScore>
              </SkillHeader>

              <ProgressTrack>
                <ProgressFill
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (skill.score / category.totalScore) * 300)}%`,
                  }}
                  $color={category.color}
                />
              </ProgressTrack>
            </SkillCard>

            {idx % 3 === 0 && (
              <FloatingDot
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                $color={category.color}
              />
            )}
          </SkillItem>
        ))}
      </SkillsGrid>

      {category.skills.length === 0 && (
        <EmptyState>
          <EmptyStateText>No specific skills extracted yet</EmptyStateText>
        </EmptyState>
      )}
    </CategoryContainer>
  )
}
