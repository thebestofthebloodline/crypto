# Claude Code · Project Context

You are working on **$CRYPTO** — a single-file static HTML site for a Pump.fun memecoin tribute index on Solana. 30 tribute memecoins + a hub token ($CRYPTO) that captures fees from the index and burns supply.

## Architecture

Single `index.html`. No build, no framework. All CSS in one `<style>`, all JS in one `<script>`.

Sections:
1. Sticky topbar (brand $ mark + nav: Hub / Index / Mechanics)
2. Hero (eyebrow live pill, big "The tribute index of crypto." headline with italic accent, lede, CTA buttons, stat strip 4-col, live ticker tape)
3. Hub Token (status bar, image column left, ticker + summary + 3-stat grid + contract + burn box + optional CEX venues right)
4. Index (search + 5 category filters + 30 grid cards with monogram, ticker, stats, contract, Trade)
5. Mechanics (3 cards explaining Launch / Capture / Burn)
6. Footer (about / links / verification + tribute disclaimer + colophon with build hash)

## Visual identity

**Modern product/fintech aesthetic** — Linear / Vercel / Anthropic territory. NOT memecoin-bro, NOT terminal-CRT, NOT editorial-newspaper.

- Inter (variable sans, 300-800) for everything
- IBM Plex Mono for numbers, contracts, monospaced labels
- Instrument Serif (italic) used SPARINGLY for accent words ("tribute", "every coin", "itself") and the $ symbol on the brand mark + image placeholder
- Background: solid charcoal `#0a0a0c` with a single soft radial gradient aurora top-center in muted gold (`rgba(212,168,87,.13)`) and a small green hint bottom-right. NO decorative SVG behind content.
- Cards: dark surface `#16161b` with thin borders. Subtle hover lift.
- Gold `#d4a857` is the only chromatic accent. Used for: brand mark, accent italic words, primary CTA, monograms (when glyph exists), pulse dot.
- Up/down deltas: muted sage `#6aa178` / muted terracotta `#c87356`. No pure red/green.
- Border radius: 6-14px. Not pill-y, not sharp.

**Do not:**
- Add CRT scanlines, grain, decorative SVG patterns behind content
- Reintroduce Fraunces or other heavy editorial serifs as primary display font (Instrument Serif is only for the italic accent words)
- Add neon, glow effects beyond the existing 1-2 soft shadows
- Use pure saturated red/green for delta colors
- Make brand mark anything other than the gold square with italic $

## Editable config

### `const HUB` (~line 670)

```js
const HUB = {
  ca: "",          // $CRYPTO mint — fill at launch
  url: "",         // optional pump.fun URL override
  image: "",       // optional logo path
  twitter: "",     // optional X URL
  venues: { mexc:"", kucoin:"", bitget:"", bitrue:"" }
};
```

### `const COINS` (~line 630)

30 entries. Fill `ca` per coin as each launches. Don't modify `sym`, `glyph`, `name`, `cat`, `tier`.

Categories: `L1`, `MEME`, `DEFI`, `PRIVACY`, `INFRA`.

## Hard rules

1. Single file only.
2. No frameworks. Vanilla JS + CSS.
3. No build step.
4. External calls: only DexScreener API, Solana mainnet RPC, Google Fonts.
5. Preserve tribute disclaimer verbatim.
6. CA validation = "non-empty string". No regex.

## Common edits

- Hub CA: set `HUB.ca`. Status switches Active, Trade/Chart CTAs activate, stats + burn fetch.
- Coin CA: set `ca` on that coin. Trade button activates, tape entry populates.
- Hub image: drop square image into `assets/`, set `HUB.image = "./assets/your.png"`.
- CEX venue: fill `HUB.venues.mexc` (etc). Pill appears below burn.

## Testing

```bash
python3 -m http.server 8080
node scripts/audit.js
```

## Don'ts

- Don't migrate to React.
- Don't add analytics.
- Don't soften tribute disclaimer.
- Don't fabricate "improvements" the user didn't ask for.
