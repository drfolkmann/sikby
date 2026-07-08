# Sikby

Enkel one-page hjemmeside for visionen om et nyt idræts- og foreningsanlæg i Sikby.
Bygget som en statisk side og hostet gratis på **GitHub Pages**.

## Sådan er sitet bygget op

```
index.html          → forsiden (one-page med scroll-sektioner)
vision.html         → underside: uddybet vision
om.html             → underside: om projektet / kontakt
css/style.css       → alt design. Farver styres af CSS-variabler i toppen af filen
js/main.js          → mobilmenu, citat-indlæsning, scroll-animation
data/quotes.json    → CITATERNE — her tilføjer I nye (se nedenfor)
assets/images/      → billeder og renderinger
.nojekyll           → sørger for at GitHub Pages serverer filerne råt
```

## Sådan tilføjer I et citat

Åbn `data/quotes.json` og tilføj et nyt objekt i listen:

```json
{
  "text": "Selve citatet her.",
  "name": "Fornavn Efternavn",
  "org": "Titel / forening / organisation",
  "role": "Forening"
}
```

- `role` bliver vist som et lille mærkat (fx `Forening`, `Kommune`, `Interessent`, `Ven`).
- `org` kan være tomt (`""`).
- Husk komma mellem objekter, men ikke efter det sidste.

Citaterne opdateres automatisk på siden, når filen er gemt og pushet.

## Sådan skifter I farver/tema

Åbn `css/style.css` og ret variablerne i toppen (`:root { ... }`):

```css
--color-primary: #1f7a4d;   /* hovedfarve */
--color-accent:  #f5a623;   /* accentfarve */
```

## Sådan tilføjer I billeder

Læg filer i `assets/images/` og udskift den tilhørende `placeholder`-boks i HTML'en
med et `<img>`-tag. Se `assets/images/README.md`.

## Sådan ser I siden lokalt

Citaterne hentes via `fetch()`, hvilket kræver en webserver (ikke bare dobbeltklik på filen).
Kør en simpel server i mappen:

```bash
# med Python (findes på de fleste maskiner)
python -m http.server 8000
# åbn derefter http://localhost:8000
```

## Udgivelse på GitHub Pages

1. Push koden til `main`-branchen i repoet `drfolkmann/sikby`.
2. På GitHub: **Settings → Pages → Build and deployment**.
3. Vælg **Source: Deploy from a branch**, branch **main**, mappe **/ (root)**. Gem.
4. Efter et øjeblik er siden live på `https://drfolkmann.github.io/sikby/`.

(Vil I bruge et eget domæne, fx `sikby.dk`, kan det sættes op under samme Pages-indstillinger + en `CNAME`-fil.)
