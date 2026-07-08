# Billeder

Læg jeres renderinger og fotos her. Foreslåede filnavne (matcher placeholder-teksterne på sitet):

- `placering.jpg` — kort/luftfoto i "Placering"-sliden
- `render-1.jpg`, `render-2.jpg`, `render-3.jpg` — visualiseringerne i "Sådan kommer det til at se ud"
- `logo-dif.svg`, `logo-dgi.svg`, `logo-dpf.svg` — forbund/interessent-logoer

Når filen ligger her, udskift den tilhørende placeholder-boks i `index.html`, fx:

```html
<figure class="figure">
  <img src="assets/images/render-1.jpg" alt="Rendering af Sorø Idræts- og Kulturby">
</figure>
```

Logo-eksempel (i citat-sliden):

```html
<span class="logo-chip"><img src="assets/images/logo-dif.svg" alt="DIF"></span>
```

Tip: hold billeder under ~500 KB (komprimeret JPG/WebP), så slidene loader hurtigt.
