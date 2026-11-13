# Dashboard HR MSDM — Mesin Paperclip + 61 Agent

Dashboard HR berbasis SKKNI Kepmenaker 149/2020 (61 unit kompetensi)
dan KKNI Kepmenaker 297/2020 (Jenjang 3–7). Repo ini berisi mesin
Paperclip lengkap beserta isi 61 agent-nya.

## Isi repo

- Engine Paperclip (source, dari paperclipai/paperclip): `packages/`,
  `cli/`, `server/`, `ui/`, `scripts/`, `docker/` — jalankan dengan
  `pnpm install` lalu `pnpm dev`. `node_modules` tidak ikut repo
  (install sendiri).
- `company/` — paket company 61 agent:
  - `company/COMPANY.md` — definisi company Paperclip
    (`dashboard-hr-msdm`).
  - `company/agents/agt-001 … agt-061/AGENTS.md` — satu agent per unit
    kompetensi. Frontmatter: nama, slug, jabatan, peran (klaster),
    `reportsTo: null` (koordinator adalah dashboard/API caller), dan
    skill klaster.
  - `company/skills/<klaster>/SKILL.md` — 9 playbook klaster
    (cara menilai unit).
  - `company/docs/struktur-61-agent-msdm.md` — struktur lengkap:
    9 klaster, komposisi per jenjang, komponen tiap agent, dan workflow
    runtime (7 langkah + 3 contoh alur: penilaian kompetensi, rencana
    pelatihan, cek kesiapan sertifikasi BNSP).

## Cara menjalankan mesin

```sh
pnpm install
pnpm dev        # server + UI (lihat package.json: dev, dev:server, dev:ui)
```

Atau lewat Docker (lihat `Dockerfile` dan `docker/`).

## Cara memuat 61 agent ke Paperclip

Prasyarat: server Paperclip jalan + CLI `paperclipai` terpasang.

```sh
# arahkan CLI ke instance Paperclip kamu
npx paperclipai context set --api-base http://localhost:3100 --company-id <company-id>
npx paperclipai context set --api-key-env-var-name PAPERCLIP_API_KEY
export PAPERCLIP_API_KEY=<kunci-api>

# pratinjau dulu (tidak menerapkan)
npx paperclipai company import company --target new --new-company-name "Dashboard HR MSDM" --dry-run

# terapkan: buat company baru berisi 61 agent
npx paperclipai company import company --target new --new-company-name "Dashboard HR MSDM" --yes

# atau impor ke company yang sudah ada (sebagian agent saja)
npx paperclipai company import company --target existing -C <company-id> --agents agt-001,agt-010 --collision rename --yes
```

Catatan:
- Handoff antar-agent tidak didefinisikan di file — handoff terjadi saat
  runtime lewat API (`POST /api/companies/:companyId/case-handoffs`).
  Orkestrasi statis di paket ini hanya berupa `reportsTo` + instruksi
  handoff di dalam tiap `AGENTS.md`.
- Adapter, budget, dan permissions tidak ada di frontmatter `AGENTS.md`;
  kalau perlu, tambahkan `.paperclip.yaml` (lihat riset di repo Paperclip:
  `.agents/skills/company-creator/SKILL.md`).
- Detail lengkap tiap unit (elemen + KUK) ada di lampiran SKKNI 149/2020;
  isi agent di repo ini memakai kode + judul + jenjang pemakaian.
- Aset provider Copilot (binary `copilot` + `runtime.node`, ±260 MB)
  sengaja tidak ikut repo ini karena batas file GitHub 100 MB — unduh
  terpisah bila provider Copilot dipakai.

## Status

61 agent lengkap (13 Nov 2026, terverifikasi). Engine Paperclip masuk
repo 13 Nov 2026. Workflow runtime masih draf menunggu review Seti.
