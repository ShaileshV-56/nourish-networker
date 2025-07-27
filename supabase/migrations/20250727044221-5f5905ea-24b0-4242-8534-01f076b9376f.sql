-- Create food donations table
CREATE TABLE public.food_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  food_type TEXT NOT NULL,
  quantity TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  available_until TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  donor_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.food_donations ENABLE ROW LEVEL SECURITY;

-- Create policies for food donations
CREATE POLICY "Food donations are viewable by everyone" 
ON public.food_donations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create food donations" 
ON public.food_donations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Donors can update their own donations" 
ON public.food_donations 
FOR UPDATE 
USING (donor_id = auth.uid() OR donor_id IS NULL);

CREATE POLICY "Donors can delete their own donations" 
ON public.food_donations 
FOR DELETE 
USING (donor_id = auth.uid() OR donor_id IS NULL);

-- Create donation requests table for tracking who requests food
CREATE TABLE public.donation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donation_id UUID NOT NULL REFERENCES public.food_donations(id) ON DELETE CASCADE,
  requester_name TEXT NOT NULL,
  requester_phone TEXT NOT NULL,
  requester_organization TEXT,
  request_message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  requester_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for donation requests
ALTER TABLE public.donation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for donation requests
CREATE POLICY "Donation requests are viewable by everyone" 
ON public.donation_requests 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create donation requests" 
ON public.donation_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Requesters can update their own requests" 
ON public.donation_requests 
FOR UPDATE 
USING (requester_id = auth.uid() OR requester_id IS NULL);

-- Create trigger for automatic timestamp updates on food_donations
CREATE TRIGGER update_food_donations_updated_at
BEFORE UPDATE ON public.food_donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on donation_requests
CREATE TRIGGER update_donation_requests_updated_at
BEFORE UPDATE ON public.donation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();