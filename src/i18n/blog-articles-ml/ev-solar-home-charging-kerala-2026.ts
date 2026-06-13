import type { BlogArticleMl } from '../blog-ml.ts';

export const article: BlogArticleMl = {
  slug: 'ev-solar-home-charging-kerala-2026',
  title: 'EV + സോളാർ വീട്ടിൽ: ഇലക്ട്രിക് വാഹന ചാർജിംഗിന് റൂഫ്ടോപ്പ് സിസ്റ്റം എങ്ങനെ വലുപ്പം നിശ്ചയിക്കാം',
  description:
    'കേരളത്തിൽ വീട്ടിൽ EV ചാർജ് ചെയ്യാൻ പ്ലാൻ ചെയ്യുന്നോ? വാൾ-ബോക്സ് ലോഡ്, പകൽ ചാർജിംഗ്, നെറ്റ് മീറ്ററിംഗ്, PM സൂര്യ ഘർ സബ്സിഡി — 2026 ഗൈഡ്.',
  date: '7 ജൂൺ 2026',
  categoryKey: 'buying',
  readTime: '6 മിനിറ്റ് വായന',
  related: [
    { slug: 'kseb-time-of-day-tariff-solar-2026', title: 'ടൈം-ഓഫ്-ഡേ താരിഫും സോളാറും' },
    { slug: 'solar-battery-storage-kerala-2026', title: 'സോളാർ + ബാറ്ററി' },
    { slug: 'how-much-does-solar-cost-in-kerala', title: 'കേരളത്തിൽ സോളാർ ചെലവ്' },
  ],
  sidebarHighlight: {
    icon: '🚗',
    title: 'Smart charge',
    text: 'പകൽ സോളാറിൽ ചാർജ് — peak tariff-ും banking limit-ും ഒഴിവാക്കി ഏറ്റവും low-cost km.',
  },
  postCta: {
    title: 'വീടും EV-യും ഒരുമിച്ച് size ചെയ്യുക',
    text: 'റയെന്ന എനർജി MNRE-അംഗീകൃത, ALMM-അനുയോജ്യ, honest EV load modelling.',
    btn: 'സോളാർ കാൽക്കുലേറ്റർ →',
    href: '/ml/solar-calculator/',
  },
  content: `<p class="post-lead">FY26-ൽ ഇന്ത്യയിൽ EV വിൽപ്പന 2 million കടന്നു. കേരളത്തിലെ ചെറിയ commute, ഉയർന്ന KSEB ബിൽ — home charging attractive- ആക്കുന്നു. ഞങ്ങൾ weekly കേൾക്കുന്ന ചോദ്യം: <em>"EV വാങ്ങുന്നു — എത്ര extra solar?"</em> 2026-നുള്ള clear answer.</p>

<h2>EV load sizing എങ്ങനെ മാറ്റുന്നു</h2>
<p>Typical commute <strong>8–15 kWh/day</strong>. 3.3 kW wall box-ൽ 4 hrs charge ≈ extra 1.5-ton AC load — often രാത്രി, panels produce ചെയ്യുമ്പോൾ അല്ല.</p>
<p>KSERC 2026 rules-ൽ daytime export, peak evening draw increasingly constrained. Sunset-ന് ശേഷം charge — storage/shift ഇല്ലെങ്കിൽ banking benefit കുറയും.</p>

<div class="post-callout">
  <span class="callout-icon">⚡</span>
  <div><strong>ഒരു EV-ക്ക് rule of thumb</strong><p>~40 km/day commute-ന് baseline-ന് മുകളിൽ <strong>1.5–2.5 kW extra solar</strong> (അല്ലെങ്കിൽ disciplined daytime charging).</p></div>
</div>

<h2>Charger type vs solar</h2>
<div class="cost-table">
  <div class="cost-row cost-row--header"><span>Charger</span><span>Typical use</span><span>Extra energy/day</span></div>
  <div class="cost-row"><span>2.3 kW plug</span><span>6–8 hrs night</span><span>~12–18 kWh</span></div>
  <div class="cost-row"><span>3.3 kW wall box</span><span>3–5 hrs</span><span>~10–16 kWh</span></div>
  <div class="cost-row"><span>7.4 kW AC</span><span>1.5–2 hrs</span><span>~11–15 kWh</span></div>
  <div class="cost-row"><span>Daytime solar charge</span><span>10 am – 3 pm</span><span>Direct self-use — best</span></div>
</div>

<h2>കേരളത്തിൽ മൂന്ന് strategies</h2>
<ul class="post-list">
  <li><strong>Rooftop upsize</strong> — <a href="/ml/solar-calculator/">calculator</a> EV section.</li>
  <li><strong>Solar hours-ൽ charge</strong> — 9 am–4 pm self-consumption max.</li>
  <li><strong>Battery</strong> — night must-charge-ആ면 <a href="/ml/blog/solar-battery-storage-kerala-2026/">battery guide</a>.</li>
</ul>

<h2>Subsidy 2026</h2>
<p>PM സൂര്യ ഘർ ₹78,000 വരെ — ജൂൺ 2026-ൽ ALMM panels required. EV subsidy tier മാറ്റുന്നില്ല; kW install ചെയ്യേണ്ട size മാറ്റുന്നു.</p>

<h2>Example: 5 kW home + one EV</h2>
<p>2 AC, geyser, ₹5,000 bill → often 4–5 kW. 3.3 kW × 4 hrs × 5 days/week → ~3–4 extra units/day avg. Many families <strong>6–7 kW</strong> or 5 kW + strict daytime charging.</p>

<div class="post-cta">
  <h3>വീടും EV-യും ഒരുമിച്ച് size ചെയ്യുക</h3>
  <p>റയെന്ന എനർജി integrated systems — honest EV load modelling.</p>
  <a href="/ml/solar-calculator/" class="btn btn-primary">കാൽക്കുലേറ്റർ പരീക്ഷിക്കുക →</a>
</div>`,
};
