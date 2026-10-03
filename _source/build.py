"""Stamps the shared header/footer into each page. Run from the site root: python3 _source/build.py"""
import pathlib, re

ROOT = pathlib.Path(__file__).parent
A = "https://gurukrupa-website.vercel.app/assets/"  # image host — swap for your own /assets path when you deploy

PAGES = {
    "index.html": ("Gurukrupa Export — India’s Largest Diamond Jewellery Manufacturer, Since 1962",
                   "India’s largest diamond jewellery manufacturer, crafting since 1962. 1,500+ craftsmen, 1,000+ new designs every month, offices across India.", "home"),
    "about.html": ("About Gurukrupa Export — Legacy, Leadership & Sustainability",
                   "Since 1962, three generations of the Ramani family have built Gurukrupa Export into one of India’s leading diamond jewellery manufacturers.", "about"),
    "collections.html": ("Jewellery Collections — Gurukrupa Export",
                         "Explore Gurukrupa Export’s diamond jewellery collections: Desert Queen, Kadaksha, Blossom, Kanchi and more.", "collections"),
    "why-gurukrupa.html": ("Why Gurukrupa — Design, Manufacturing & Partner Technology",
                           "End-to-end diamond jewellery manufacturing for brands and retailers: design, CAD, close-setting, quality and a cloud ERP partner portal.", "why"),
    "contact.html": ("Contact Gurukrupa Export — Trade Enquiries & Offices Across India",
                     "Trade enquiries, partnerships and careers. Offices in Surat, Mumbai, Chennai, Bengaluru, Coimbatore and Hyderabad.", "contact"),
}

ICON = {
    "wa": '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/><path d="M9 9.5c.5 2 2.5 4 4.5 4.5l1.2-1.2 2 1-.5 1.7c-3.5 0-7.7-4.2-7.7-7.7l1.7-.5 1 2z"/></svg>',
    "mail": '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/></svg>',
    "phone": '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    "pin": '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    "clock": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    "cal": '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    "fb": '<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>',
    "ig": '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/></svg>',
    "li": '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>',
    "yt": '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/></svg>',
    "x": '<svg viewBox="0 0 24 24"><path d="M4 4l16 16M20 4L4 20"/></svg>',
}

def nav_link(href, label, key, active):
    cls = ' class="active" aria-current="page"' if key == active else ""
    return f'<li><a href="{href}"{cls}>{label}</a></li>'

def header(active):
    links = [("index.html", "Home", "home"), ("about.html", "About", "about"), ("collections.html", "Collections", "collections"),
             ("why-gurukrupa.html", "Why Gurukrupa", "why"), ("about.html#sustainability", "Sustainability", "sus"), ("contact.html", "Contact", "contact")]
    menu = "".join(nav_link(h, l, k, active) for h, l, k in links)
    mob = "".join(f'<a href="{h}">{l}</a>' for h, l, k in links)
    return f'''<div class="preloader" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M10 18 L18 8 H30 L38 18 L24 40 Z M10 18 H38 M18 8 L24 18 L30 8 M24 18 L24 40"/></svg></div>
<a class="btn btn-rose" href="#main" style="position:absolute;left:-9999px;top:8px;z-index:200" onfocus="this.style.left='8px'" onblur="this.style.left='-9999px'">Skip to content</a>
<header class="site-header{' always' if active != 'home' else ''}">
  <nav class="nav" aria-label="Main">
    <a class="brand" href="index.html" aria-label="Gurukrupa Export — home">
      <img src="{A}logo_bg-DNAN09pH.png" alt="Gurukrupa Export" width="84" height="54">
      <span class="brand-text">GURUKRUPA</span>
    </a>
    <ul class="menu">{menu}</ul>
    <div class="nav-cta">
      <a class="login" href="http://13.234.27.130:8080/login">Partner Login</a>
      <a class="btn btn-rose" href="contact.html#enquire">Trade Enquiry</a>
      <button class="burger" aria-label="Open menu" aria-expanded="false"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
    </div>
  </nav>
</header>
<div class="mobile-menu">{mob}<a href="contact.html#enquire" style="color:var(--rose)">Trade Enquiry →</a></div>'''

FOOTER = f'''<footer class="site-footer">
  <div class="wrap">
    <div class="foot">
      <div>
        <a class="brand" href="index.html" aria-label="Gurukrupa Export — home"><img src="{A}logo_bg-DNAN09pH.png" alt="Gurukrupa Export" width="84" height="54"><span class="brand-text">GURUKRUPA</span></a>
        <p style="margin-top:18px;max-width:340px">India’s largest diamond jewellery manufacturer, crafting since 1962.<br>210, 2nd Floor, Princess Plaza, Mini Bazar, Varachha Road, Surat, Gujarat – 395006</p>
        <div class="social">
          <a href="https://www.facebook.com/gurukrupaexport/" aria-label="Facebook">{ICON["fb"]}</a>
          <a href="https://www.instagram.com/gurukrupaexports" aria-label="Instagram">{ICON["ig"]}</a>
          <a href="https://www.linkedin.com/in/gurukrupa-exports-1b7ab597" aria-label="LinkedIn">{ICON["li"]}</a>
          <a href="https://www.youtube.com/@gurukrupaexports" aria-label="YouTube">{ICON["yt"]}</a>
          <a href="https://x.com/gurukrupaexport" aria-label="X (Twitter)">{ICON["x"]}</a>
        </div>
      </div>
      <div><h4>Company</h4><ul><li><a href="about.html">About Us</a></li><li><a href="about.html#legacy">History</a></li><li><a href="about.html#leadership">Leadership</a></li><li><a href="about.html#sustainability">Sustainability</a></li><li><a href="contact.html#careers">Careers</a></li></ul></div>
      <div><h4>Discover</h4><ul><li><a href="collections.html">Collections</a></li><li><a href="collections.html#categories">Categories</a></li><li><a href="why-gurukrupa.html">Why Gurukrupa</a></li><li><a href="why-gurukrupa.html#portal">Partner Portal</a></li></ul></div>
      <div><h4>Contact</h4><ul><li><a href="tel:02613604100">0261 3604100</a></li><li><a href="mailto:info@gkexport.com">info@gkexport.com</a></li><li><a href="contact.html#offices">Our Offices</a></li><li><a href="contact.html#enquire">Trade Enquiry</a></li></ul></div>
    </div>
    <div class="foot-bottom"><span>© <span class="year">2026</span> Gurukrupa Export Pvt. Ltd. All rights reserved.</span><span style="display:flex;gap:22px"><a href="#">Terms &amp; Conditions</a><a href="#">Privacy Policy</a></span></div>
  </div>
</footer>
<a class="fab" href="https://wa.me/[WHATSAPP-NUMBER]" aria-label="Chat with our trade team on WhatsApp">{ICON["wa"]}</a>'''

def page(fname, body):
    title, desc, active = PAGES[fname]
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#23121A">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="{A}SoloCollection-Ds7GtrpO.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
{header(active)}
<main id="main">
{body}
</main>
{FOOTER}
<script src="assets/js/main.js" defer></script>
</body>
</html>
'''

def expand(text):
    text = text.replace("%%A%%", A)
    return re.sub(r"%%ICON:(\w+)%%", lambda m: ICON[m.group(1)], text)

if __name__ == "__main__":
    for fname in PAGES:
        body = expand((ROOT / "src" / fname).read_text())
        out = ROOT.parent if ROOT.name == "_source" else ROOT / "dist"
        out.mkdir(exist_ok=True)
        (out / fname).write_text(page(fname, body))
        print("built", fname)
