-- Create food_donations table for restaurants/organizations registering food donations
CREATE TABLE public.food_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  food_type TEXT NOT NULL,
  quantity TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  available_until TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create helper_organizations table for NGOs/volunteers registering as helpers
CREATE TABLE public.helper_organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  capacity INTEGER,
  specialization TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donation_requests table to track when helpers request donations
CREATE TABLE public.donation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donation_id UUID NOT NULL REFERENCES public.food_donations(id) ON DELETE CASCADE,
  helper_org_id UUID NOT NULL REFERENCES public.helper_organizations(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'requested',
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.food_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.helper_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for food_donations (publicly viewable for discovery, insertable by anyone)
CREATE POLICY "Food donations are viewable by everyone" 
ON public.food_donations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can register food donations" 
ON public.food_donations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Donors can update their own donations" 
ON public.food_donations 
FOR UPDATE 
USING (true);

-- RLS Policies for helper_organizations (publicly viewable, insertable by anyone)
CREATE POLICY "Helper organizations are viewable by everyone" 
ON public.helper_organizations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can register as helper organization" 
ON public.helper_organizations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Helper orgs can update their own info" 
ON public.helper_organizations 
FOR UPDATE 
USING (true);

-- RLS Policies for donation_requests (viewable by all, insertable by anyone)
CREATE POLICY "Donation requests are viewable by everyone" 
ON public.donation_requests 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create donation requests" 
ON public.donation_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update donation requests" 
ON public.donation_requests 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_food_donations_updated_at
  BEFORE UPDATE ON public.food_donations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_helper_organizations_updated_at
  BEFORE UPDATE ON public.helper_organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_food_donations_status ON public.food_donations(status);
CREATE INDEX idx_food_donations_available_until ON public.food_donations(available_until);
CREATE INDEX idx_donation_requests_status ON public.donation_requests(status);
CREATE INDEX idx_donation_requests_donation_id ON public.donation_requests(donation_id);
CREATE INDEX idx_donation_requests_helper_org_id ON public.donation_requests(helper_org_id);