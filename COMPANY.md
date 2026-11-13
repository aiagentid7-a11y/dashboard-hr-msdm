---
name: Dashboard HR MSDM
description: Dashboard HR berbasis SKKNI/KKNI MSDM — 61 agent kompetensi berjalan di atas Paperclip
slug: dashboard-hr-msdm
schema: agentcompanies/v1
version: 1.0.0
license: MIT
goals:
  - Menilai kompetensi MSDM karyawan terhadap SKKNI Kepmenaker 149/2020
  - Menyusun rencana pelatihan dari gap kompetensi
  - Mengecek kesiapan sertifikasi BNSP per jenjang KKNI 297/2020
---

Dashboard HR MSDM adalah company agent untuk dashboard HR baru. 61 agent
(AGT-001 s.d. AGT-061) masing-masing menguasai satu unit kompetensi SKKNI
Kepmenaker 149/2020. Koordinator adalah dashboard/API caller — agent tidak
punya atasan agent (reportsTo null); handoff antar-agent terjadi saat runtime
melalui koordinator, mengikuti workflow runtime di docs/struktur-61-agent-msdm.md.
