'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Card,
  Form,
  InputWrapper,
  IconHolder,
  LinkIcon,
  LockIcon,
  StyledInput,
  DisabledBadge,
  SubmitButton,
  ArrowIcon,
} from './QuickApplicationInput.styles'

interface QuickApplicationInputProps {
  disabled?: boolean
}

export function QuickApplicationInput({
  disabled,
}: QuickApplicationInputProps) {
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
            <LinkIcon />
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
            <LockIcon />
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
