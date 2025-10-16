-- Restore User Creation Trigger
-- Recreate the trigger that was dropped when CASCADE was used

-- Create trigger function for user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Create default subscription for new user
  PERFORM create_default_subscription();
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create default subscription for new users
CREATE OR REPLACE TRIGGER trigger_create_default_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();