# $CRYPTO

**The tribute index** — 30 tribute memecoins on Pump.fun + one hub token (`$CRYPTO`) that captures fee flow and burns supply.

Single-file static HTML. No build step.

## Quick start

```bash
python3 -m http.server 8080
# deploy: vercel --prod
```

## Configuration

All in `index.html`:

- `const HUB` — set `ca`, `image`, `twitter`, optional CEX venues
- `const COINS` — 30 entries, fill `ca` per coin at launch

## Structure

```
crypto/
├── README.md
├── CLAUDE.md
├── index.html
├── .vercelignore
├── .gitignore
├── assets/
└── scripts/audit.js
```

## The 30 constituents

**Layer 1 (19):** BTC, ETH, SOL, BNB, XRP, ADA, AVAX, TRX, TON, DOT, NEAR, APT, SUI, ATOM, LTC, BCH, ETC, XLM, HBAR
**Memecoins (6):** DOGE, SHIB, PEPE, WIF, BONK, FLOKI
**DeFi (3):** LINK, UNI, AAVE
**Privacy (1):** XMR
**Infra (1):** FIL

## Disclosures

Independent tribute fan project. Not affiliated with the assets referenced. Names are cultural reference. Not financial advice.
