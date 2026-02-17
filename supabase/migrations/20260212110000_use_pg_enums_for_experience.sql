-- Introduce PostgreSQL enums for experience status and learning entry types.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'experience_status') THEN
    CREATE TYPE experience_status AS ENUM ('complete', 'incomplete');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'experience_entry_type'
  ) THEN
    CREATE TYPE experience_entry_type AS ENUM ('education', 'certification');
  END IF;
END
$$;

ALTER TABLE user_experience_roles
  ALTER COLUMN status DROP DEFAULT,
  ALTER COLUMN status TYPE experience_status
  USING status::experience_status,
  ALTER COLUMN status SET DEFAULT 'incomplete';

ALTER TABLE user_experience_learning
  ALTER COLUMN entry_type TYPE experience_entry_type
  USING entry_type::experience_entry_type;
