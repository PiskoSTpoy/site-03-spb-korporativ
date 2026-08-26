// Волна 106 (перенос пилота фотографий с site-01/site-02, Волны 102/104/105): ресайз/сжатие
// скачанных исходников Wikimedia Commons/Pexels до веб-разумных размеров. Исходники —
// 2816×2112 (LTM 1090-4.1, Commons, 4.4 МБ), 4592×2576 (LTM 1130-5.1, Commons, 3.4 МБ) и
// 7000×4667 (park-hero, Pexels, 4.2 МБ) — публиковать в таком виде нельзя (LCP/трафик).
// Тот же паттерн, что в site-01-moscow-avtokran/app/scripts/optimize-park-images.mjs и
// site-02-mo-manipulyator/app/scripts/optimize-park-images.mjs: sharp, mozjpeg, качество 78.
import sharp from 'sharp';
import { statSync } from 'node:fs';

// ВАЖНО: src===out — скрипт сжимает файл, который уже лежит в public/. Повторный
// запуск на уже обработанном файле означает повторное JPEG-сжатие (генерационные
// потери) без какой-либо пользы. Поэтому задание волны закомментировано сразу
// после того, как отработало один раз — раскомментировать только если нужно
// пересобрать конкретный файл заново из свежего оригинала в этом же пути.
const jobs = [
  // Волна 106 — уже обработаны, не перезапускать без свежего оригинала:
  // { src: 'public/images/park/liebherr-ltm-1090.jpg', out: 'public/images/park/liebherr-ltm-1090.jpg', width: 1280 },
  // { src: 'public/images/park/liebherr-ltm-1130.jpg', out: 'public/images/park/liebherr-ltm-1130.jpg', width: 1280 },
  // { src: 'public/images/hero/park-hero.jpg', out: 'public/images/hero/park-hero.jpg', width: 1920 },
];

for (const job of jobs) {
  const before = statSync(job.src).size;
  const buf = await sharp(job.src).rotate().resize({ width: job.width, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  await sharp(buf).toFile(job.out + '.tmp');
  const { renameSync } = await import('node:fs');
  renameSync(job.out + '.tmp', job.out);
  const after = statSync(job.out).size;
  console.log(`${job.src}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
}
