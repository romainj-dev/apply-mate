-- Add key_metrics JSONB column to user_experience_roles
-- Stores: [{ type, customType?, value, text }]
ALTER TABLE user_experience_roles
  ADD COLUMN IF NOT EXISTS key_metrics JSONB;

-- Convert role tech_stack from text[] to jsonb
-- Preserves existing data by mapping each string to { tech: "other", customLabel: <original> }
-- A follow-up app-level pass can resolve known tech keys from the catalog.
ALTER TABLE user_experience_roles
  ADD COLUMN IF NOT EXISTS tech_stack_new JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE user_experience_roles
SET tech_stack_new = (
  SELECT COALESCE(
    jsonb_agg(jsonb_build_object('value', 'other', 'customLabel', elem)),
    '[]'::jsonb
  )
  FROM unnest(tech_stack) AS elem
)
WHERE tech_stack IS NOT NULL
  AND array_length(tech_stack, 1) > 0;

ALTER TABLE user_experience_roles DROP COLUMN tech_stack;
ALTER TABLE user_experience_roles RENAME COLUMN tech_stack_new TO tech_stack;

-- Add tech_stack JSONB to projects
-- Stores same shape as role-level: [{ value, customLabel? }]
ALTER TABLE user_experience_role_projects
  ADD COLUMN IF NOT EXISTS tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Comments
COMMENT ON COLUMN user_experience_roles.key_metrics
  IS 'JSON array of key metrics: [{ type: KeyMetricType, customType?: string, value: string, text: string }]';
COMMENT ON COLUMN user_experience_roles.tech_stack
  IS 'JSON array of tech stack items: [{ value: TechKey | "other", customLabel?: string }]';
COMMENT ON COLUMN user_experience_role_projects.tech_stack
  IS 'JSON array of tech stack items: [{ value: TechKey | "other", customLabel?: string }]';
