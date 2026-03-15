import type { GetExperienceProfileQuery } from '@/graphql/generated'

type ExperienceData = NonNullable<
  GetExperienceProfileQuery['experienceProfile']
>

export type ExperienceRole = ExperienceData['roles'][number]
export type ExperienceRoleProject = ExperienceRole['projects'][number]
export type ExperienceProfile = ExperienceData['profile']
