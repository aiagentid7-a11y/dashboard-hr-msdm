# Dashboard HR MSDM — 61 Agent di atas Paperclip

Dashboard HR baru berbasis SKKNI Kepmenaker 149/2020 (61 unit kompetensi)
dan KKNI Kepmenaker 297/2020 (Jenjang 3–7). 61 agent (AGT-001 s.d. AGT-061)
masing-masing menguasai satu unit kompetensi, dan berjalan di atas
[Paperclip](https://github.com/sktyawan/paperclip) sebagai control plane.

## Isi repo

- `COMPANY.md` — definisi company Paperclip (`dashboard-hr-msdm`).
- `agents/agt-001 … agt-061/AGENTS.md` — satu agent per unit kompetensi.
  Frontmatter: nama, slug, jabatan, peran (klaster), `reportsTo: null`
  (koordinator adalah dashboard/API caller), dan skill klaster.
- `skills/<klaster>/SKILL.md` — 9 playbook klaster (cara menilai unit).
- `docs/struktur-61-agent-msdm.md` — struktur lengkap: 9 klaster, komposisi
  per jenjang, komponen tiap agent, dan workflow runtime (7 langkah + 3
  contoh alur: penilaian kompetensi, rencana pelatihan, cek kesiapan
  sertifikasi BNSP).

## Cara memuat ke Paperclip

Prasyarat: server Paperclip jalan + CLI `paperclipai` terpasang.

```sh
# arahkan CLI ke instance Paperclip kamu
npx paperclipai context set --api-base http://localhost:3100 --company-id <company-id>
npx paperclipai context set --api-key-env-var-name PAPERCLIP_API_KEY
export PAPERCLIP_API_KEY=<kunci-api>

# pratinjau dulu (tidak menerapkan)
npx paperclipai company import . --target new --new-company-name "Dashboard HR MSDM" --dry-run

# terapkan: buat company baru berisi 61 agent
npx paperclipai company import . --target new --new-company-name "Dashboard HR MSDM" --yes

# atau impor ke company yang sudah ada (sebagian agent saja)
npx paperclipai company import . --target existing -C <company-id> --agents agt-001,agt-010 --collision rename --yes
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

## Status

Draf struktur (disetujui Seti 13 Nov 2026). Pembuatan 61 agent menunggu
perintah Seti; workflow runtime masih draf menunggu review.
