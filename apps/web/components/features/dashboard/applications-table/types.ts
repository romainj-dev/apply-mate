export type ApplicationStatus =
  | 'Pending'
  | 'Accepted'
  | 'Applied'
  | 'Interview'
  | 'Rejected'
  | 'Offer'

export interface Application {
  id: string
  company: string
  position: string
  status: ApplicationStatus
  dateApplied: string
  tags: string[]
}
