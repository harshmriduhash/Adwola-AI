
-- Function to securely decrypt a token
CREATE OR REPLACE FUNCTION public.decrypt_token(
  p_encrypted_token bytea
)
RETURNS text AS $$
DECLARE
  decrypted_token_bytea bytea;
  key_id uuid;
BEGIN
  -- Get the key from pgsodium
  key_id := (SELECT id FROM pgsodium.key WHERE name = 'social-connections-key' LIMIT 1);
  IF key_id IS NULL THEN
    RAISE EXCEPTION 'Decryption key not found.';
  END IF;

  -- Decrypt the token
  decrypted_token_bytea := pgsodium.crypto_aead_decrypt(p_encrypted_token, 'additional_data'::bytea, key_id);

  -- Convert bytea to text
  RETURN convert_from(decrypted_token_bytea, 'utf8');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
