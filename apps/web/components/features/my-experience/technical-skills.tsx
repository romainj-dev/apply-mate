'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCategorizedSkills, SkillCategory } from './utils'
import {
  AiBadge,
  AmbientCircleLg,
  AmbientCircleSm,
  BackChevronIcon,
  BackButton,
  OrbitIcon,
  BounceDot,
  BubbleInner,
  BubbleName,
  BubbleWrapper,
  BubblesContainer,
  CardTitle,
  CategoryColorDot,
  CategoryContainer,
  CategoryHeader,
  CategoryHeaderLeft,
  CategoryTitle,
  ColorDot,
  DotsRow,
  EmptyState,
  EmptyStateText,
  FloatingDot,
  Footer,
  FooterText,
  GridPattern,
  HeaderLeft,
  HeaderRow,
  HoverDots,
  InnerGlow,
  MonoBadge,
  ProgressFill,
  ProgressTrack,
  ScorePill,
  ScoreText,
  SkillCard,
  SkillHeader,
  SkillItem,
  SkillName,
  SkillScore,
  SkillsCard,
  SkillsContent,
  SkillsGrid,
  SkillsHeader,
  SubTitle,
  UniverseWrapper,
} from './technical-skills.styles'

export function TechnicalSkills() {
  const categories = useMemo(() => getCategorizedSkills(), [])
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory | null>(null)

  return (
    <SkillsCard variant="primary">
      <SkillsHeader>
        <HeaderRow>
          <HeaderLeft>
            <AnimatePresence mode="wait">
              {selectedCategory ? (
                <BackButton
                  key="back"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setSelectedCategory(null)}
                >
                  <BackChevronIcon />
                </BackButton>
              ) : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <OrbitIcon />
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <CardTitle>
                {selectedCategory
                  ? selectedCategory.name
                  : 'Technical Universe'}
              </CardTitle>
              <SubTitle>
                {selectedCategory
                  ? 'Skill Breakdown'
                  : 'Select a domain to explore'}
              </SubTitle>
            </div>
          </HeaderLeft>
          {!selectedCategory && (
            <DotsRow>
              {categories.map((c) => (
                <ColorDot key={c.id} $color={c.color} />
              ))}
            </DotsRow>
          )}
        </HeaderRow>
      </SkillsHeader>

      <SkillsContent>
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <GlobalUniverse
              key="global"
              categories={categories}
              onSelect={setSelectedCategory}
            />
          ) : (
            <CategoryDetails key="details" category={selectedCategory} />
          )}
        </AnimatePresence>
      </SkillsContent>

      <Footer>
        <FooterText>Computed from achievements</FooterText>
        <AiBadge variant="outline">AI-POWERED</AiBadge>
      </Footer>
    </SkillsCard>
  )
}

function GlobalUniverse({
  categories,
  onSelect,
}: {
  categories: SkillCategory[]
  onSelect: (c: SkillCategory) => void
}) {
  return (
    <UniverseWrapper>
      <GridPattern />

      {/* Ambient Background Circles */}
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
            {/* Bubble Style */}
            <BubbleInner $color={category.color}>
              {/* Inner Glow */}
              <InnerGlow />

              <BubbleName>{category.name}</BubbleName>

              {/* Score Pill */}
              <ScorePill>
                <ScoreText>{category.totalScore}</ScoreText>
              </ScorePill>

              {/* Hover Details Hint */}
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

function CategoryDetails({ category }: { category: SkillCategory }) {
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

              {/* Mini Progress Bar */}
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

            {/* Staggered Floating Elements (Visual Decoration) */}
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

      {/* Empty state */}
      {category.skills.length === 0 && (
        <EmptyState>
          <EmptyStateText>No specific skills extracted yet</EmptyStateText>
        </EmptyState>
      )}
    </CategoryContainer>
  )
}
