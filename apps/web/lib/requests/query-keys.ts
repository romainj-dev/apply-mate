/**
 * Centralized query key factory for TanStack Query.
 *
 * This ensures consistency between:
 * - SSR prefetch
 * - Client-side queries
 * - Optimistic updates
 * - Cache invalidation
 *
 * @example
 * // In hooks
 * queryClient.setQueryData(queryKeys.plans.details(), data)
 *
 * @example
 * // In prefetch
 * queryClient.prefetchQuery({
 *   queryKey: queryKeys.plans.details(),
 *   queryFn: ...
 * })
 */
export const queryKeys = {
  plans: {
    all: ['plans'] as const,
    details: () => [...queryKeys.plans.all, 'details'] as const,
    pricing: () => [...queryKeys.plans.all, 'pricing'] as const,
  },
  experienceProfile: {
    all: ['experienceProfile'] as const,
    get: () => [...queryKeys.experienceProfile.all, 'get'] as const,
  },
  // userState: {
  //   all: ['userState'] as const,
  //   get: (id: string) => ['userState', 'get', id] as const,
  // },
} as const

/**
 * Recursively extracts all possible query key types from the queryKeys factory.
 *
 * - Functions → extracts return type
 * - Readonly arrays → returns as-is
 * - Objects → recurses into values and unions them
 */
type ExtractQueryKey<T> = T extends (...args: infer _Args) => infer R
  ? R
  : T extends readonly unknown[]
    ? T
    : T extends object
      ? { [K in keyof T]: ExtractQueryKey<T[K]> }[keyof T]
      : never

/**
 * Type representing all possible query keys in the application.
 * Automatically inferred from the queryKeys factory.
 */
export type QueryKey = ExtractQueryKey<typeof queryKeys>
