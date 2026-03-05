'use client'

import type { SkillCategory } from '../../utils'
import {
  AmbientCircleLg,
  AmbientCircleSm,
  BounceDot,
  BubbleInner,
  BubbleName,
  BubbleWrapper,
  BubblesContainer,
  GridPattern,
  HoverDots,
  InnerGlow,
  ScorePill,
  ScoreText,
  UniverseWrapper,
} from './GlobalUniverse.styles'

interface GlobalUniverseProps {
  categories: SkillCategory[]
  onSelect: (category: SkillCategory) => void
}

export function GlobalUniverse({ categories, onSelect }: GlobalUniverseProps) {
  return (
    <UniverseWrapper>
      <GridPattern />

      <AmbientCircleSm />
      <AmbientCircleLg />

      <BubblesContainer>
        {categories.map((category, idx) => (
          <BubbleWrapper
            key={category.id}
            layoutId={`bubble-${category.id}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.5,
              },
            }}
            whileHover={{ scale: 1.1, zIndex: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(category)}
          >
            <BubbleInner $color={category.color}>
              <InnerGlow />
              <BubbleName>{category.name}</BubbleName>
              <ScorePill>
                <ScoreText>{category.totalScore}</ScoreText>
              </ScorePill>
              <HoverDots>
                <BounceDot $delay="0ms" />
                <BounceDot $delay="150ms" />
                <BounceDot $delay="300ms" />
              </HoverDots>
            </BubbleInner>
          </BubbleWrapper>
        ))}
      </BubblesContainer>
    </UniverseWrapper>
  )
}
