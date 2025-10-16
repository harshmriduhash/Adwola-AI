
-- Function to securely upsert a social connection
CREATE OR REPLACE FUNCTION public.upsert_social_connection(
  p_user_id uuid,
  p_platform text,
  p_platform_user_id text,
  p_platform_user_name text,
  p_access_token text,
  p_refresh_token text,
  p_expires_at timestamptz,
  p_scopes text[]
)
RETURNS void AS $$
DECLARE
  encrypted_access_token bytea;
  encrypted_refresh_token bytea;
  key_id uuid;
BEGIN
  -- Get the key from pgsodium
  -- IMPORTANT: In a real production environment, you should create and manage this key securely.
  -- For this example, we'll create it if it doesn't exist.
  key_id := (SELECT id FROM pgsodium.key WHERE name = 'social-connections-key' LIMIT 1);
  IF key_id IS NULL THEN
    key_id := pgsodium.create_key('aes256gcm', 'social-connections-key');
  END IF;

  -- Encrypt the tokens
  encrypted_access_token := pgsodium.crypto_aead_encrypt(p_access_token::bytea, 'additional_data'::bytea, key_id);
  
  IF p_refresh_token IS NOT NULL THEN
    encrypted_refresh_token := pgsodium.crypto_aead_encrypt(p_refresh_token::bytea, 'additional_data'::bytea, key_id);
  ELSE
    encrypted_refresh_token := NULL;
  END IF;

  -- Upsert the connection
  INSERT INTO public.social_connections (
    user_id,
    platform,
    platform_user_id,
    platform_user_name,
    access_token,
    refresh_token,
    expires_at,
    scopes
  )
  VALUES (
    p_user_id,
    p_platform,
    p_platform_user_id,
    p_platform_user_name,
    encrypted_access_token,
    encrypted_refresh_token,
    p_expires_at,
    p_scopes
  )
  ON CONFLICT (user_id, platform)
  DO UPDATE SET
    platform_user_id = EXCLUDED.platform_user_id,
    platform_user_name = EXCLUDED.platform_user_name,
    access_token = EXCLUDED.access_token,
    refresh_token = EXCLUDED.refresh_token,
    expires_at = EXCLUDED.expires_at,
    scopes = EXCLUDED.scopes,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
