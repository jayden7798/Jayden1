/*
  # Create SmartRisk Waitlist Table

  1. New Tables
    - `smartrisk_waitlist`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `status` (text) - For tracking user status in the waitlist

  2. Security
    - Enable RLS on `smartrisk_waitlist` table
    - Add policies for:
      - Public insert access
      - Authenticated read access
*/

CREATE TABLE IF NOT EXISTS smartrisk_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE smartrisk_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert access for all users" ON smartrisk_waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users only" ON smartrisk_waitlist
  FOR SELECT
  TO authenticated
  USING (true);