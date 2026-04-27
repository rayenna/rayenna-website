import ffmpegStatic from 'ffmpeg-static';
import { createRequire } from 'module';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const exec = promisify(execFile);
const __dir = dirname(fileURLToPath(import.meta.url));
const root  = join(__dir, '..');

const videos = [
  { src: 'references/SUDHEERNJARAKKAL3KW-SOLIS-INVERTER-PANELS-ADANI.mp4',                    out: 'thumbs/customer--sudheer.jpg' },
  { src: 'rayenna videos/5 Reasons to switch to Solar.mp4',                                   out: 'thumbs/promo--5-reasons.jpg' },
  { src: 'rayenna videos/Avail Mindblowing Subsidies with Solar Installation from Rayenna.mp4',out: 'thumbs/promo--subsidies.jpg' },
  { src: 'rayenna videos/Avoid Bill Shocks with Rayenna Solar.mp4',                            out: 'thumbs/promo--avoid-bill-shocks.jpg' },
  { src: 'rayenna videos/Beat the High Power Bills with Rayenna Solar Solutions.mp4',          out: 'thumbs/promo--beat-high-bills.jpg' },
  { src: 'rayenna videos/Help Before these Bills consume me.mp4',                              out: 'thumbs/promo--help-bills.jpg' },
  { src: 'rayenna videos/Let the Sun Fuel your life and not your Bills.mp4',                   out: 'thumbs/promo--sun-fuel.jpg' },
  { src: 'rayenna videos/Rayenna to the Rescue from Bill Shocks.mp4',                         out: 'thumbs/promo--rescue-bill-shocks.jpg' },
  { src: 'rayenna videos/Rayenna to the rescue against rising Power BIlls.mp4',               out: 'thumbs/promo--rescue-rising-bills.jpg' },
  { src: 'rayenna videos/Why Pay More when the Sun if FREE.mp4',                               out: 'thumbs/promo--why-pay-more.jpg' },
  { src: "rayenna videos/Connecting you to Earth's Purest Energy.mp4",                        out: 'thumbs/brand--connecting.jpg' },
  { src: 'rayenna videos/From Daylight to Delight.mp4',                                       out: 'thumbs/brand--daylight.jpg' },
  { src: 'rayenna videos/Rayenna Engagement Model.mp4',                                        out: 'thumbs/brand--engagement.jpg' },
  { src: 'rayenna videos/Solar - Conquering the World like Lokah.mp4',                        out: 'thumbs/brand--lokah.jpg' },
  { src: 'rayenna videos/Rayenna Energy Solutions for Commerical Enterprises.mp4',             out: 'thumbs/solutions--commercial.jpg' },
  { src: 'rayenna videos/Rayenna Solar Solutions for EV Owners.mp4',                          out: 'thumbs/solutions--ev.jpg' },
  { src: 'rayenna videos/Talk to Mathew - Our technical Manager on Solar Intallation.mp4',    out: 'thumbs/expert--mathew-talk.jpg' },
  { src: 'rayenna videos/Types of Panels Available - Mathew brings clarity to it.mp4',        out: 'thumbs/expert--mathew-panels.jpg' },
  { src: 'rayenna videos/When does Hybrid Systems become feasible - Mathew clarifies.mp4',    out: 'thumbs/expert--mathew-hybrid.jpg' },
];

const thumbDir = join(root, 'public', 'media', 'thumbs');
if (!existsSync(thumbDir)) mkdirSync(thumbDir, { recursive: true });

let ok = 0, fail = 0;

for (const v of videos) {
  const input  = join(root, 'public', 'media', v.src);
  const output = join(root, 'public', 'media', v.out);

  try {
    await exec(ffmpegStatic, [
      '-y',
      '-ss', '00:00:01',
      '-i', input,
      '-vframes', '1',
      '-q:v', '3',
      '-vf', 'scale=640:-1',
      output,
    ]);
    console.log(`✓ ${v.out}`);
    ok++;
  } catch (e) {
    console.error(`✗ ${v.src}\n  ${e.message?.split('\n').pop()}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} generated, ${fail} failed.`);
