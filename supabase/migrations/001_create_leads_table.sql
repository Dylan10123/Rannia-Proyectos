-- Migration: Create leads table for Rannia Proyectos Modulares
-- Run this in your Supabase SQL Editor or via Supabase CLI

-- Create the leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        TEXT NOT NULL CHECK (char_length(nombre) BETWEEN 1 AND 200),
  email         TEXT NOT NULL CHECK (email ~* '^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'),
  telefono      TEXT NOT NULL CHECK (char_length(telefono) BETWEEN 5 AND 30),
  mensaje       TEXT CHECK (mensaje IS NULL OR char_length(mensaje) <= 5000),
  leido         BOOLEAN NOT NULL DEFAULT FALSE,
  fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: anyone can INSERT (public form submissions)
CREATE POLICY "Permitir insert público"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: only authenticated users can SELECT (Supabase dashboard / admin)
CREATE POLICY "Solo autenticados pueden leer"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: only authenticated users can UPDATE (e.g. mark as read)
CREATE POLICY "Solo autenticados pueden actualizar"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: only authenticated users can DELETE
CREATE POLICY "Solo autenticados pueden eliminar"
  ON public.leads
  FOR DELETE
  TO authenticated
  USING (true);

-- Index for faster queries by date
CREATE INDEX IF NOT EXISTS idx_leads_fecha_creacion ON public.leads (fecha_creacion DESC);

-- Index for filtering unread leads
CREATE INDEX IF NOT EXISTS idx_leads_leido ON public.leads (leido);

COMMENT ON TABLE public.leads IS 'Leads recibidos desde el formulario de contacto de la web';
COMMENT ON COLUMN public.leads.leido IS 'Indica si el lead ha sido revisado/gestionado por el equipo';
