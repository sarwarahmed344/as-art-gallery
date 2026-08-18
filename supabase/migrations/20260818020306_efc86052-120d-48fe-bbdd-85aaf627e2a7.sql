CREATE TABLE public.wall_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('ai', 'hand-drawn')),
  prompt TEXT,
  image_data TEXT NOT NULL,
  artist_name TEXT,
  sector TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  instagram TEXT,
  tier TEXT NOT NULL,
  style TEXT NOT NULL,
  description TEXT NOT NULL,
  reference_url TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'paid', 'in_progress', 'completed', 'cancelled')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.artist_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  instagram TEXT NOT NULL,
  portfolio_url TEXT,
  style TEXT,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin')),
  UNIQUE (user_id, role)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.wall_submissions TO authenticated;
GRANT SELECT, INSERT ON public.wall_submissions TO anon;
GRANT ALL ON public.wall_submissions TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.commissions TO authenticated;
GRANT SELECT, INSERT ON public.commissions TO anon;
GRANT ALL ON public.commissions TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.artist_applications TO authenticated;
GRANT SELECT, INSERT ON public.artist_applications TO anon;
GRANT ALL ON public.artist_applications TO service_role;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.wall_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE POLICY "Anyone can submit wall entries" ON public.wall_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can submit wall entries status check" ON public.wall_submissions FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending');
CREATE POLICY "Admins can manage all wall submissions" ON public.wall_submissions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public can see approved wall submissions" ON public.wall_submissions FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Users can see their own pending wall submissions" ON public.wall_submissions FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Anyone can submit commissions" ON public.commissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can manage all commissions" ON public.commissions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can see their own commissions" ON public.commissions FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Anyone can submit artist applications" ON public.artist_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can manage all artist applications" ON public.artist_applications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can see their own applications" ON public.artist_applications FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());