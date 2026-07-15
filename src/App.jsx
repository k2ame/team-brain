import { useState } from 'react';
import {
  Menu, X, ArrowRight, Shield, Users, FileCheck, Leaf, Landmark,
  GraduationCap, Mail, Phone, MapPin, Quote, CheckCircle2,
} from 'lucide-react';

const COLORS = {
  ink: '#10182B',
  paper: '#F6F4EF',
  bronze: '#AD8A3F',
  bronzeDeep: '#8C6D2C',
  charcoal: '#232A3B',
  bone: '#DCD7C9',
  slate: '#5B6272',
};

const GLASS = {
  backdropFilter: 'blur(12px) saturate(160%)',
  WebkitBackdropFilter: 'blur(12px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.35)',
  boxShadow: '0 4px 24px rgba(16,24,43,0.18), inset 0 1px 0 rgba(255,255,255,0.35)',
};

const GLASS_BRONZE = { ...GLASS, background: 'rgba(173,138,63,0.75)' };
const GLASS_INK = { ...GLASS, background: 'rgba(16,24,43,0.75)' };
const GLASS_CLEAR = { ...GLASS, background: 'rgba(255,255,255,0.12)' };

// Inquiries are delivered by formsubmit.co to this address. The first
// submission triggers a one-time activation email to it.
const INQUIRY_ENDPOINT = 'https://formsubmit.co/kathryne@governaxisadvisory.com';

const FRAMEWORKS = [
  { label: 'Companies Act, 2015', footerLabel: 'Companies Act, 2015', href: 'https://new.kenyalaw.org/akn/ke/act/2015/17/' },
  { label: 'CMA Corporate Governance Code', footerLabel: 'CMA Code of Corporate Governance', href: 'https://www.cma.or.ke/corporate-governance/' },
  { label: 'Mwongozo Code', footerLabel: 'Mwongozo Code (State Corporations)', href: 'https://www.scac.go.ke/sites/default/files/2023-11/MWONGOZOCODEOFGOVERNANCE.pdf' },
  { label: 'Data Protection Act, 2019', footerLabel: 'Data Protection Act, 2019', href: 'https://new.kenyalaw.org/akn/ke/act/2019/24/' },
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'team', label: 'Team' },
  { id: 'testimonials', label: 'Testimonials' },
];

function SealMark({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="none" stroke={COLORS.bronze} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="39" fill="none" stroke={COLORS.bronze} strokeWidth="1" strokeDasharray="2 4" />
      <text x="50" y="59" textAnchor="middle" fontSize="28" fontFamily="Fraunces, serif" fill={COLORS.bronze} fontWeight="600">GA</text>
    </svg>
  );
}

function ArticleHeader({ eyebrow, title }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-4">
      <p className="font-mono text-xs tracking-[0.2em]" style={{ color: COLORS.bronzeDeep }}>{eyebrow}</p>
      <h1 className="font-display text-4xl mt-3" style={{ color: COLORS.charcoal }}>{title}</h1>
    </div>
  );
}

