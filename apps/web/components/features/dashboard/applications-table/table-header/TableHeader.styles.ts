import styled from 'styled-components'
import { Briefcase, Filter, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const HeaderSection = styled.div`
  padding: ${({ theme }) => theme.spaceCalc(6)};
  border-bottom: 1px solid rgb(255 255 255 / 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaceCalc(6)};

  ${({ theme }) => theme.media.belowMobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spaceCalc(3)};
  }
`

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`

export const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.foreground};
`

export const HeaderBriefcaseIcon = styled(Briefcase)`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`

export const HeaderSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`

export const HeaderActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spaceCalc(3)};

  ${({ theme }) => theme.media.belowMobile} {
    flex-direction: column;
  }
`

export const SearchField = styled.div`
  position: relative;
`

export const SearchIconWrap = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spaceCalc(3)};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.mutedForeground};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  ${SearchField}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const SearchIcon = styled(Search)`
  width: 1rem;
  height: 1rem;
`

export const SearchInput = styled(Input)`
  padding-left: 2.25rem;
  width: 16rem;
  background: rgb(255 255 255 / 0.5);
  border-color: rgb(255 255 255 / 0.2);
  border-radius: ${({ theme }) => theme.radii.xl};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    background: rgb(255 255 255);
  }

  ${({ theme }) => theme.media.belowMobile} {
    width: 100%;
  }
`

export const FilterButton = styled(Button)`
  background: rgb(255 255 255 / 0.5);
  border-color: rgb(255 255 255 / 0.2);
  border-radius: ${({ theme }) => theme.radii.xl};
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgb(255 255 255);
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const FilterIcon = styled(Filter)`
  width: 1rem;
  height: 1rem;
`
