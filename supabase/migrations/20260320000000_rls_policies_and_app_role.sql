-- ============================================================================
-- RLS Policies & App Role Migration
--
-- Introduces a restricted `app_user` PostgreSQL role for runtime queries.
-- Replaces placeholder deny-all RLS policies with ownership-based policies
-- that read the authenticated user ID from a custom GUC:
--   current_setting('app.current_user_id', true)::uuid
--
-- The application sets this GUC per-request inside a transaction via:
--   SET LOCAL ROLE app_user;
--   SELECT set_config('app.current_user_id', $userId, true);
-- ============================================================================

-- 1. Create the restricted app_user role (no login, no bypass RLS)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'app_user') THEN
    CREATE ROLE app_user NOLOGIN;
  END IF;
END$$;

-- Allow the connecting role (postgres) to SET LOCAL ROLE app_user
GRANT app_user TO postgres;

-- 2. Schema & table-level grants
GRANT USAGE ON SCHEMA public TO app_user;

GRANT SELECT, UPDATE ON users TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_experience_profiles TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_experience_roles TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_experience_role_projects TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_experience_learning TO app_user;
GRANT SELECT ON plans TO app_user;

-- 3. Force RLS even for table owners (defense-in-depth)
ALTER TABLE users FORCE ROW LEVEL SECURITY;
ALTER TABLE user_experience_profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE user_experience_roles FORCE ROW LEVEL SECURITY;
ALTER TABLE user_experience_role_projects FORCE ROW LEVEL SECURITY;
ALTER TABLE user_experience_learning FORCE ROW LEVEL SECURITY;

-- 4. Drop old placeholder deny-all policies
DROP POLICY IF EXISTS "Deny all for anon" ON users;
DROP POLICY IF EXISTS "Deny all for anon on profiles" ON user_experience_profiles;
DROP POLICY IF EXISTS "Deny all for anon on roles" ON user_experience_roles;
DROP POLICY IF EXISTS "Deny all for anon on projects" ON user_experience_role_projects;
DROP POLICY IF EXISTS "Deny all for anon on learning" ON user_experience_learning;

-- Drop plans policy that depends on auth.role() (Supabase Auth function)
-- app_user only has SELECT on plans, so no write policy needed
DROP POLICY IF EXISTS "Plans are modifiable by service role only" ON plans;

-- 5. Ownership-based RLS policies
-- ── users ──────────────────────────────────────────────────────────────────
CREATE POLICY "Users can view own record" ON users
  FOR SELECT
  TO app_user
  USING (id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY "Users can update own record" ON users
  FOR UPDATE
  TO app_user
  USING (id = current_setting('app.current_user_id', true)::uuid)
  WITH CHECK (id = current_setting('app.current_user_id', true)::uuid);

-- ── user_experience_profiles ───────────────────────────────────────────────
CREATE POLICY "Users can manage own profile" ON user_experience_profiles
  FOR ALL
  TO app_user
  USING (user_id = current_setting('app.current_user_id', true)::uuid)
  WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

-- ── user_experience_roles ──────────────────────────────────────────────────
CREATE POLICY "Users can manage own roles" ON user_experience_roles
  FOR ALL
  TO app_user
  USING (
    profile_id IN (
      SELECT id FROM user_experience_profiles
      WHERE user_id = current_setting('app.current_user_id', true)::uuid
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT id FROM user_experience_profiles
      WHERE user_id = current_setting('app.current_user_id', true)::uuid
    )
  );

-- ── user_experience_role_projects ──────────────────────────────────────────
CREATE POLICY "Users can manage own projects" ON user_experience_role_projects
  FOR ALL
  TO app_user
  USING (
    role_id IN (
      SELECT r.id FROM user_experience_roles r
      JOIN user_experience_profiles p ON r.profile_id = p.id
      WHERE p.user_id = current_setting('app.current_user_id', true)::uuid
    )
  )
  WITH CHECK (
    role_id IN (
      SELECT r.id FROM user_experience_roles r
      JOIN user_experience_profiles p ON r.profile_id = p.id
      WHERE p.user_id = current_setting('app.current_user_id', true)::uuid
    )
  );

-- ── user_experience_learning ───────────────────────────────────────────────
CREATE POLICY "Users can manage own learning" ON user_experience_learning
  FOR ALL
  TO app_user
  USING (
    profile_id IN (
      SELECT id FROM user_experience_profiles
      WHERE user_id = current_setting('app.current_user_id', true)::uuid
    )
  )
  WITH CHECK (
    profile_id IN (
      SELECT id FROM user_experience_profiles
      WHERE user_id = current_setting('app.current_user_id', true)::uuid
    )
  );
