// Волна 125 (перенос пилота с site-01, Волна 122): сжатие скачанного оригинала
// фонового видео hero до веб-разумного размера + извлечение постера. По образцу
// site-01-moscow-avtokran/app/scripts/optimize-hero-video.mjs.
//
// Источник видео (автор/лицензия/ссылка) — content-plan.md, «Волна 125».
import { execFileSync } from 'node:child_process';
import { statSync, mkdirSync, existsSync } from 'node:fs';
import ffmpegPath from 'ffmpeg-static';

const jobs = [
  {
    src: 'scripts/source-assets/hero-crane-original.mp4',
    outVideo: 'public/videos/hero-crane.mp4',
    outPoster: 'public/images/hero/hero-crane-poster.jpg',
    width: 1280,
    posterAt: '00:00:01',
  },
];

for (const job of jobs) {
  if (!existsSync(job.src)) {
    console.error(`Пропуск: исходник не найден — ${job.src}.`);
    continue;
  }
  mkdirSync('public/videos', { recursive: true });
  mkdirSync('public/images/hero', { recursive: true });

  const before = statSync(job.src).size;

  execFileSync(ffmpegPath, [
    '-y',
    '-i', job.src,
    '-an',
    '-vf', `scale=${job.width}:-2:flags=lanczos`,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '28',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    job.outVideo,
  ], { stdio: 'inherit' });

  execFileSync(ffmpegPath, [
    '-y',
    '-ss', job.posterAt,
    '-i', job.outVideo,
    '-frames:v', '1',
    '-q:v', '3',
    job.outPoster,
  ], { stdio: 'inherit' });

  const afterVideo = statSync(job.outVideo).size;
  const afterPoster = statSync(job.outPoster).size;
  console.log(
    `${job.src}: ${(before / 1024 / 1024).toFixed(2)} MB -> ${job.outVideo}: ${(afterVideo / 1024 / 1024).toFixed(2)} MB` +
    ` | постер ${job.outPoster}: ${(afterPoster / 1024).toFixed(0)} KB`
  );
  if (afterVideo > 3 * 1024 * 1024) {
    console.warn(`ВНИМАНИЕ: ${job.outVideo} тяжелее 3 МБ. Поднимите CRF и перезапустите.`);
  }
}
