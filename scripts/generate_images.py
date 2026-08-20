# Generate branded cover images for the SustainSutra website.
# Deterministic PIL rendering (no Chrome/font-loading race conditions).
# Outputs to D:/Application_Dev/sustainsutra-main/public/images/...
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = r"D:\Application_Dev\sustainsutra-main\public"
NAVY = (11, 15, 11)        # #0B0F0B
NAVY_LIGHT = (18, 24, 32)  # #121820
GOLD = (212, 175, 55)      # #D4AF37
OFFWHITE = (248, 250, 252) # #F8FAFC
DIMMED = (160, 170, 181)   # #A0AAB5

W, H = 1200, 630          # OG standard

# Font discovery: prefer Montserrat (brand font at D:\SustainSutra), else common Windows fonts
def find_font(candidates, size):
    for name in candidates:
        for path in (name,
                     rf"C:\Windows\Fonts\{name}",
                     rf"D:\SustainSutra\branding\fonts\{name}",
                     rf"D:\SustainSutra\visiting_card\{name}"):
            if os.path.exists(path):
                try:
                    return ImageFont.truetype(path, size)
                except Exception:
                    pass
    return ImageFont.load_default()

F_BOLD = lambda s: find_font(["Montserrat-Bold.ttf", "Montserrat SemiBold.ttf", "segoouib.ttf", "segoeuib.ttf", "Arial Bold.ttf", "arialbd.ttf"], s)
F_REG  = lambda s: find_font(["Montserrat-Regular.ttf", "Montserrat Medium.ttf", "segoeui.ttf", "arial.ttf"], s)
F_LIGHT= lambda s: find_font(["Montserrat-Light.ttf", "segoeuil.ttf", "arial.ttf"], s)

def hex_to_rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def text_w(draw, txt, font):
    b = draw.textbbox((0, 0), txt, font=font); return b[2]-b[0]

def make_cover(fname, kicker, title_lines, accent=GOLD, sub=None, w=W, h=H):
    """Dark navy cover with gold accent bar, kicker, big title, subtle brand mark."""
    img = Image.new("RGB", (w, h), NAVY)
    d = ImageDraw.Draw(img)

    # subtle vertical gradient (navy -> navy_light top-right)
    grad = Image.new("RGB", (w, h), NAVY_LIGHT)
    mask = Image.new("L", (w, h), 0)
    dm = ImageDraw.Draw(mask)
    dm.ellipse([w//2, -h, w*2, h], fill=110)
    mask = mask.filter(ImageFilter.GaussianBlur(180))
    img.paste(grad, (0, 0), mask)
    d = ImageDraw.Draw(img)

    # thin gold frame accent (top-left corner)
    d.rectangle([48, 48, 48+64, 48+6], fill=accent)
    d.rectangle([48, 48, 48+6, 48+64], fill=accent)

    # kicker
    kf = F_BOLD(26)
    d.text((64, 84), kicker.upper(), font=kf, fill=accent)

    # title (wrapped, big)
    tf = F_BOLD(64)
    y = 150
    for line in title_lines:
        d.text((64, y), line, font=tf, fill=OFFWHITE)
        y += 78

    # optional subtitle
    if sub:
        sf = F_REG(28)
        d.text((64, y + 16), sub, font=sf, fill=DIMMED)

    # brand footer
    bf = F_BOLD(24)
    d.text((64, h-80), "SUSTAINSUTRA", font=bf, fill=OFFWHITE)
    uf = F_REG(20)
    d.text((64 + text_w(d, "SUSTAINSUTRA", bf) + 16, h-78), "| ESG . Carbon . Compliance", font=uf, fill=DIMMED)

    # website bottom-right
    wf = F_REG(20)
    d.text((w - text_w(d, "sustainsutra.in", wf) - 64, h-78), "sustainsutra.in", font=wf, fill=DIMMED)

    out = os.path.join(ROOT, fname)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out, quality=92)
    print("saved", out)

# ---------- OG image (site-wide) ----------
make_cover("og-image.png",
           "SustainSutra GreenTech",
           ["ESG Advisory &", "Net-Zero Strategy"],
           sub="Carbon . CBAM . BRSR . Energy . Water . EPD")

# ---------- Blog covers ----------
blogs = [
    ("images/blog/cbam-definitive-2026.jpg", "Carbon Markets", ["EU CBAM 2026:", "The Definitive Period", "Has Begun"]),
    ("images/blog/uk-cbam-2027.jpg", "Carbon Markets", ["UK CBAM", "Arrives January", "2027"]),
    ("images/blog/india-ccts-explained.jpg", "Carbon Markets", ["India's CCTS:", "Obligation to", "Opportunity"]),
    ("images/blog/scope-3-primer.jpg", "GHG Accounting", ["Scope 3:", "The 80% You", "Cannot See"]),
    ("images/blog/brsr-assurance-readiness.jpg", "ESG & Reporting", ["BRSR Beyond", "Compliance:", "Assurance-Ready"]),
    ("images/blog/epd-verification-findings.jpg", "LCA & EPD", ["EPD Verification", "Under", "EN 15804+A2"]),
    ("images/blog/water-audit-hidden-profit.jpg", "Resource Efficiency", ["The Hidden Profit", "in Your", "Water Balance"]),
    ("images/blog/ghg-verification-discipline.jpg", "GHG Accounting", ["GHG Verification:", "Materiality &", "Evidence"]),
]
for f, k, t in blogs:
    make_cover(f, k, t)

# ---------- Case study covers (16:10) ----------
cases = [
    ("images/cases/water-audit-complex.jpg", "Case Study . Water", ["Integrated Water Audit,", "Coal-Tar Complex"], "5,050 -> 2,775 kld roadmap"),
    ("images/cases/stp-programme.jpg", "Case Study . Wastewater", ["Decentralised STP", "Programme . 215 kld"], "7 DPRs . 3 sites"),
    ("images/cases/phenol-treatment.jpg", "Case Study . Effluent", ["Phenol-Laden Effluent:", "End of Dilution"], "360 kld/day saved"),
    ("images/cases/esms-portfolio.jpg", "Case Study . ESMS", ["ESMS for a 43-Site", "Renewable Portfolio"], "Solar . Hydro . BESS"),
]
for f, k, t, s in cases:
    make_cover(f, k, t, sub=s, w=1200, h=750)

print("ALL DONE")
