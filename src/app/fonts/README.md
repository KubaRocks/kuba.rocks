# Big Shoulders

`big-shoulders.woff2` is the Big Shoulders variable font, converted from the
[Google Fonts source](https://github.com/google/fonts/blob/c13390277dfb1fcc7415d84ef7ef9cfc1e52f8c1/ofl/bigshoulders/BigShoulders%5Bopsz%2Cwght%5D.ttf)
at commit `c13390277dfb1fcc7415d84ef7ef9cfc1e52f8c1` with FontTools and Brotli.
It retains the weight axis from 100 to 900 and optical-size axis from 10 to 72.
The source TTF SHA-256 is
`4b4b24aa6f799aa73cdcd5b6fa840cbcbbb38b81fa9fa82c25126a4530c1ba44`.

The font is distributed under the SIL Open Font License in [OFL.txt](./OFL.txt).

## Share image cuts

The share image (`src/app/opengraph-image.tsx`) is drawn by Satori, which reads
TTF but not WOFF2 or variable fonts. These static subsets cover Basic Latin
plus `·`, `–`, `—` and `’`, cut with FontTools from the same Google Fonts commit:

- `big-shoulders-black.ttf`: the Big Shoulders source above, instanced at
  `wght=900`, `opsz=72`.
- `barlow-condensed-semibold.ttf`: `ofl/barlowcondensed/BarlowCondensed-SemiBold.ttf`
  (SHA-256 `7b619d14bc2327509a9ef32b0890f709626f7ecc9ff61191c2a4314c5499d2d9`),
  under the SIL Open Font License in [OFL-Barlow.txt](./OFL-Barlow.txt).

```sh
fonttools varLib.instancer 'BigShoulders[opsz,wght].ttf' wght=900 opsz=72 -o bs-900.ttf
pyftsubset bs-900.ttf --unicodes="U+0020-007E,U+00B7,U+2013,U+2014,U+2019" \
  --layout-features=kern --output-file=big-shoulders-black.ttf
pyftsubset BarlowCondensed-SemiBold.ttf --unicodes="U+0020-007E,U+00B7,U+2013,U+2014,U+2019" \
  --layout-features=kern --output-file=barlow-condensed-semibold.ttf
```
