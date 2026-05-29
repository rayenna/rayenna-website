import type { BlogArticleMl } from '../blog-ml.ts';
import { article as almmMadeInIndiaSolarPanels2026 } from './almm-made-in-india-solar-panels-2026.ts';
import { article as pmSuryaGharOneCroreHomes2026 } from './pm-surya-ghar-one-crore-homes-2026.ts';
import { article as virtualNetMeteringKerala2026 } from './virtual-net-metering-kerala-2026.ts';
import { article as ksebNetMeteringRules2026 } from './kseb-net-metering-rules-2026.ts';
import { article as solarTradeWarIndiaBuyers2026 } from './solar-trade-war-india-buyers-2026.ts';
import { article as solarBatteryStorageKerala2026 } from './solar-battery-storage-kerala-2026.ts';
import { article as goingSolarKochiGuide2025 } from './going-solar-kochi-guide-2025.ts';
import { article as solarLoanVsSubsidyKerala } from './solar-loan-vs-subsidy-kerala.ts';
import { article as solarPerformanceRatioExplained } from './solar-performance-ratio-explained.ts';
import { article as carbonMathSolarCo2Savings } from './carbon-math-solar-co2-savings.ts';
import { article as solarPanelWarrantyExplained } from './solar-panel-warranty-explained.ts';
import { article as monsoonSolarSystemKerala } from './monsoon-solar-system-kerala.ts';
import { article as stringInverterVsMicroinverterHybrid } from './string-inverter-vs-microinverter-hybrid.ts';
import { article as whatToAskSolarContractKerala } from './what-to-ask-solar-contract-kerala.ts';
import { article as monocrystallineVsPolycrystallineKerala } from './monocrystalline-vs-polycrystalline-kerala.ts';
import { article as apartmentsSolarKerala } from './apartments-solar-kerala.ts';
import { article as ksebNetMeteringGuide2025 } from './kseb-net-metering-guide-2025.ts';
import { article as onGridVsOffGridSolarKerala } from './on-grid-vs-off-grid-solar-kerala.ts';
import { article as howMuchDoesSolarCostInKerala } from './how-much-does-solar-cost-in-kerala.ts';
import { article as pmSuryaGharSubsidyGuide } from './pm-surya-ghar-subsidy-guide.ts';
import { article as solarVsElectricityBillComparison } from './solar-vs-electricity-bill-comparison.ts';
import { article as bestSolarPanelsBrandsIndia2024 } from './best-solar-panels-brands-india-2024.ts';
import { article as solarMaintenanceTips } from './solar-maintenance-tips.ts';
import { article as netMeteringExplained } from './net-metering-explained.ts';

/** Malayalam blog articles — newest first (matches English blog index order). */
export const blogArticlesMl: BlogArticleMl[] = [
  almmMadeInIndiaSolarPanels2026,
  pmSuryaGharOneCroreHomes2026,
  virtualNetMeteringKerala2026,
  ksebNetMeteringRules2026,
  solarTradeWarIndiaBuyers2026,
  solarBatteryStorageKerala2026,
  goingSolarKochiGuide2025,
  solarLoanVsSubsidyKerala,
  solarPerformanceRatioExplained,
  carbonMathSolarCo2Savings,
  solarPanelWarrantyExplained,
  monsoonSolarSystemKerala,
  stringInverterVsMicroinverterHybrid,
  whatToAskSolarContractKerala,
  monocrystallineVsPolycrystallineKerala,
  apartmentsSolarKerala,
  ksebNetMeteringGuide2025,
  onGridVsOffGridSolarKerala,
  howMuchDoesSolarCostInKerala,
  pmSuryaGharSubsidyGuide,
  solarVsElectricityBillComparison,
  bestSolarPanelsBrandsIndia2024,
  solarMaintenanceTips,
  netMeteringExplained,
];

export type BlogPostListingMl = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categoryKey: BlogArticleMl['categoryKey'];
  readTime: string;
};

export const blogPostsListingMl: BlogPostListingMl[] = blogArticlesMl.map((a) => ({
  slug: a.slug,
  title: a.title,
  excerpt: a.description,
  date: a.date,
  categoryKey: a.categoryKey,
  readTime: a.readTime,
}));
