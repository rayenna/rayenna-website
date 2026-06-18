import type { BlogArticleMl } from '../blog-ml.ts';

export const article: BlogArticleMl = {
  slug: 'solar-sizing-ac-load-kerala-2026',
  title: 'AC ലോഡിന് സോളാർ വലുപ്പം: കേരള ഗ്രീഷ്മകാല ബില്ലുകൾ, peak demand, ശരിയായ system size',
  description:
    'കേരളത്തിൽ ഗ്രീഷ്മകാലം AC-യാൽ KSEB ബിൽ spike. AC load-ന് rooftop solar എങ്ങനെ size ചെയ്യാം — 2026 payback-ും.',
  date: '7 ജൂൺ 2026',
  categoryKey: 'education',
  readTime: '5 മിനിറ്റ് വായന',
  related: [
    { slug: 'solar-vs-electricity-bill-comparison', title: 'സോളാർ vs KSEB ബിൽ' },
    { slug: 'kseb-time-of-day-tariff-solar-2026', title: 'ടൈം-ഓഫ്-ഡേ താരിഫ്' },
    { slug: 'how-much-does-solar-cost-in-kerala', title: 'സോളാർ ചെലവ്' },
  ],
  sidebarHighlight: {
    icon: '🌡️',
    title: 'Summer-ready sizing',
    text: 'Annual average അല്ല — hottest month-ന് size ചെയ്യുക; അപ്പോഴാണ് ബിൽ hurt ചെയ്യുന്നത്.',
  },
  postCta: {
    title: 'Panels വാങ്ങുന്നതിന് മുമ്പ് AC load model ചെയ്യുക',
    text: 'റയെന്ന actual appliance mix-ൽ നിന്ന് sizing — generic per-kW templates അല്ല.',
    btn: 'എന്റെ സമ്പാദ്യം കണക്കാക്കുക →',
    href: '/ml/solar-calculator/',
  },
  content: `<p class="post-lead">ഏപ്രിൽ മുതൽ Kerala pattern: temperature up, AC long run, KSEB bill jump — two-three splits full day-ൽ often double. Rooftop solar directly targets that spike. Annual average bill-ൽ നിന്ന് size ചെയ്താൽ miss ആകും. AC load honestly എങ്ങനെ think ചെയ്യാം.</p>

<h2>AC എത്ര power?</h2>
<p>1.5-ton inverter split compressor run-ൽ <strong>1,200–1,800 W</strong>. Two units eight hrs hot day → <strong>15–25 kWh</strong> before geyser, fridge, EV.</p>
<p>Monsoon AC hours കുറയും; fans, indoor time baseload high. <em>Peak season</em>-ന് size — 12-month average അല്ല.</p>

<div class="post-callout">
  <span class="callout-icon">❄️</span>
  <div><strong>Daily AC energy reference</strong><p>1 × 1.5-ton, 8 hrs ≈ <strong>8–12 kWh</strong>. 2 × AC, 10 hrs ≈ <strong>18–28 kWh</strong>. 3+ AC villa <strong>35+ kWh/day</strong> peak-ിൽ.</p></div>
</div>

<h2>AC count by typical size</h2>
<div class="cost-table">
  <div class="cost-row cost-row--header"><span>Profile</span><span>Solar size</span><span>Notes</span></div>
  <div class="cost-row"><span>1 AC + standard</span><span>3–4 kW</span><span>₹3,000–4,500/month bill</span></div>
  <div class="cost-row"><span>2 AC + geyser</span><span>4–6 kW</span><span>Common family home</span></div>
  <div class="cost-row"><span>3+ AC / villa</span><span>6–10 kW</span><span>Roof; GSC above 10 kW</span></div>
  <div class="cost-row"><span>AC mostly night</span><span>Storage or upsize</span><span>Banking limits</span></div>
</div>

<h2>Daytime vs night AC</h2>
<p>WFH / retirees — solar hours AC → excellent self-use. Office-goers bedroom 6 pm+ → banking capped KSERC 2026.</p>
<p>Evening-heavy: larger system, 5–10 kWh battery, or pre-cool before sunset. Wrong answer: <em>when</em> you run AC ignore ചെയ്യുക.</p>

<h2>Inverter AC, star rating</h2>
<ul class="post-list">
  <li><strong>Inverter AC</strong> — average draw smooth; solar match better.</li>
  <li><strong>5-star</strong> helps; humidity real runtimes longer than lab.</li>
  <li><strong>Sealing</strong> — leaks fix before panel upsize.</li>
  <li><a href="/ml/solar-calculator/">Calculator</a> — AC count + hours.</li>
</ul>

<h2>Payback</h2>
<p>Well-sized AC system Kerala <strong>5–7 years</strong> after subsidy; daytime self-use high-ആ면 faster. Oversize cost only; undersize peak summer grid AC bill.</p>

<div class="post-cta">
  <h3>Panels-ന് മുമ്പ് AC load model</h3>
  <p>റയെന്ന actual appliances-ൽ നിന്ന് sizing.</p>
  <div class="post-cta__actions">
    <a href="/ml/solar-calculator/" class="btn btn-primary">എന്റെ സമ്പാദ്യം കണക്കാക്കുക →</a>
    <a href="/ml/contact/" class="btn btn-cta-secondary">സൗജന്യ സൈറ്റ് സർവേ ബുക്ക് ചെയ്യുക</a>
  </div>
</div>`,
};
