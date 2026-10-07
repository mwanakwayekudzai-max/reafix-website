/*
# Create ReaFix owner gallery

1. New Tables
- `gallery_images`
- `id` (uuid, primary key): Unique image record identifier.
- `user_id` (uuid): Authenticated owner who uploaded the image.
- `storage_path` (text): Private object path used to manage the uploaded file.
- `public_url` (text): Public display URL for the approved gallery image.
- `created_at` (timestamptz): Upload timestamp used to order gallery images.

2. Storage
- Creates a public `gallery` bucket for images intended to appear on the public ReaFix website.
- Limits uploads to common image formats and 5 MB per file.
- Stores each owner's files under their authenticated user ID folder.

3. Security
- Enables row level security on `gallery_images`.
- Allows anyone to view gallery records because the gallery is public.
- Allows authenticated users to create, update, and delete only their own records.
- Adds storage policies so authenticated users can manage only files in their own folder.

4. Important Notes
- The website includes email/password sign-in and sign-up so the owner can create and use an account.
- Public image URLs are intentional because these images are business marketing content.
*/

CREATE TABLE IF NOT EXISTS public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path text NOT NULL UNIQUE,
  public_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view gallery images" ON public.gallery_images;
CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Owners can add gallery images" ON public.gallery_images;
CREATE POLICY "Owners can add gallery images"
ON public.gallery_images FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Owners can update gallery images" ON public.gallery_images;
CREATE POLICY "Owners can update gallery images"
ON public.gallery_images FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Owners can delete gallery images" ON public.gallery_images;
CREATE POLICY "Owners can delete gallery images"
ON public.gallery_images FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('gallery', 'gallery', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']::text[])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Gallery owners can upload images" ON storage.objects;
CREATE POLICY "Gallery owners can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'gallery'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Gallery owners can view their objects" ON storage.objects;
CREATE POLICY "Gallery owners can view their objects"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'gallery'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Gallery owners can update their objects" ON storage.objects;
CREATE POLICY "Gallery owners can update their objects"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'gallery'
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'gallery'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Gallery owners can delete their objects" ON storage.objects;
CREATE POLICY "Gallery owners can delete their objects"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'gallery'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
