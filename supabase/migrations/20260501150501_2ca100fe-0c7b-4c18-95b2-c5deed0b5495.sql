CREATE TABLE public.next_steps_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.next_steps_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit the form
CREATE POLICY "Anyone can submit next steps"
  ON public.next_steps_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public read access; only service role can read submissions (admin via backend)