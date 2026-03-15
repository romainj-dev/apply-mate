import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: Record<string, unknown>; output: Record<string, unknown>; }
};

export type ExperienceLearningInput = {
  credentialUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  entryType: Scalars['String']['input'];
  fieldOfStudy?: InputMaybe<Scalars['String']['input']>;
  institution: Scalars['String']['input'];
  program?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type ExperienceLearningModel = {
  createdAt: Scalars['DateTime']['output'];
  credentialUrl: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['String']['output']>;
  entryType: Scalars['String']['output'];
  fieldOfStudy: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  institution: Scalars['String']['output'];
  profileId: Scalars['String']['output'];
  program: Maybe<Scalars['String']['output']>;
  startDate: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceMutationResult = {
  learningCount: Scalars['Float']['output'];
  profileId: Scalars['ID']['output'];
  rolesCount: Scalars['Float']['output'];
};

export type ExperienceProfileAggregateModel = {
  learning: Array<ExperienceLearningModel>;
  profile: ExperienceProfileModel;
  roles: Array<ExperienceRoleModel>;
};

export type ExperienceProfileInput = {
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
  headline?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  summary?: InputMaybe<Scalars['String']['input']>;
  yearsOfExperience?: InputMaybe<Scalars['Int']['input']>;
};

export type ExperienceProfileModel = {
  createdAt: Scalars['DateTime']['output'];
  customFields: Maybe<Scalars['JSONObject']['output']>;
  headline: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ingestionMetadata: Maybe<Scalars['JSONObject']['output']>;
  location: Maybe<Scalars['String']['output']>;
  rawPayload: Maybe<Scalars['JSONObject']['output']>;
  skills: Array<Scalars['String']['output']>;
  summary: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  yearsOfExperience: Maybe<Scalars['Int']['output']>;
};

export type ExperienceRoleInput = {
  company: Scalars['String']['input'];
  customFields?: InputMaybe<Scalars['JSONObject']['input']>;
  durationLabel?: InputMaybe<Scalars['String']['input']>;
  employmentType?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  isCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  keyAchievements?: InputMaybe<Array<Scalars['String']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  methodologies?: InputMaybe<Array<Scalars['String']['input']>>;
  missingDetails?: InputMaybe<Scalars['String']['input']>;
  periodLabel?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  teamStructure?: InputMaybe<Scalars['String']['input']>;
  techStack?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type ExperienceRoleModel = {
  company: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields: Maybe<Scalars['JSONObject']['output']>;
  durationLabel: Maybe<Scalars['String']['output']>;
  employmentType: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isCurrent: Maybe<Scalars['Boolean']['output']>;
  keyAchievements: Array<Scalars['String']['output']>;
  location: Maybe<Scalars['String']['output']>;
  methodologies: Array<Scalars['String']['output']>;
  missingDetails: Maybe<Scalars['String']['output']>;
  periodLabel: Maybe<Scalars['String']['output']>;
  profileId: Scalars['String']['output'];
  projects: Array<ExperienceRoleProjectModel>;
  startDate: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  summary: Maybe<Scalars['String']['output']>;
  teamStructure: Maybe<Scalars['String']['output']>;
  techStack: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceRoleProjectModel = {
  achievements: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  period: Maybe<Scalars['String']['output']>;
  roleId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  saveExperience: ExperienceMutationResult;
};


export type MutationSaveExperienceArgs = {
  input: SaveExperienceInput;
};

export type PlanModel = {
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  currentUser: Maybe<User>;
  experienceProfile: Maybe<ExperienceProfileAggregateModel>;
  health: Scalars['String']['output'];
  plans: Array<PlanModel>;
  user: User;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type SaveExperienceInput = {
  learning?: InputMaybe<Array<ExperienceLearningInput>>;
  profile: ExperienceProfileInput;
  rawPayload?: InputMaybe<Scalars['JSONObject']['input']>;
  roles?: InputMaybe<Array<ExperienceRoleInput>>;
};

export type User = {
  avatarUrl: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: Maybe<Scalars['JSONObject']['output']>;
  provider: Scalars['String']['output'];
  providerAccountId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GetPlanPricingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlanPricingQuery = { plans: Array<{ id: string, code: string, price: number }> };

export type GetExperienceProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExperienceProfileQuery = { experienceProfile: { profile: { id: string, userId: string, headline: string | null | undefined, summary: string | null | undefined, location: string | null | undefined, yearsOfExperience: number | null | undefined, skills: Array<string>, customFields: Record<string, unknown> | null | undefined, createdAt: string, updatedAt: string }, roles: Array<{ id: string, title: string, company: string, employmentType: string | null | undefined, location: string | null | undefined, startDate: string | null | undefined, endDate: string | null | undefined, isCurrent: boolean | null | undefined, periodLabel: string | null | undefined, durationLabel: string | null | undefined, status: string, summary: string | null | undefined, techStack: Array<string>, methodologies: Array<string>, teamStructure: string | null | undefined, keyAchievements: Array<string>, missingDetails: string | null | undefined, projects: Array<{ id: string, title: string, period: string | null | undefined, description: string | null | undefined, achievements: Array<string> }> }>, learning: Array<{ id: string, entryType: string, institution: string, program: string | null | undefined, fieldOfStudy: string | null | undefined, credentialUrl: string | null | undefined, startDate: string | null | undefined, endDate: string | null | undefined, description: string | null | undefined }> } | null | undefined };

export type SaveExperienceMutationVariables = Exact<{
  input: SaveExperienceInput;
}>;


export type SaveExperienceMutation = { saveExperience: { profileId: string, rolesCount: number, learningCount: number } };


export const GetPlanPricingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlanPricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetPlanPricingQuery, GetPlanPricingQueryVariables>;
export const GetExperienceProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExperienceProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"experienceProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"headline"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}},{"kind":"Field","name":{"kind":"Name","value":"skills"}},{"kind":"Field","name":{"kind":"Name","value":"customFields"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"employmentType"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"isCurrent"}},{"kind":"Field","name":{"kind":"Name","value":"periodLabel"}},{"kind":"Field","name":{"kind":"Name","value":"durationLabel"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"techStack"}},{"kind":"Field","name":{"kind":"Name","value":"methodologies"}},{"kind":"Field","name":{"kind":"Name","value":"teamStructure"}},{"kind":"Field","name":{"kind":"Name","value":"keyAchievements"}},{"kind":"Field","name":{"kind":"Name","value":"missingDetails"}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"period"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"achievements"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"learning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entryType"}},{"kind":"Field","name":{"kind":"Name","value":"institution"}},{"kind":"Field","name":{"kind":"Name","value":"program"}},{"kind":"Field","name":{"kind":"Name","value":"fieldOfStudy"}},{"kind":"Field","name":{"kind":"Name","value":"credentialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetExperienceProfileQuery, GetExperienceProfileQueryVariables>;
export const SaveExperienceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveExperience"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaveExperienceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveExperience"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"rolesCount"}},{"kind":"Field","name":{"kind":"Name","value":"learningCount"}}]}}]}}]} as unknown as DocumentNode<SaveExperienceMutation, SaveExperienceMutationVariables>;