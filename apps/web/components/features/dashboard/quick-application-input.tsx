'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Link2, Lock } from 'lucide-react'

import {
  Card,
  Form,
  InputWrapper,
  IconHolder,
  StyledInput,
  DisabledBadge,
  SubmitButton,
  ArrowIcon,
} from './quick-application-input.styles'

export function QuickApplicationInput({ disabled }: { disabled?: boolean }) {
  const [url, setUrl] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim() && !disabled) {
      // Store the URL in session storage or pass as URL param
      sessionStorage.setItem('jobUrl', url)
      router.push('/dashboard/new-application')
    }
  }

  return (
    <Card interactive={!disabled} size="sm" $disabled={disabled}>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <IconHolder>
            <Link2 size={16} />
          </IconHolder>
          <StyledInput
            type="url"
            placeholder="Paste LinkedIn job URL here to start..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            $disabled={disabled}
            disabled={disabled}
          />
        </InputWrapper>
        {disabled ? (
          <DisabledBadge>
            <Lock size={16} />
            <span>Complete profile to unlock</span>
          </DisabledBadge>
        ) : (
          <SubmitButton type="submit" size="lg" disabled={!url.trim()}>
            Start Application
            <ArrowIcon />
          </SubmitButton>
        )}
      </Form>
    </Card>
  )
}
