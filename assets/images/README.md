# Billeder

Billeder brugt på sitet:

- `hero-exterior.jpg` — bygningen udefra (hero-baggrund, galleri, kontakt-slide)
- `cafe-lounge.jpg` — café/lounge (baggrund på "Mere end padel", galleri)
- `multihal.jpg` — multihallen (baggrund på "Projektet", galleri)
- `lbi-logo.jpg` — Lynge-Broby IF-logo (top-bar, hero, footer) — vises som cirkel
- `lbi-vaerdiord.jpg` — LBI værdiord/hjerte-grafik (ikke brugt endnu, klar til brug)

Renderingerne er komprimeret fra originalerne (~2,4 MB → ~300 KB) for hurtig indlæsning.

## Skifte et baggrundsbillede

I `index.html` ligger baggrunden som inline-style på sliden:

```html
<section class="slide slide-deep slide-bg" style="background-image:url('assets/images/multihal.jpg')">
```

Byt filnavnet ud, eller læg en ny fil her med samme navn.

## Tilføje flere billeder

Læg nye filer her (helst komprimeret JPG/WebP under ~500 KB) og referér dem
med `assets/images/dit-billede.jpg`.
