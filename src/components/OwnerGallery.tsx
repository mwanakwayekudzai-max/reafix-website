import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { ImagePlus, LockKeyhole, LogIn, LogOut, Trash2, Upload, X } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type GalleryImage = {
  id: string;
  storage_path: string;
  public_url: string;
};

type AuthMode = 'sign-in' | 'sign-up' | 'reset-request' | 'reset-password';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function getAuthMessage(mode: AuthMode, errorMessage: string) {
  const normalizedMessage = errorMessage.toLowerCase();

  if (mode === 'sign-up' && (normalizedMessage.includes('already registered') || normalizedMessage.includes('already exists') || normalizedMessage.includes('user_already_exists'))) {
    return 'That email already has an owner account. Choose “I already have an account” below and sign in.';
  }

  if (normalizedMessage.includes('invalid login credentials')) {
    return 'That email or password is not correct. Please try again.';
  }

  if (normalizedMessage.includes('password')) {
    return 'Please use a password with at least 8 characters.';
  }

  if (normalizedMessage.includes('email')) {
    return 'Please enter a valid email address and try again.';
  }

  return 'We could not complete that request. Check your details and try again.';
}

export default function OwnerGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadImages = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('id, storage_path, public_url')
        .order('created_at', { ascending: false });

      if (!error && data) setImages(data as GalleryImage[]);
      setLoading(false);
    };

    void loadImages();
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      if (event === 'PASSWORD_RECOVERY') {
        setAuthMode('reset-password');
        setAuthOpen(true);
        setMessage('Choose a new password for the owner account.');
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    const result = authMode === 'sign-in'
      ? await supabase.auth.signInWithPassword({ email, password })
      : authMode === 'sign-up'
        ? await supabase.auth.signUp({ email, password })
        : authMode === 'reset-request'
          ? await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin })
          : await supabase.auth.updateUser({ password });

    if (result.error) {
      setMessage(getAuthMessage(authMode === 'reset-password' ? 'sign-up' : authMode, result.error.message));
    } else if (authMode === 'sign-up' && !result.data.session) {
      setMessage('Account created. Check your email to finish signing in.');
    } else if (authMode === 'reset-request') {
      setMessage('If an owner account uses that email, a password reset link is on its way.');
    } else if (authMode === 'reset-password') {
      setAuthOpen(false);
      setMessage('Password updated. You can now use the new password to sign in.');
      await supabase.auth.signOut();
    } else {
      setAuthOpen(false);
      setMessage('');
    }

    setBusy(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setMessage('');
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > MAX_FILE_SIZE) {
      setMessage('Please choose a JPG, PNG, or WebP image smaller than 5 MB.');
      setSelectedFile(null);
      event.target.value = '';
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!session || !selectedFile) return;
    setBusy(true);
    setMessage('');
    const storagePath = `${session.user.id}/${crypto.randomUUID()}-${selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const { error: uploadError } = await supabase.storage.from('gallery').upload(storagePath, selectedFile, {
      contentType: selectedFile.type,
      upsert: false,
    });

    if (uploadError) {
      setMessage('The picture could not be uploaded. Please try again.');
      setBusy(false);
      return;
    }

    const { data: publicData } = supabase.storage.from('gallery').getPublicUrl(storagePath);
    const { data: image, error: recordError } = await supabase
      .from('gallery_images')
      .insert({ storage_path: storagePath, public_url: publicData.publicUrl })
      .select('id, storage_path, public_url')
      .maybeSingle();

    if (recordError || !image) {
      await supabase.storage.from('gallery').remove([storagePath]);
      setMessage('The picture could not be saved. Please try again.');
    } else {
      setImages((current) => [image as GalleryImage, ...current]);
      setSelectedFile(null);
      setMessage('Picture added to the website.');
    }

    setBusy(false);
  };

  const handleDelete = async (image: GalleryImage) => {
    setBusy(true);
    setMessage('');
    const { error: recordError } = await supabase.from('gallery_images').delete().eq('id', image.id);
    if (recordError) {
      setMessage('The picture could not be removed. Please try again.');
    } else {
      await supabase.storage.from('gallery').remove([image.storage_path]);
      setImages((current) => current.filter((item) => item.id !== image.id));
      setMessage('Picture removed from the website.');
    }
    setBusy(false);
  };

  return (
    <section className="border-y border-slate-200 bg-white px-5 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#e1262f]">Our work</p>
            <h2 className="text-4xl font-black tracking-tight text-[#10213b] sm:text-5xl">See ReaFix in action.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">A look at the repairs, installations and service we provide for homes, businesses and vehicles.</p>
          </div>
          {!session && <button onClick={() => setAuthOpen((open) => !open)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-[#10213b] transition hover:border-[#ffd42a] hover:bg-[#fffbea]"><LockKeyhole size={16} /> Owner sign in</button>}
          {session && <button onClick={() => void supabase.auth.signOut()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-[#10213b] transition hover:border-[#e1262f] hover:text-[#e1262f]"><LogOut size={16} /> Sign out</button>}
        </div>

        {authOpen && (!session || authMode === 'reset-password') && <form onSubmit={handleAuth} className="mt-8 max-w-xl rounded-2xl bg-[#f7f8fa] p-5 sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h3 className="text-xl font-black text-[#10213b]">{authMode === 'sign-in' ? 'Owner sign in' : authMode === 'sign-up' ? 'Create owner account' : authMode === 'reset-request' ? 'Reset owner password' : 'Choose a new password'}</h3><p className="mt-1 text-sm text-slate-500">{authMode === 'reset-password' ? 'Use at least 8 characters.' : 'Only signed-in owners can add or remove pictures.'}</p></div><button type="button" onClick={() => setAuthOpen(false)} aria-label="Close sign in"><X size={20} /></button></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold text-[#10213b]">Email<input required={authMode !== 'reset-password'} type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-[#e1262f]" /></label>{authMode !== 'reset-request' && <label className="text-sm font-bold text-[#10213b]">{authMode === 'reset-password' ? 'New password' : 'Password'}<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-[#e1262f]" /></label>}</div><button disabled={busy} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#e1262f] px-5 py-3 font-black text-white disabled:opacity-60">{authMode === 'sign-in' ? <LogIn size={17} /> : <LockKeyhole size={17} />}{authMode === 'sign-in' ? 'Sign in' : authMode === 'sign-up' ? 'Create account' : authMode === 'reset-request' ? 'Send reset link' : 'Save new password'}</button>{authMode === 'sign-in' && <><button type="button" onClick={() => setAuthMode('reset-request')} className="ml-4 text-sm font-bold text-[#e1262f]">Forgot password?</button><button type="button" onClick={() => setAuthMode('sign-up')} className="ml-4 text-sm font-bold text-[#e1262f]">Create an account</button></>}{authMode === 'sign-up' && <button type="button" onClick={() => setAuthMode('sign-in')} className="ml-4 text-sm font-bold text-[#e1262f]">I already have an account</button>}{authMode === 'reset-request' && <button type="button" onClick={() => setAuthMode('sign-in')} className="ml-4 text-sm font-bold text-[#e1262f]">Back to sign in</button>}</form>}

        {session && <div className="mt-8 rounded-2xl bg-[#10213b] p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-5"><div><h3 className="font-black">Add a new picture</h3><p className="mt-1 text-sm text-slate-300">JPG, PNG or WebP files up to 5 MB.</p></div><div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:flex-row sm:items-center"><label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-[#10213b] hover:bg-[#fffbea]"><ImagePlus size={17} /> Choose picture<input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="sr-only" /></label><button onClick={() => void handleUpload()} disabled={!selectedFile || busy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffd42a] px-4 py-3 text-sm font-black text-[#10213b] disabled:cursor-not-allowed disabled:opacity-50"><Upload size={17} /> Upload picture</button></div></div>}

        {message && <p className="mt-4 text-sm font-bold text-[#e1262f]" role="status">{message}</p>}
        {loading ? <div className="mt-10 h-40 animate-pulse rounded-2xl bg-slate-100" /> : images.length > 0 ? <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{images.map((image) => <article key={image.id} className="group relative overflow-hidden rounded-2xl bg-slate-100"><img src={image.public_url} alt="ReaFix repair work" className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105" />{session && <button onClick={() => void handleDelete(image)} disabled={busy} aria-label="Remove picture" className="absolute right-3 top-3 rounded-full bg-white/95 p-2 text-[#e1262f] shadow-lg transition hover:bg-[#e1262f] hover:text-white disabled:opacity-50"><Trash2 size={17} /></button>}</article>)}</div> : <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-[#f7f8fa] px-6 py-12 text-center"><ImagePlus className="mx-auto text-slate-400" size={30} /><p className="mt-3 font-bold text-[#10213b]">Pictures from recent work will appear here.</p></div>}
      </div>
    </section>
  );
}
