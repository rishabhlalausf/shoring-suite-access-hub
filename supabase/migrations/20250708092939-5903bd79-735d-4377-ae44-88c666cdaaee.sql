-- Create table for pre-defined license codes
CREATE TABLE public.license_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMPTZ,
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert the pre-defined codes
INSERT INTO public.license_codes (code) VALUES 
('aabbccdd'),
('llmmnnoo'),
('PPQQRRSSTT'),
('OOPPTTMMLL');

-- Enable Row Level Security
ALTER TABLE public.license_codes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading unused codes
CREATE POLICY "allow_read_unused_codes" ON public.license_codes
  FOR SELECT
  USING (NOT is_used);

-- Create policy for edge functions to update codes
CREATE POLICY "allow_update_codes" ON public.license_codes
  FOR UPDATE
  USING (true);