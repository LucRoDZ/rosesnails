-- RosesNails Database Schema
-- Run this in Supabase SQL editor: https://app.supabase.com/project/_/editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: appointments
-- ============================================================
CREATE TABLE IF NOT EXISTS public.appointments (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           TEXT NOT NULL,           -- Clerk userId or email
  external_event_id TEXT NOT NULL UNIQUE,    -- Cal.com booking UID
  service_name      TEXT NOT NULL,
  start_at          TIMESTAMPTZ NOT NULL,
  end_at            TIMESTAMPTZ NOT NULL,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_appointments_user_id
  ON public.appointments (user_id);

CREATE INDEX IF NOT EXISTS idx_appointments_start_at
  ON public.appointments (start_at DESC);

CREATE INDEX IF NOT EXISTS idx_appointments_status
  ON public.appointments (status);

CREATE INDEX IF NOT EXISTS idx_appointments_user_start
  ON public.appointments (user_id, start_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- TABLE: webhook_events (idempotency log)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id       TEXT NOT NULL UNIQUE,  -- "{TRIGGER_EVENT}:{booking_uid}"
  event_type     TEXT NOT NULL,
  payload        JSONB NOT NULL,
  processed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_event_id
  ON public.webhook_events (event_id);

CREATE INDEX IF NOT EXISTS idx_webhook_events_created_at
  ON public.webhook_events (created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- appointments: users see only their own records
-- Note: Clerk userId is stored in user_id column
-- The anon client (used client-side) must pass the userId via auth header or claim

-- Policy: read own appointments
CREATE POLICY "appointments_select_own"
  ON public.appointments
  FOR SELECT
  USING (auth.uid()::text = user_id OR user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy: no direct insert/update from client (only via service role from webhook)
CREATE POLICY "appointments_no_insert"
  ON public.appointments
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "appointments_no_update"
  ON public.appointments
  FOR UPDATE
  USING (false);

CREATE POLICY "appointments_no_delete"
  ON public.appointments
  FOR DELETE
  USING (false);

-- webhook_events: completely server-side, no client access
CREATE POLICY "webhook_events_no_access"
  ON public.webhook_events
  FOR ALL
  USING (false);

-- ============================================================
-- GRANT PERMISSIONS
-- ============================================================

-- anon role can read appointments (filtered by RLS)
GRANT SELECT ON public.appointments TO anon;
GRANT SELECT ON public.appointments TO authenticated;

-- service_role has full access (bypasses RLS)
-- This is the default behavior for the service_role key