function NavBar({ active, setActive, mobileOpen, setMobileOpen }) {
  return (
    <header style={{ background: COLORS.ink, borderBottom: `1px solid ${COLORS.bronzeDeep}` }} className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <button onClick={() => { setActive('home'); setMobileOpen(false); }} className="flex items-center gap-3">
          <SealMark size={38} />
          <span className="font-display text-lg tracking-wide" style={{ color: COLORS.paper }}>
            GOVERNAXIS <span style={{ color: COLORS.bronze }}>ADVISORY</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="pb-1 transition-colors"
              style={{
                color: active === item.id ? COLORS.bronze : COLORS.bone,
                borderBottom: active === item.id ? `1px solid ${COLORS.bronze}` : '1px solid transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setActive('contact')}
          className="hidden md:inline-flex items-center gap-2 font-body text-sm px-4 py-2 rounded-sm"
          style={{ ...GLASS_BRONZE, color: COLORS.ink }}
        >
          Book a Consultation <ArrowRight size={14} />
        </button>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: COLORS.paper }} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 font-body text-sm" style={{ borderTop: `1px solid ${COLORS.bronzeDeep}` }}>
          {[...NAV_ITEMS, { id: 'contact', label: 'Contact' }].map(item => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setMobileOpen(false); }}
              className="text-left py-2"
              style={{ color: active === item.id ? COLORS.bronze : COLORS.bone }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer({ setActive }) {
  return (
    <footer style={{ background: COLORS.ink, borderTop: `1px solid ${COLORS.bronzeDeep}` }} className="font-body">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <SealMark size={30} />
            <span className="font-display text-sm" style={{ color: COLORS.paper }}>GOVERNAXIS ADVISORY</span>
          </div>
          <p className="text-sm" style={{ color: COLORS.slate }}>Governance and compliance counsel for boards and institutions across Kenya.</p>
        </div>

        <div>
          <p className="font-mono text-xs mb-3 tracking-wider" style={{ color: COLORS.bronze }}>NAVIGATE</p>
          <ul className="space-y-2 text-sm">
            {[...NAV_ITEMS, { id: 'contact', label: 'Contact' }].map(item => (
              <li key={item.id}>
                <button onClick={() => setActive(item.id)} style={{ color: COLORS.bone }}>{item.label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs mb-3 tracking-wider" style={{ color: COLORS.bronze }}>CONTACT</p>
          <ul className="space-y-2 text-sm" style={{ color: COLORS.bone }}>
            <li className="flex items-center gap-2"><MapPin size={14} /> Nairobi, Kenya</li>
            <li className="flex items-center gap-2"><Mail size={14} /> hello@governaxisadvisory.co.ke</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +254 7XX XXX XXX</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs mb-3 tracking-wider" style={{ color: COLORS.bronze }}>FRAMEWORKS WE WORK WITHIN</p>
          <ul className="space-y-1 text-xs" style={{ color: COLORS.slate }}>
            {FRAMEWORKS.map(f => (
              <li key={f.footerLabel}>
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{f.footerLabel}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t px-6 py-4 text-xs flex flex-col md:flex-row justify-between gap-2 max-w-6xl mx-auto" style={{ borderColor: COLORS.bronzeDeep, color: COLORS.slate }}>
        <span>© 2026 Governaxis Advisory. All rights reserved.</span>
        <span className="font-mono">DRAFT TEMPLATE — REPLACE PLACEHOLDER DETAILS BEFORE PUBLISHING</span>
      </div>
    </footer>
  );
}

function HomePage({ setActive }) {
  const previewServices = [
    { icon: Shield, title: 'Corporate Governance Advisory', desc: 'Board charters, delegation frameworks, and decision rights that hold up under scrutiny.' },
    { icon: Users, title: 'Board Effectiveness', desc: 'Evaluations and structured feedback that turn board meetings into real oversight.' },
    { icon: FileCheck, title: 'Regulatory & Compliance', desc: 'Practical alignment with the Companies Act, CMA Code, and sector regulation.' },
  ];
  const pillars = [
    { title: 'Independent, not incentivized', desc: 'We hold no audit or legal referral arrangements that could shape a recommendation.' },
    { title: 'Grounded in the codes that govern you', desc: 'Every recommendation is traceable to a specific statute, code, or regulatory guidance.' },
    { title: 'Built to be inherited', desc: 'Frameworks are documented so they outlast any single board or leadership team.' },
  ];

  return (
    <>
      <section style={{ background: COLORS.ink }} className="relative overflow-hidden">
        <div
          className="hidden md:block"
          style={{ position: 'absolute', right: '-4rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.08, pointerEvents: 'none' }}
        >
          <SealMark size={420} />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative">
          <p className="font-mono text-xs tracking-[0.2em] mb-6" style={{ color: COLORS.bronze }}>
            GOVERNANCE &amp; COMPLIANCE COUNSEL — NAIROBI, KENYA
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl" style={{ color: COLORS.paper }}>
            Governance is the architecture no one sees — until it fails.
          </h1>
          <p className="font-body text-lg mt-6 max-w-2xl" style={{ color: COLORS.bone }}>
            We help boards, executives, and public institutions design governance structures that hold up under pressure: clear mandates, accountable oversight, and decisions that survive scrutiny.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <button onClick={() => setActive('contact')} className="inline-flex items-center gap-2 font-body px-6 py-3 rounded-sm" style={{ ...GLASS_BRONZE, color: COLORS.ink }}>
              Book a Governance Review <ArrowRight size={16} />
            </button>
            <button onClick={() => setActive('services')} className="inline-flex items-center gap-2 font-body px-6 py-3 rounded-sm" style={{ ...GLASS_CLEAR, color: COLORS.paper }}>
              View Our Services
            </button>
          </div>
        </div>
      </section>

      <section style={{ background: COLORS.paper, borderBottom: `1px solid ${COLORS.bone}` }}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-mono text-xs tracking-wider" style={{ color: COLORS.slate }}>WE WORK WITHIN</span>
          {FRAMEWORKS.map(f => (
            <a
              key={f.label}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm px-3 py-1 rounded-full border transition-colors hover:underline"
              style={{ borderColor: COLORS.bone, color: COLORS.charcoal }}
              title={`Read the ${f.label}`}
            >
              {f.label}
            </a>
          ))}
        </div>
      </section>

      <section style={{ background: COLORS.paper }} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-display text-3xl" style={{ color: COLORS.charcoal }}>Where we advise</h2>
            <button onClick={() => setActive('services')} className="font-body text-sm inline-flex items-center gap-1" style={{ color: COLORS.bronzeDeep }}>
              All six services <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {previewServices.map(s => (
              <div key={s.title} className="p-6 border rounded-sm" style={{ borderColor: COLORS.bone }}>
                <s.icon size={26} style={{ color: COLORS.bronzeDeep }} />
                <h3 className="font-display text-xl mt-4 mb-2" style={{ color: COLORS.charcoal }}>{s.title}</h3>
                <p className="font-body text-sm" style={{ color: COLORS.slate }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: COLORS.ink }} className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {pillars.map(p => (
            <div key={p.title}>
              <CheckCircle2 size={22} style={{ color: COLORS.bronze }} />
              <h3 className="font-display text-xl mt-4 mb-2" style={{ color: COLORS.paper }}>{p.title}</h3>
              <p className="font-body text-sm" style={{ color: COLORS.bone }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: COLORS.bronze }} className="py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-display text-2xl md:text-3xl" style={{ color: COLORS.ink }}>Start with a governance review.</h2>
          <button onClick={() => setActive('contact')} className="inline-flex items-center gap-2 font-body px-6 py-3 rounded-sm" style={{ ...GLASS_INK, color: COLORS.paper }}>
            Get in Touch <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  const values = [
    { title: 'Independence', desc: 'No audit or legal referral arrangements that could color a recommendation.' },
    { title: 'Rigor', desc: 'Every finding is traceable to a specific statute, code, or regulatory guidance.' },
    { title: 'Discretion', desc: 'Governance reviews surface uncomfortable findings. We handle them in confidence.' },
    { title: 'Continuity', desc: 'Frameworks are documented so they outlast any one board or leadership team.' },
  ];
  const process = [
    { step: 'Diagnose', desc: 'Review charters, minutes, and decision records against the codes that apply to you.' },
    { step: 'Design', desc: 'Draft the specific structures, mandates, and delegations your institution is missing.' },
    { step: 'Embed', desc: 'Work directly with the board and executive team until the new structure is in use.' },
    { step: 'Sustain', desc: 'Set a review cycle so governance keeps pace as the institution changes.' },
  ];
  return (
    <div style={{ background: COLORS.paper }}>
      <ArticleHeader eyebrow="ARTICLE I — ABOUT THE FIRM" title="We treat governance as infrastructure, not paperwork." />
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <p className="font-body text-lg max-w-3xl" style={{ color: COLORS.slate }}>
          Governaxis Advisory works with boards, executives, and institutions across Kenya to move governance codes out of the binder and into daily practice — from board charters and delegation frameworks to full regulatory compliance reviews.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-4 gap-8">
        {values.map(v => (
          <div key={v.title}>
            <h3 className="font-display text-xl mb-2" style={{ color: COLORS.charcoal }}>{v.title}</h3>
            <p className="font-body text-sm" style={{ color: COLORS.slate }}>{v.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ background: COLORS.ink }} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-2xl mb-10" style={{ color: COLORS.paper }}>How an engagement runs</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <div key={p.step} style={{ borderTop: `2px solid ${COLORS.bronze}` }} className="pt-4">
                <p className="font-mono text-xs" style={{ color: COLORS.bronze }}>{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-lg mt-2 mb-2" style={{ color: COLORS.paper }}>{p.step}</h3>
                <p className="font-body text-sm" style={{ color: COLORS.bone }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesPage({ setActive }) {
  const services = [
    { icon: Shield, title: 'Corporate Governance Advisory', desc: 'Board charters, committee terms of reference, and delegation-of-authority frameworks built around how your institution actually makes decisions.' },
    { icon: Users, title: 'Board Effectiveness & Evaluation', desc: 'Independent board and director evaluations, benchmarked against the CMA Code, with a private report and a working session on the findings.' },
    { icon: FileCheck, title: 'Regulatory & Compliance Advisory', desc: 'Gap assessments against the Companies Act, sector regulation, and licensing conditions, with a prioritized remediation plan.' },
    { icon: Leaf, title: 'ESG & Sustainability Governance', desc: 'Board-level oversight structures for ESG commitments, including disclosure controls and reporting lines into the board.' },
    { icon: Landmark, title: 'Public Sector & Institutional Governance', desc: 'Governance structuring for state corporations and public institutions under the Mwongozo Code.' },
    { icon: GraduationCap, title: 'Governance Training & Capacity Building', desc: 'Director induction and ongoing board training, built around your actual charter and committee structure rather than generic material.' },
  ];
  return (
    <div style={{ background: COLORS.paper }}>
      <ArticleHeader eyebrow="ARTICLE II — SERVICES" title="Six ways we work with boards and institutions." />
      <div className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-8">
        {services.map(s => (
          <div key={s.title} className="p-6 border rounded-sm flex gap-4" style={{ borderColor: COLORS.bone }}>
            <s.icon size={28} style={{ color: COLORS.bronzeDeep, flexShrink: 0 }} />
            <div>
              <h3 className="font-display text-xl mb-2" style={{ color: COLORS.charcoal }}>{s.title}</h3>
              <p className="font-body text-sm" style={{ color: COLORS.slate }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: COLORS.ink }} className="py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-lg max-w-xl" style={{ color: COLORS.paper }}>Engagements run project-based or on retainer, scoped after an initial diagnostic call.</p>
          <button onClick={() => setActive('contact')} className="inline-flex items-center gap-2 font-body px-6 py-3 rounded-sm whitespace-nowrap" style={{ ...GLASS_BRONZE, color: COLORS.ink }}>
            Discuss Your Scope <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamPage() {
  const team = [
    { name: 'Amara Otieno', role: 'Managing Partner', bio: 'Leads corporate governance and board effectiveness engagements across financial services and manufacturing.' },
    { name: 'David Kimani', role: 'Director, Advisory Services', bio: 'Focuses on regulatory compliance and public sector governance under the Mwongozo Code.' },
    { name: 'Grace Wanjiru', role: 'Senior Governance Counsel', bio: 'Advises on ESG governance structures and board-level sustainability oversight.' },
  ];
  return (
    <div style={{ background: COLORS.paper }}>
      <ArticleHeader eyebrow="ARTICLE III — LEADERSHIP" title="The people behind the recommendations." />
      <div className="max-w-6xl mx-auto px-6 pb-8 grid md:grid-cols-3 gap-8">
        {team.map(t => (
          <div key={t.name} className="p-6 border rounded-sm" style={{ borderColor: COLORS.bone }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-display text-lg mb-4" style={{ background: COLORS.ink, color: COLORS.bronze }}>
              {t.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="font-display text-xl mb-1" style={{ color: COLORS.charcoal }}>{t.name}</h3>
            <p className="font-mono text-xs mb-3" style={{ color: COLORS.bronzeDeep }}>{t.role}</p>
            <p className="font-body text-sm" style={{ color: COLORS.slate }}>{t.bio}</p>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <p className="font-mono text-xs" style={{ color: COLORS.slate }}>* Placeholder profiles — replace with your actual team before publishing.</p>
      </div>
    </div>
  );
}

function TestimonialsPage() {
  const quotes = [
    { quote: 'The board evaluation was the first one that told us something we didn\u2019t already know. We restructured two committees off the back of it.', name: 'Board Chair', org: 'Regional Financial Institution' },
    { quote: 'They mapped every recommendation back to the actual code section. That made it easy to get buy-in from directors who are usually skeptical of consultants.', name: 'Chief Executive', org: 'Manufacturing Group' },
    { quote: 'Our governance framework had not been touched since we were founded. Now it is a document the board actually refers to.', name: 'Executive Director', org: 'Development NGO' },
  ];
  return (
    <div style={{ background: COLORS.paper }}>
      <ArticleHeader eyebrow="ARTICLE IV — CLIENT FEEDBACK" title="What boards say after the engagement." />
      <div className="max-w-6xl mx-auto px-6 pb-8 grid md:grid-cols-3 gap-8">
        {quotes.map((q, i) => (
          <div key={i} className="p-6 border rounded-sm flex flex-col" style={{ borderColor: COLORS.bone }}>
            <Quote size={22} style={{ color: COLORS.bronze }} />
            <p className="font-body text-sm mt-4 flex-1" style={{ color: COLORS.charcoal }}>&ldquo;{q.quote}&rdquo;</p>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: COLORS.bone }}>
              <p className="font-body text-sm font-semibold" style={{ color: COLORS.charcoal }}>{q.name}</p>
              <p className="font-mono text-xs" style={{ color: COLORS.slate }}>{q.org}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <p className="font-mono text-xs" style={{ color: COLORS.slate }}>* Sample quotes — replace with real client testimonials before publishing.</p>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' });
  const sent = new URLSearchParams(window.location.search).has('sent');
  const returnUrl = `${window.location.origin}${window.location.pathname}?sent=1`;

  const field = (key, label, type = 'text') => (
    <div className="mb-5">
      <label className="font-mono text-xs tracking-wider block mb-2" style={{ color: COLORS.slate }}>{label.toUpperCase()}</label>
      {type === 'textarea' ? (
        <textarea
          rows={5}
          name={key}
          value={form[key]}
          required
          onChange={e => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-4 py-3 font-body text-sm rounded-sm border focus:outline-none"
          style={{ borderColor: COLORS.bone, color: COLORS.charcoal, background: '#fff' }}
        />
      ) : (
        <input
          type={type}
          name={key}
          value={form[key]}
          required={key !== 'organization'}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-4 py-3 font-body text-sm rounded-sm border focus:outline-none"
          style={{ borderColor: COLORS.bone, color: COLORS.charcoal, background: '#fff' }}
        />
      )}
    </div>
  );

  return (
    <div style={{ background: COLORS.paper }}>
      <ArticleHeader eyebrow="ARTICLE V — CONTACT" title="Start the conversation." />
      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-14">
        <div>
          <p className="font-body text-base mb-8" style={{ color: COLORS.slate }}>
            Tell us about your board or institution and what prompted the inquiry. We reply within two business days with next steps.
          </p>
          {sent ? (
            <div className="p-6 border rounded-sm flex items-center gap-3" style={{ borderColor: COLORS.bronze }}>
              <CheckCircle2 style={{ color: COLORS.bronzeDeep }} />
              <p className="font-body text-sm" style={{ color: COLORS.charcoal }}>Thank you — your inquiry has been sent. We reply within two business days.</p>
            </div>
          ) : (
            <form action={INQUIRY_ENDPOINT} method="POST">
              <input type="hidden" name="_subject" value="New inquiry — Governaxis Advisory website" />
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={returnUrl} />
              {field('name', 'Full Name')}
              {field('email', 'Email', 'email')}
              {field('organization', 'Organization')}
              {field('message', 'Message', 'textarea')}
              <button type="submit" className="inline-flex items-center gap-2 font-body px-6 py-3 rounded-sm" style={{ ...GLASS_BRONZE, color: COLORS.ink }}>
                Send Inquiry <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
        <div className="space-y-6">
          <div className="p-6 border rounded-sm" style={{ borderColor: COLORS.bone }}>
            <MapPin style={{ color: COLORS.bronzeDeep }} className="mb-3" />
            <p className="font-mono text-xs mb-1" style={{ color: COLORS.slate }}>OFFICE</p>
            <p className="font-body text-sm" style={{ color: COLORS.charcoal }}>Nairobi, Kenya</p>
          </div>
          <div className="p-6 border rounded-sm" style={{ borderColor: COLORS.bone }}>
            <Mail style={{ color: COLORS.bronzeDeep }} className="mb-3" />
            <p className="font-mono text-xs mb-1" style={{ color: COLORS.slate }}>EMAIL</p>
            <p className="font-body text-sm" style={{ color: COLORS.charcoal }}>hello@governaxisadvisory.co.ke</p>
          </div>
          <div className="p-6 border rounded-sm" style={{ borderColor: COLORS.bone }}>
            <Phone style={{ color: COLORS.bronzeDeep }} className="mb-3" />
            <p className="font-mono text-xs mb-1" style={{ color: COLORS.slate }}>PHONE</p>
            <p className="font-body text-sm" style={{ color: COLORS.charcoal }}>+254 7XX XXX XXX</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(() => (new URLSearchParams(window.location.search).has('sent') ? 'contact' : 'home'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const pages = {
    home: <HomePage setActive={setActive} />,
    about: <AboutPage />,
    services: <ServicesPage setActive={setActive} />,
    team: <TeamPage />,
    testimonials: <TestimonialsPage />,
    contact: <ContactPage />,
  };

  return (
    <div className="min-h-screen font-body" style={{ background: COLORS.paper }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        button { cursor: pointer; transition: box-shadow 0.2s ease, background 0.2s ease; }
        button:hover { filter: brightness(1.08); }
        *:focus-visible { outline: 2px solid ${COLORS.bronze}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>
      <NavBar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {pages[active]}
      <Footer setActive={setActive} />
    </div>
  );
}
