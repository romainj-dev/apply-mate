'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCategorizedSkills, type SkillCategory } from '../utils'
import { GlobalUniverse } from './global-universe/GlobalUniverse'
import { CategoryDetails } from './category-details/CategoryDetails'
import {
  AiBadge,
  BackButton,
  BackChevronIcon,
  CardTitle,
  ColorDot,
  DotsRow,
  Footer,
  FooterText,
  HeaderLeft,
  HeaderRow,
  OrbitIcon,
  SkillsCard,
  SkillsContent,
  SkillsHeader,
  SubTitle,
} from './TechnicalSkills.styles'

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
