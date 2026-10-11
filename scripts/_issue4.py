# -*- coding: utf-8 -*-
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

def claim(k: str) -> str:
    t = (ROOT / "src/data/claims.ts").read_text(encoding="utf-8")
    m = re.search(rf"{k}:\s*'((?:\\'|[^'])*)'", t)
    if not m:
        raise KeyError(k)
    return m.group(1).replace("\\'", "'")

def main() -> None:
    zero_en = claim("zeroBillEn")
    zero_ml = claim("zeroBillMl")
    trust_ml = claim("calculatorSubsidyTrustMl")

    cm = ROOT / "src/i18n/calculator-ml.ts"
    mt = cm.read_text(encoding="utf-8")
    # Find trust item text that mentions PM and subsidy eligibility for every system
    m = None
    for mm in re.finditer(r"text: '((?:\\'|[^'])*)'", mt):
        s = mm.group(1)
        if "PM" in s and "സബ്സിഡി" in s and ("ഓരോ" in s or "അർഹ" in s):
            m = mm
            break
    if not m:
        raise SystemExit("calc ml trust not found")
    mt = mt[: m.start(1)] + trust_ml + mt[m.end(1) :]
    cm.write_text(mt, encoding="utf-8")
    print("calc ml OK")

    ui = ROOT / "src/i18n/ui.ts"
    t = ui.read_text(encoding="utf-8")
    t = t.replace(
        "Over half of Kerala PM Surya Ghar homes recorded zero energy charges",
        zero_en,
    )
    matches = list(re.finditer(r"\{ icon: '₹0', text: '((?:\\'|[^'])*)' \}", t))
    if len(matches) != 2:
        raise SystemExit("₹0 count %s" % len(matches))
    t = t[: matches[1].start(1)] + zero_ml + t[matches[1].end(1) :]
    t = t.replace(
        "whoStatSatisfied: 'Client satisfaction'",
        "whoStatSatisfied: 'Panel performance warranty'",
    )
    parts = list(re.finditer(r"whoStatSatisfied: '((?:\\'|[^'])*)'", t))
    if len(parts) < 2:
        raise SystemExit("whoStatSatisfied")
    # ML label: reuse words from claims panelPerformanceWarrantyMl + find പാനൽ in file
    # Simple: "25 " + first words from manufacturer or panel warranty ml
    panel_w = claim("panelPerformanceWarrantyMl")  # e.g. 25 വർഷം
    # Find a phrase with പ്രകടന in ui or claims
    label_ml = panel_w + " പാനൽ പ്രകടന വാറന്റി"
    # If that creates duplication when panel_w already has years, OK
    t = t[: parts[1].start(1)] + label_ml + t[parts[1].end(1) :]
    ui.write_text(t, encoding="utf-8")
    print("ui OK")

    for rel in ("src/pages/index.astro", "src/pages/ml/index.astro"):
        path = ROOT / rel
        ht = path.read_text(encoding="utf-8")
        old = (
            '            <span class="stat-number" data-target="100">100</span>\n'
            '            <span class="stat-suffix">%</span>'
        )
        new = (
            '            <span class="stat-number" data-target="25">25</span>\n'
            '            <span class="stat-suffix">yr</span>'
        )
        if old not in ht:
            raise SystemExit("stat miss " + rel)
        ht = ht.replace(old, new).replace("by 70 to 80%", "by up to 80%")
        path.write_text(ht, encoding="utf-8")
        print("stats", rel)

    faqs = ROOT / "src/pages/faqs.astro"
    ft = faqs.read_text(encoding="utf-8")
    old = (
        "Yes — many Kerala households already do. PM Surya Ghar data shows over half of the State\\'s "
        "rooftop applicants recorded zero energy charges in a recent billing month when systems are "
        "sized to real usage and net metering is set up correctly."
    )
    new = (
        "Yes — many Kerala households already do. "
        + zero_en
        + " when systems are sized to real usage and net metering is set up correctly."
    )
    if old not in ft:
        raise SystemExit("faq en zero miss")
    faqs.write_text(ft.replace(old, new), encoding="utf-8")
    print("faq en OK")

    mlf = ROOT / "src/i18n/faqs-ml.ts"
    mt = mlf.read_text(encoding="utf-8")
    # Find zero-bill answer by unique English-free marker in question - search for icon-less string
    # Use: find "ശൂന്യ വൈദ്യുതി ബിൽ" via reading bytes of known substring from file itself
    # Locate by finding answers that contain both markers
    half_markers = []
    for token in mt.split("'"):
        if "അർദ്ധത്തിലധികം" in token or "പകുതിയിലധികം" in token:
            half_markers.append(token)
    if not half_markers:
        raise SystemExit("no half markers in faqs-ml")
    # Soften only the FAQ answer that also mentions ശൂന്യ / ബില്ലിംഗ്
    for token in half_markers:
        if "ബില്ലിംഗ്" in token or "ശൂന്യ" in token:
            # replace first sentence containing the half word
            softened = re.sub(
                r"[^.]*?(?:അർദ്ധത്തിലധികം|പകുതിയിലധികം)[^.]*\.",
                zero_ml + ".",
                token,
                count=1,
            )
            if softened == token:
                raise SystemExit("soften failed")
            mt = mt.replace(token, softened, 1)
            break
    else:
        raise SystemExit("no suitable half FAQ token")
    mlf.write_text(mt, encoding="utf-8")
    print("faq ml OK")

    blog_idx = ROOT / "src/pages/blog/index.astro"
    bi = blog_idx.read_text(encoding="utf-8")
    bi = bi.replace(
        "Over half of Kerala\u2019s PM Surya Ghar applicants recorded zero energy charges in a recent billing cycle. What that means for families still planning solar in 2026.",
        zero_en + ". What that means for families still planning solar in 2026.",
    )
    # try ascii apostrophe variant
    bi = bi.replace(
        "Over half of Kerala's PM Surya Ghar applicants recorded zero energy charges in a recent billing cycle. What that means for families still planning solar in 2026.",
        zero_en + ". What that means for families still planning solar in 2026.",
    )
    blog_idx.write_text(bi, encoding="utf-8")

    post = ROOT / "src/pages/blog/kerala-zero-bill-rooftop-solar-2026.astro"
    pt = post.read_text(encoding="utf-8")
    replacements = [
        (
            "Over half of Kerala\u2019s PM Surya Ghar rooftop solar applicants recorded zero energy charges in a recent billing cycle. What that means for families still planning solar in 2026.",
            zero_en + ". What that means for families still planning solar in 2026.",
        ),
        (
            "Government data under the PM Surya Ghar: Muft Bijli Yojana shows Kerala among India\u2019s strongest performers: more than half of the State\u2019s rooftop solar applicants recorded <strong>zero energy consumption charges</strong> in a recent monthly billing cycle. That is not marketing \u2014 it is what net metering looks like when a system is sized to your real usage.",
            "Under PM Surya Ghar, many Kerala homes with right-sized rooftop solar have recorded <strong>near-zero electricity bills</strong> in a billing month when net metering is set up correctly. That is what careful sizing looks like \u2014 not a guaranteed outcome for every roof.",
        ),
        (
            "Across India, roughly one in four PM Surya Ghar beneficiaries paid zero energy charges in a surveyed month, thanks to rooftop generation adjusted against grid use through net metering. Kerala topped the share ranking \u2014 over <strong>50%</strong> of about <strong>3.64 lakh</strong> applicants \u2014 ahead of Rajasthan and other large solar states. In absolute headcount, bigger states like Gujarat still lead, but Kerala\u2019s <em>hit rate</em> shows how well rooftop solar fits a domestic-heavy grid.",
            "Rooftop generation adjusted against grid use through net metering is why many Kerala homes see near-zero energy charges in a good month. Results still depend on system size, daytime self-use, roof shade, and paperwork \u2014 not on a single statewide percentage alone.",
        ),
        (
            "Over half of PM Surya Ghar applicants here saw zero energy charges in a recent cycle \u2014 design quality is the difference.",
            zero_en + " \u2014 design quality is the difference.",
        ),
        (
            "Kerala\u2019s zero-bill numbers prove rooftop solar works here at scale. The families joining that list in 2026 will be the ones who treat design as seriously as subsidy \u2014 and who act while the \u20b978,000 central support window is still open.",
            "Kerala shows rooftop solar can drive near-zero bills at household scale when design is taken seriously. Families who match system size to real usage \u2014 and complete subsidy paperwork with a registered installer \u2014 are best placed to get there while central support remains available under current guidelines.",
        ),
    ]
    for a, b in replacements:
        if a not in pt:
            # try with ASCII apostrophe
            a2 = a.replace("\u2019", "'").replace("\u2014", "—")
            b2 = b.replace("\u2019", "'")
            if a2 in pt:
                pt = pt.replace(a2, b2)
            else:
                print("MISS:", a[:60])
                raise SystemExit("blog miss")
        else:
            pt = pt.replace(a, b)
    post.write_text(pt, encoding="utf-8")
    print("blog en OK")

    ml_blog = ROOT / "src/i18n/blog-articles-ml/kerala-zero-bill-rooftop-solar-2026.ts"
    bt = ml_blog.read_text(encoding="utf-8")
    # Replace sentences with half/50% markers
    def repl_sentence(match):
        return zero_ml + "."

    bt2 = re.sub(
        r"[^.\"'<]*?(?:പകുതിയിലധികം|50%-ത്തിലധികം)[^.\"'>]*\.",
        repl_sentence,
        bt,
    )
    # Also inside HTML strong tags etc - broader
    for token in ["പകുതിയിലധികം പേർക്ക്", "പകുതിയിലധികം", "50%-ത്തിലധികം"]:
        if token in bt2:
            # replace with soft word from zero_ml start
            soft = "പല"
            bt2 = bt2.replace(token, soft)
    ml_blog.write_text(bt2, encoding="utf-8")
    print("blog ml OK")
    print("Issue 4 done")

if __name__ == "__main__":
    main()
