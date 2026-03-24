# Cloudflare counter

Tento projekt pocita navstevy cez Cloudflare Worker a Durable Object, nie cez KV.

## Preco nie KV

- Cloudflare Workers KV ma na free tier len 1 000 zapisov za den.
- Pageview counter zapisuje pri kazdom nacitani, takze KV by sa rychlo vycerpalo.
- Durable Object robi presny inkrement pre kazdu URL bez problemu s koliziami pri sucasnych zapisov.

## Co sa trackuje

- Kazde nacitanie route v prehliadaci posle `POST /track` na Worker.
- Uklada sa `pathname`, napr. `/` alebo `/slovo/ahoj`.
- Query string a hash sa zamerne neukladaju, aby nevznikali zbytocne tisice unikatnych klucov.

## Nastavenie

1. V Cloudflare spusti prihlasenie:
   `pnpm exec wrangler login`
2. Nastav povolene originy vo `wrangler.jsonc`:
   `ALLOWED_ORIGINS` nastav ako ciarkou oddeleny zoznam, napr. `http://localhost:3000,https://sariskyslovnik.vercel.app`
3. Nasad Worker:
   `pnpm install`
   `pnpm cf:deploy`
4. Do projektu dopln:
   `CLOUDFLARE_COUNTER_URL=https://...workers.dev`
   `NEXT_PUBLIC_CLOUDFLARE_COUNTER_URL=https://...workers.dev`

## Lokalne testovanie

1. V jednom terminali:
   `pnpm dev`
2. V druhom terminali:
   `pnpm cf:dev`
3. `wrangler dev` vypise lokalnu URL Workeru. Tu vloz do `.env.local` ako obe counter premenne.

## Endpoints

- `POST /track` s body `{ "path": "/slovo/..." }`
- `GET /views?path=/slovo/...`
- `GET /top-words?prefix=/slovo/&limit=10`

## Poznamka k free tier

- Toto riesenie nevycerpava KV write limit, lebo KV sa nepouziva.
- Stale plati celkovy free-tier limit pre samotne Worker/Durable Object requesty. Ak by web isiel nad bezny free-tier traffic, treba prechod na plateny plan alebo agregacne pocitanie namiesto inkrementu pri kazdom loade.
