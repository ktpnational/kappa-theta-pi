-- Create schemas first
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS public;

-- Set permissions
GRANT ALL ON SCHEMA auth TO current_user;
GRANT ALL ON SCHEMA public TO current_user;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";