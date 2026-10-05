import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Check,
  Clock3,
  Facebook,
  Gauge,
  Home,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Snowflake,
  Sparkles,
  ThermometerSnowflake,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

const heroImage = '/WhatsApp_Image_2026-10-02_at_17.50.51 copy.jpeg';
const workshopImage = '/WhatsApp_Image_2026-10-02_at_17.50.52.jpeg';
const carImage = '/WhatsApp_Image_2026-10-02_at_17.50.52f.jpeg';

const services = [
  { icon: ThermometerSnowflake, title: 'Car Aircon Regassing', text: 'Bring back the cold with a proper pressure check, leak test and refill.' },
  { icon: Wrench, title: 'Aircon Repairs', text: 'We diagnose and fix broken pipes, pumps, compressors and controls.' },
  { icon: Home, title: 'Appliance Repairs', text: 'Reliable repairs for stoves, fridges, geysers, freezers and more.' },
  { icon: Zap, title: 'Electrical Installations', text: 'Safe, practical electrical work for your home, business or workshop.' },
];

const applianceList = ['Stoves', 'Fridges', 'Cold rooms', 'Washing machines', 'Geysers', 'Freezers', 'Gate motors', 'Electrical installations'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8fa] text-[#10213b]">
      <div className="bg-[#10213b] px-5 py-2.5 text-center text-xs font-bold tracking-[0.18em] text-white sm:text-sm">
        FAST RESPONSE <span className="mx-2 text-[#ffd42a]">•</span> RELIABLE SERVICE <span className="mx-2 text-[#ffd42a]">•</span> HARARE & SURROUNDING AREAS
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f7f8fa]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="group flex items-center gap-2" aria-label="ReaFix home">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffd42a] text-[#10213b] shadow-[4px_4px_0_#e1262f] transition-transform group-hover:-translate-y-0.5">
              <Wrench size={24} strokeWidth={2.8} />
            </div>
            <div className="leading-none">
              <div className="text-xl font-black tracking-tight text-[#10213b]">REA<span className="text-[#e1262f]">FIX</span></div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">Repairs done right</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
            <a className="transition-colors hover:text-[#e1262f]" href="#services">Services</a>
            <a className="transition-colors hover:text-[#e1262f]" href="#about">Why ReaFix</a>
            <a className="transition-colors hover:text-[#e1262f]" href="#contact">Contact</a>
            <a href="tel:+263772652798" className="flex items-center gap-2 rounded-full bg-[#e1262f] px-5 py-3 text-white shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5 hover:bg-[#c91d28]"><Phone size={15} /> Call now</a>
          </nav>
          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-lg p-2 text-[#10213b] md:hidden" aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && <nav className="border-t border-slate-200 bg-white px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-bold"><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#about" onClick={() => setMenuOpen(false)}>Why ReaFix</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><a href="tel:+263772652798" className="text-[#e1262f]">Call +263 772 652 798</a></div></nav>}
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[#10213b]">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#ffd42a] opacity-10 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#ffd42a]"><Sparkles size={14} /> 24/7 emergency service</div>
              <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-7xl">Comfort restored.<br /><span className="text-[#ffd42a]">Problems solved.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Professional car aircon, appliance and electrical repairs from a team you can trust. We arrive ready, work neatly and get your day moving again.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#contact" className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#ffd42a] px-6 py-4 font-black text-[#10213b] shadow-[0_8px_0_#b98d00] transition-all hover:translate-y-0.5 hover:shadow-[0_5px_0_#b98d00]">Book a repair <ArrowRight size={19} /></a><a href="https://wa.me/263772652798" className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/25 px-6 py-4 font-bold text-white transition-colors hover:bg-white/10"><MessageCircle size={19} /> WhatsApp us</a></div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-300"><span className="flex items-center gap-2"><Check className="text-[#ffd42a]" size={16} /> Honest pricing</span><span className="flex items-center gap-2"><Check className="text-[#ffd42a]" size={16} /> Quality workmanship</span></div>
            </div>
            <div className="relative mx-auto w-full max-w-sm lg:ml-auto">
              <div className="absolute -bottom-5 -left-5 z-10 hidden rounded-2xl bg-[#e1262f] p-5 text-white shadow-xl sm:block"><div className="text-3xl font-black">10+</div><div className="text-xs font-bold uppercase tracking-widest text-red-100">Services covered</div></div>
              <div className="relative overflow-hidden rounded-[2rem] border-8 border-white/10 bg-[#091628] shadow-2xl"><img src={heroImage} alt="ReaFix appliance repair and car aircon services" className="block h-auto max-h-[680px] w-full object-contain" /></div>
              <div className="absolute -right-3 -top-4 rounded-xl bg-[#ffd42a] px-4 py-3 text-center font-black text-[#10213b] shadow-lg"><div className="text-2xl leading-none">24/7</div><div className="text-[9px] uppercase tracking-widest">Support</div></div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#e1262f]">What we do best</p><h2 className="text-4xl font-black tracking-tight text-[#10213b] sm:text-5xl">One team.<br /><span className="text-slate-400">Every fix.</span></h2></div><p className="max-w-md leading-7 text-slate-600">From a warm car on a hot day to an appliance that will not start, our skilled technicians bring practical solutions to every job.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(({ icon: Icon, title, text }, index) => <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#ffd42a] hover:shadow-xl"><div className={`mb-7 flex h-12 w-12 items-center justify-center rounded-xl ${index % 2 === 0 ? 'bg-[#10213b] text-[#ffd42a]' : 'bg-[#ffd42a] text-[#10213b]'}`}><Icon size={24} /></div><h3 className="mb-3 text-lg font-black text-[#10213b]">{title}</h3><p className="text-sm leading-6 text-slate-600">{text}</p><a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#e1262f]">Get help <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></a></article>)}</div>
        </section>

        <section id="about" className="bg-[#10213b] text-white"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-24"><div className="relative order-2 lg:order-1"><img src={workshopImage} alt="Technician working on a vehicle" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" /><div className="absolute -bottom-5 -right-3 rounded-2xl bg-[#ffd42a] px-5 py-4 text-[#10213b] shadow-xl sm:-right-5"><div className="flex items-center gap-2"><Gauge size={20} /><span className="font-black">Done right, first time</span></div></div></div><div className="order-1 lg:order-2"><p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#ffd42a]">Why choose ReaFix</p><h2 className="text-4xl font-black leading-tight sm:text-5xl">We treat your home<br />and car like our own.</h2><p className="mt-6 leading-8 text-slate-300">Good service is more than replacing a part. It is showing up when we say we will, explaining the problem clearly and leaving you with a fix that lasts.</p><div className="mt-8 grid grid-cols-2 gap-5">{['Experienced technicians', 'Clear, fair quotes', 'Quality parts & tools', 'Friendly local service'].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e1262f]"><Check size={15} /></span>{item}</div>)}</div><a href="#contact" className="mt-9 inline-flex items-center gap-2 font-black text-[#ffd42a]">Tell us what needs fixing <ArrowRight size={18} /></a></div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]"><div><p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#e1262f]">Appliance repairs</p><h2 className="text-4xl font-black leading-tight text-[#10213b] sm:text-5xl">The essentials,<br /><span className="text-slate-400">working again.</span></h2><p className="mt-5 leading-7 text-slate-600">We repair the appliances and systems your home relies on every day. Quick diagnosis, careful work and straightforward advice.</p><div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4">{applianceList.map((item) => <div key={item} className="flex items-center gap-2 text-sm font-bold text-[#10213b]"><span className="h-2 w-2 rounded-full bg-[#e1262f]" />{item}</div>)}</div></div><div className="relative"><img src={carImage} alt="Technician servicing vehicle air conditioning" className="aspect-[16/9] w-full rounded-3xl object-cover" /><div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dff5fa] text-[#10213b]"><Snowflake size={20} /></div><div><div className="text-sm font-black text-[#10213b]">Cool air, every journey</div><div className="text-xs text-slate-500">Car aircon diagnostics & regassing</div></div></div><a href="tel:+263772652798" className="hidden rounded-lg bg-[#e1262f] p-3 text-white sm:block"><Phone size={17} /></a></div></div></div></section>

        <section id="contact" className="bg-[#ffd42a]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-20"><div><p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#e1262f]">Need a hand?</p><h2 className="text-4xl font-black leading-tight text-[#10213b] sm:text-5xl">Let’s get it<br />sorted.</h2><p className="mt-5 max-w-md leading-7 text-[#33415c]">Send us a few details and we’ll get back to you. For the fastest response, call or WhatsApp us directly.</p><div className="mt-8 space-y-4"><a href="tel:+263772652798" className="flex items-center gap-3 font-black text-[#10213b]"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10213b] text-[#ffd42a]"><Phone size={17} /></span> +263 772 652 798</a><a href="https://wa.me/263772652798" className="flex items-center gap-3 font-black text-[#10213b]"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10213b] text-[#ffd42a]"><MessageCircle size={17} /></span> WhatsApp for a quick reply</a><div className="flex items-center gap-3 font-black text-[#10213b]"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10213b] text-[#ffd42a]"><Clock3 size={17} /></span> Available 24 hours, 7 days</div></div></div><div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">{submitted ? <div className="flex min-h-[300px] flex-col items-center justify-center text-center"><div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700"><Check size={32} /></div><h3 className="text-2xl font-black text-[#10213b]">Message received.</h3><p className="mt-3 max-w-sm text-slate-600">Thanks for reaching out. We’ll contact you shortly to arrange your repair.</p><button onClick={() => setSubmitted(false)} className="mt-6 font-bold text-[#e1262f]">Send another message</button></div> : <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><h3 className="text-2xl font-black text-[#10213b]">Request a call back</h3><p className="mt-1 text-sm text-slate-500">Tell us what is giving you trouble.</p></div><label className="text-sm font-bold text-[#10213b]">Your name<input required name="name" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-normal outline-none transition focus:border-[#e1262f] focus:ring-2 focus:ring-red-100" placeholder="e.g. Tawanda Moyo" /></label><label className="text-sm font-bold text-[#10213b]">Phone number<input required name="phone" type="tel" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-normal outline-none transition focus:border-[#e1262f] focus:ring-2 focus:ring-red-100" placeholder="+263 ..." /></label><label className="text-sm font-bold text-[#10213b] sm:col-span-2">What needs fixing?<textarea required name="message" rows={4} className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-normal outline-none transition focus:border-[#e1262f] focus:ring-2 focus:ring-red-100" placeholder="Tell us about your car, appliance or electrical issue..." /></label><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e1262f] px-5 py-4 font-black text-white shadow-lg shadow-red-100 transition-all hover:-translate-y-0.5 hover:bg-[#c91d28] sm:col-span-2">Send request <ArrowRight size={18} /></button></form>}</div></div></section>
      </main>

      <footer className="bg-[#091628] text-white"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><div className="text-xl font-black">REA<span className="text-[#ffd42a]">FIX</span></div><p className="mt-2 text-sm text-slate-400">Repairs done to your satisfaction.</p></div><div className="flex flex-wrap items-center gap-5 text-sm text-slate-300"><a href="mailto:reasonzinyama74@gmail.com" className="flex items-center gap-2 hover:text-[#ffd42a]"><Mail size={15} /> Email us</a><a href="#contact" className="flex items-center gap-2 hover:text-[#ffd42a]"><MessageCircle size={15} /> WhatsApp</a><a href="#" aria-label="Facebook" className="hover:text-[#ffd42a]"><Facebook size={17} /></a></div><div className="text-xs text-slate-500">© 2026 ReaFix Appliance Repairs</div></div></footer>
    </div>
  );
}

export default App;
