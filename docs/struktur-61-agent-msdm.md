# Struktur 61 Agent MSDM untuk Dashboard HR

Dasar: SKKNI Kepmenaker 149/2020 (61 unit kompetensi) + KKNI Kepmenaker
297/2020 (Jenjang 3–7). Terverifikasi dari PDF Kepmen yang di-upload Seti
13 Nov 2026 — SKKNI dibaca penuh (260 hlm), KKNI dibaca penuh via OCR
(33 hlm). Detail ada di skill `local-skkni-kkni-msdm`.

## Workflow yang disepakati

| Langkah | Isi | Status |
|---|---|---|
| 1. Baca | Baca SKKNI 149/2020 + KKNI 297/2020 sampai paham | ✅ selesai 13 Nov 2026 |
| 2. Simpan memory | Simpan ke MEMORY.md + skill `local-skkni-kkni-msdm` | ✅ selesai 13 Nov 2026 |
| 3. Buat agent | 1 unit kompetensi = 1 agent → **61 agent** | ✅ struktur disetujui 13 Nov 2026 — diskusi dulu sebelum buat |
| 4. Rakit jabatan | Gabung agent sesuai paket jenjang (inti + pilihan) untuk dashboard | ⏳ setelah langkah 3 |
| 5. Dashboard HR | Dashboard memanggil agent per jabatan/fungsi | ⏳ setelah langkah 4 |
| 6. Workflow runtime | Alur kerja agent saat jalan (bagian "Workflow runtime" di bawah) | ✅ draf, menunggu review Seti |

## Prinsip: 1 unit = 1 agent

- Tiap agent menguasai **satu unit kompetensi**: kode, judul, deskripsi,
  elemen, kriteria unjuk kerja (KUK), batasan variabel, dan panduan penilaian
  dari lampiran Kepmen 149/2020.
- Agent diberi ID `AGT-001` s.d. `AGT-061` (nomor = nomor unit). Nama kerja
  agent = judul unitnya, misal `AGT-001 Merumuskan Strategi MSDM`.
- Format tiap agent (diusulkan, mengikuti pola tim bella / Karsa): Soul
  (peran = unitnya), Memory (isi unit dari SKKNI), Skills (unit kompetensi
  itu). Platform agent belum diputuskan — lihat "Keputusan yang masih
  terbuka" di bawah.
- Kolom "Dipakai di jenjang": I = unit inti (wajib) di jenjang itu,
  P = unit pilihan (kolam resmi) di jenjang itu.

## Komponen tiap agent (disetujui Seti 13 Nov 2026)

Di luar Soul, Memory, Skills, dan Endpoint, tiap agent (AGT-001 s.d.
AGT-061) memakai 9 komponen ini — ditulis dalam istilah dashboard HR:

| # | Komponen | Isi |
|---|---|---|
| 1 | Tools | Tangan agent buat kerja nyata. Skills itu playbook (cara kerja), tools itu eksekusinya: baca data karyawan, hitung gaji/lembur, baca file, kirim notifikasi. Tanpa tools, agent cuma bisa jawab, tidak bisa mengerjakan. |
| 2 | Instruksi & batasan (guardrails) | Tujuan agent, apa yang boleh dan tidak boleh, kapan wajib minta persetujuan manusia. Buat HR ini penting: data karyawan sensitif, keputusan soal gaji/PHK tidak boleh jalan otomatis. |
| 3 | Model & konfigurasi | Pakai model apa, seberapa kreatif (temperature), batas token, biaya per panggilan. |
| 4 | Identitas | Nama, peran/jabatan, avatar. Di struktur ini jadi ID agent + judul unit (AGT-001 dst). |
| 5 | Trigger & jadwal | Kapan agent jalan: dipanggil dashboard, terjadwal, atau kalau ada event (misal karyawan baru masuk, masa sertifikasi mau habis). |
| 6 | Log & audit | Jejak lengkap apa yang agent lakukan dan putuskan. Buat HR ini hampir wajib: siapa dinilai, kapan, hasilnya apa, biar bisa dipertanggungjawabkan. |
| 7 | Orkestrasi antar-agent | Cara 61 agent kerja bareng. Agent jabatan (Staf, Manajer) memanggil agent unit (AGT-010, AGT-023), dan ada satu koordinator di atasnya. |
| 8 | Evaluasi | Cara ngetes agent-nya benar atau tidak: soal uji per unit kompetensi + skor kelulusan. |
| 9 | Kuota & biaya | Batas pemakaian tiap agent. |

Catatan: daftar komponen yang sama juga dicatat di spek template Karsa
(`karsa-template-v2-spec.md`, fitur 9–14) — tapi itu pembahasan Karsa yang
terpisah; yang di dokumen ini khusus untuk 61 agent MSDM dashboard HR.

## Workflow runtime (alur kerja agent saat jalan)

Draf — dibuat atas perintah Seti ("coba", 13 Nov 2026). Ini workflow
**runtime**, beda dengan workflow pembangunan di atas (baca → memory →
buat agent → rakit jabatan → dashboard).

### Prinsip
- Satu workflow per **jenis tugas**, bukan satu per agent.
- Tiap agent punya status sederhana: `idle → kerja → lapor → selesai`.
- Agent tidak boleh loncat langkah. Kalau data tidak ada, agent lapor
  "data tidak ada" — tidak boleh mengarang.
- Keputusan sensitif (gaji, PHK, disiplin) tidak pernah jalan otomatis.

### Alur umum (berlaku untuk semua jenis tugas)
| Langkah | Yang terjadi | Agent/komponen |
|---|---|---|
| 1. Terima tugas | Dashboard kirim tugas: karyawan + tujuan + jenjang target | Trigger |
| 2. Pilih agent | Koordinator pilih agent yang dipakai: inti wajib semua + pilihan dari kolam resmi jenjang itu | Orkestrasi |
| 3. Kerja | Tiap agent menilai unitnya sendiri-sendiri (paralel), baca data lewat Tools, nilai pakai KUK dari SKKNI | Tools, Skills |
| 4. Gabung | Koordinator gabung hasil: skor per unit + bukti + yang belum bisa dinilai | Orkestrasi |
| 5. Cek guardrail | Skor rendah, data tidak lengkap, atau keputusan sensitif → TAHAN, minta manusia | Guardrails |
| 6. Review manusia | Manusia setuju / koreksi / tolak | — |
| 7. Simpan | Hasil + jejak lengkap disimpan | Log & audit |

### Contoh 1 — Penilaian kompetensi karyawan
Tujuan: nilai karyawan X untuk jenjang Manajer (J6).
1. Dashboard kirim: X + "nilai untuk J6".
2. Koordinator pilih 15 agent: 6 inti (010, 011, 013, 022, 026, 031) + 9 pilihan dari kolam J6.
3. Tiap agent menilai unitnya (misal AGT-022 menilai grading jabatan X).
4. Gabung: skor 15 unit + daftar gap (unit yang belum kompeten).
5. Guardrail: ada unit skor rendah → tahan, tampilkan ke manusia.
6. Manusia review hasilnya.
7. Simpan penilaian + log.

### Contoh 2 — Rencana pelatihan dari hasil penilaian
Tujuan: dari gap penilaian, susun rencana pelatihan.
1. Dashboard kirim: hasil penilaian X (gap di unit 031, 033, 035).
2. Koordinator pilih agent klaster F (Pembelajaran & Pengembangan).
3. Agent susun kebutuhan (AGT-031) → rancang program (AGT-032) → jadwal.
4. Gabung jadi satu rencana pelatihan.
5. Guardrail: biaya/waktu di luar batas → tahan, minta manusia.
6. Manusia setujui rencana.
7. Simpan rencana + log.

### Contoh 3 — Cek kesiapan sertifikasi BNSP
Tujuan: cek apakah X siap ikut sertifikasi jenjang tertentu.
1. Dashboard kirim: X + jenjang target (misal J5).
2. Koordinator pilih agent sesuai paket J5 (4 inti + 6 pilihan).
3. Tiap agent cek: unitnya sudah terpenuhi atau belum (bukti: dokumen, pengalaman, pelatihan).
4. Gabung: daftar unit terpenuhi vs belum + syarat "Tidak ada" (semua unit di KKNI tidak mensyaratkan kompetensi prasyarat).
5. Guardrail: ada unit belum terpenuhi → rekomendasikan pelatihan dulu, jangan daftarkan.
6. Manusia putuskan lanjut atau tunda.
7. Simpan hasil cek + log.

## Ringkasan klaster (9 fungsi, 61 agent)

| Klaster | Agent | Unit |
|---|---|---|
| A. Strategi & Kebijakan MSDM | 4 | 001, 002, 003, 060 |
| B. Desain & Pengembangan Organisasi | 8 | 004, 005, 006, 007, 008, 009, 015, 016 |
| C. Perencanaan & Pengadaan SDM | 10 | 010, 011, 012, 013, 014, 017, 018, 019, 020, 021 |
| D. Remunerasi & Pengupahan | 5 | 022, 023, 024, 025, 057 |
| E. Manajemen Kinerja | 5 | 026, 027, 028, 029, 030 |
| F. Pembelajaran & Pengembangan | 6 | 031, 032, 033, 034, 035, 036 |
| G. Manajemen Talenta & Karir | 5 | 037, 038, 039, 040, 041 |
| H. Hubungan Industrial | 13 | 042, 043, 044, 045, 046, 047, 048, 049, 050, 051, 052, 053, 054 |
| I. Sistem Informasi & Administrasi SDM | 5 | 055, 056, 058, 059, 061 |
| **Total** | **61** | |

## A. Strategi & Kebijakan MSDM — 4 agent

| Agent | Kode Unit | Judul Unit | Dipakai di jenjang |
|---|---|---|---|
| AGT-001 | M.70SDM01.001.2 | Merumuskan Strategi dan Kebijakan Manajemen Sumber Daya Manusia (MSDM) | J5(P), J6(P), J7(I) |
| AGT-002 | M.70SDM01.002.2 | Mengevaluasi Efektivitas Strategi dan Kebijakan MSDM | J7(P) |
| AGT-003 | M.70SDM01.003.2 | Menetapkan Rencana Kegiatan dan Anggaran MSDM | J5(P), J7(P) |
| AGT-060 | M.70SDM01.060.2 | Menyiapkan Data Penyusunan Anggaran Tahunan SDM | J3(P), J4(P), J5(P), J6(P) |

## B. Desain & Pengembangan Organisasi — 8 agent

| Agent | Kode Unit | Judul Unit | Dipakai di jenjang |
|---|---|---|---|
| AGT-004 | M.70SDM01.004.2 | Merancang Desain Organisasi | J7(P) |
| AGT-005 | M.70SDM01.005.2 | Merumuskan Proses Bisnis serta Tugas dan Fungsi dalam Organisasi | J6(P), J7(I) |
| AGT-006 | M.70SDM01.006.2 | Merumuskan Perubahan Strategis Organisasi | J6(P), J7(I) |
| AGT-007 | M.70SDM01.007.2 | Merumuskan Budaya Organisasi | J6(P), J7(I) |
| AGT-008 | M.70SDM01.008.2 | Membuat Bagan Struktur Organisasi | J5(P) |
| AGT-009 | M.70SDM01.009.2 | Mengevaluasi Efektivitas Struktur Organisasi | J5(P), J7(I) |
| AGT-015 | M.70SDM01.015.2 | Mengelola Proses Perubahan (Change Management) | J5(P), J6(P), J7(P) |
| AGT-016 | M.70SDM01.016.2 | Mengelola Proses Pengembangan Budaya Organisasi | J5(P), J7(P) |

## C. Perencanaan & Pengadaan SDM — 10 agent

| Agent | Kode Unit | Judul Unit | Dipakai di jenjang |
|---|---|---|---|
| AGT-010 | M.70SDM01.010.2 | Menyusun Uraian Jabatan | J3(I), J4(I), J5(I), J6(I) |
| AGT-011 | M.70SDM01.011.2 | Melaksanakan Analisis Beban Kerja | J3(P), J4(P), J5(P), J6(I) |
| AGT-012 | M.70SDM01.012.2 | Menyusun Kebutuhan SDM | J5(P), J6(P), J7(P) |
| AGT-013 | M.70SDM01.013.2 | Menyusun Standar Operasional Prosedur (SOP) MSDM | J3(P), J4(I), J5(I), J6(I) |
| AGT-014 | M.70SDM01.014.2 | Mengevaluasi Efektivitas Standar Operasional Prosedur (SOP) MSDM | J4(P), J5(P) |
| AGT-017 | M.70SDM01.017.2 | Melakukan Proses Rekrutmen | J3(P), J4(P), J5(P) |
| AGT-018 | M.70SDM01.018.2 | Melakukan Proses Seleksi | J4(P), J5(P) |
| AGT-019 | M.70SDM01.019.2 | Menyusun Rekomendasi Hasil Seleksi | J5(P) |
| AGT-020 | M.70SDM01.020.2 | Melakukan Penawaran Kerja Kepada Calon Pekerja | J4(P), J5(P), J6(P), J7(P) |
| AGT-021 | M.70SDM01.021.2 | Mengelola Program Orientasi Kerja | J4(P), J5(P) |

## D. Remunerasi & Pengupahan — 5 agent

| Agent | Kode Unit | Judul Unit | Dipakai di jenjang |
|---|---|---|---|
| AGT-022 | M.70SDM01.022.2 | Menyusun Grading Jabatan | J4(P), J5(P), J6(I), J7(P) |
| AGT-023 | M.70SDM01.023.2 | Menyusun Sistem Remunerasi | J4(P), J5(P), J6(P), J7(P) |
| AGT-024 | M.70SDM01.024.2 | Menentukan Upah Pekerja | J5(P), J6(P), J7(P) |
| AGT-025 | M.70SDM01.025.2 | Merumuskan Program Insentif dan/atau Bonus | J5(P), J6(P), J7(P) |
| AGT-057 | M.70SDM01.057.2 | Melakukan Administrasi Pengupahan | J3(P), J4(P) |

## E. Manajemen Kinerja — 5 agent

| Agent | Kode Unit | Judul Unit | Dipakai di jenjang |
|---|---|---|---|
| AGT-026 | M.70SDM01.026.2 | Mengelola Proses Perumusan Indikator Kinerja Individu | J3(P), J4(P), J5(I), J6(I), J7(P) |
| AGT-027 | M.70SDM01.027.2 | Mengelola Proses Monitoring Pencapaian Kinerja Individu | J4(P), J5(P), J6(P), J7(P) |
| AGT-028 | M.70SDM01.028.2 | Mengelola Proses Pemberian Umpan Balik Kinerja Individu | J5(P), J6(P), J7(P) |
| AGT-029 | M.70SDM01.029.2 | Mengelola Proses Penilaian Kinerja Individu | J4(P), J5(P), J6(P), J7(P) |
| AGT-030 | M.70SDM01.030.2 | Menindaklanjuti Hasil Penilaian Kinerja Individu | J5(P), J6(P), J7(P) |

## F. Pembelajaran & Pengembangan — 6 agent

| Agent | Kode Unit | Judul Unit | Dipakai di jenjang |
|---|---|---|---|
| AGT-031 | M.70SDM01.031.2 | Menyusun Kebutuhan Pembelajaran dan Pengembangan | J4(P), J5(I), J6(I), J7(P) |
| AGT-032 | M.70SDM01.032.2 | Merancang Program Pembelajaran dan Pengembangan | J5(P), J6(P), J7(P) |
| AGT-033 | M.70SDM01.033.2 | Melaksanakan Kegiatan Pembelajaran dan Pengembangan | J3(P), J4(P), J5(P), J6(P), J7(P) |
| AGT-034 | M.70SDM01.034.2 | Mengevaluasi Pelaksanaan Program Pembelajaran dan Pengembangan | J4(P), J5(P), J6(P), J7(P) |
| AGT-035 | M.70SDM01.035.2 | Merancang Model dan Kamus Kompetensi | J4(P), J5(P), J6(P), J7(P) |
| AGT-036 | M.70SDM01.036.2 | Mengelola Kegiatan Asesmen | J4(P), J5(P) |

## G. Manajemen Talenta & Karir — 5 agent

| Agent | Kode Unit | Judul Unit | Dipakai di jenjang |
|---|---|---|---|
| AGT-037 | M.70SDM01.037.2 | Menyusun Kelompok Pekerja Bertalenta (Talent Pool) | J4(P), J5(P), J6(P), J7(P) |
| AGT-038 | M.70SDM01.038.2 | Mengelola Program Pengembangan Kelompok Pekerja Bertalenta (Talent Pool) | J5(P), J6(P), J7(P) |
| AGT-039 | M.70SDM01.039.2 | Merancang Jalur Karir Pekerja | J5(P), J6(P), J7(P) |
| AGT-040 | M.70SDM01.040.2 | Mengelola Program Suksesi | J6(P), J7(P) |
| AGT-041 | M.70SDM01.041.2 | Melakukan Konsultasi Karir | J7(P) |

## H. Hubungan Industrial — 13 agent

| Agent | Kode Unit | Judul Unit | Dipakai di jenjang |
|---|---|---|---|
| AGT-042 | M.70SDM01.042.2 | Membuat Kesepakatan Kerja | J4(P), J5(P), J6(P), J7(P) |
| AGT-043 | M.70SDM01.043.2 | Menyusun Peraturan Perusahaan dan/atau Perjanjian Kerja Bersama | J5(P), J6(P), J7(P) |
| AGT-044 | M.70SDM01.044.2 | Membangun Komunikasi Organisasi yang Efektif | J3(P), J4(P), J5(P), J6(P), J7(I) |
| AGT-045 | M.70SDM01.045.2 | Menjalin Kerjasama Pengusaha dan Pekerja | J6(P), J7(P) |
| AGT-046 | M.70SDM01.046.2 | Menjalin Kerjasama Tripartit | J5(P), J6(P), J7(P) |
| AGT-047 | M.70SDM01.047.2 | Menangani Keluhan Pekerja | J4(P), J5(P), J6(P), J7(P) |
| AGT-048 | M.70SDM01.048.2 | Mengelola Proses Pelaksanaan Tindakan Disiplin | J4(P), J5(P), J6(P), J7(P) |
| AGT-049 | M.70SDM01.049.2 | Melaksanakan Proses Pemutusan Hubungan Kerja | J5(P), J7(P) |
| AGT-050 | M.70SDM01.050.2 | Mengelola Masalah Perselisihan Hubungan Industrial Antar Pemangku Kepentingan di Organisasi | J5(P), J7(P) |
| AGT-051 | M.70SDM01.051.2 | Memfasilitasi Pengelolaan Kepuasan dan Keterlekatan Pekerja | J3(P), J4(P), J5(P), J6(P), J7(P) |
| AGT-052 | M.70SDM01.052.2 | Mengelola Keseimbangan Antara Pekerjaan Dan Kehidupan Pribadi Pekerja | J4(P), J5(P), J7(P) |
| AGT-053 | M.70SDM01.053.2 | Mengelola Pelaksanaan Alihdaya atau Outsourcing | J4(P), J5(P), J6(P), J7(P) |
| AGT-054 | M.70SDM01.054.2 | Menyelesaikan Mogok Kerja dan/atau Lock-out | J6(P), J7(P) |

## I. Sistem Informasi & Administrasi SDM — 5 agent

| Agent | Kode Unit | Judul Unit | Dipakai di jenjang |
|---|---|---|---|
| AGT-055 | M.70SDM01.055.2 | Mengembangkan Sistem Informasi Pekerja | J6(P), J7(P) |
| AGT-056 | M.70SDM01.056.2 | Memfasilitasi Penggunaan Sistem Informasi Pekerja | J3(P), J4(P) |
| AGT-058 | M.70SDM01.058.2 | Melakukan Administrasi Jaminan Sosial | J3(I), J4(P) |
| AGT-059 | M.70SDM01.059.2 | Melakukan Administrasi Penerapan Kebijakan MSDM | J3(P), J4(P) |
| AGT-061 | M.70SDM01.061.2 | Menangani Administrasi Pekerja Antar Negara | J3(P), J4(P) |

## Komposisi per jenjang (untuk dashboard)

Dashboard merakit jabatan dari agent di atas sesuai aturan pengemasan
resmi (lampiran Kepmen 297/2020). Inti wajib semua; pilihan dipilih dari
kolam resmi jenjang itu.

| Jenjang | Jabatan | Inti (wajib) | Pilihan | Total |
|---|---|---|---|---|
| 3 | Staf / Officer | 2 (010, 058) | 2 dari 12 kolam | 4 |
| 4 | Supervisor / Analyst | 2 (010, 013) | 3 dari 30 kolam | 5 |
| 5 | Kepala Bagian / Senior Analyst | 4 (010, 013, 026, 031) | 6 dari 42 kolam | 10 |
| 6 | Manajer | 6 (010, 011, 013, 022, 026, 031) | 9 dari 34 kolam | 15 |
| 7 | General Manager / Direktur / VP | 6 (001, 005, 006, 007, 009, 044) | 9 dari 39 kolam | 15 |

Jumlah total per paket sertifikasi: J3 = 4, J4 = 5, J5 = 10, J6 = 15, J7 = 15.

## Catatan verifikasi (penting untuk agent .036 dan .052)

- Unit .036 (Mengelola Kegiatan Asesmen) dan .052 (Mengelola Keseimbangan
  Antara Pekerjaan dan Kehidupan Pribadi Pekerja) adalah unit SKKNI yang
  sah — agent-nya tetap dibuat. Yang bermasalah hanya **skema LSP**
  Manajer dari LangitHR: skema Manajer Talenta memuat .036 padahal .036
  tidak ada di kolam pilihan jenjang 6 (dan skema itu melewatkan inti .022);
  skema Manajer Hubungan Industrial memuat .052 yang juga tidak ada di
  kolam pilihan jenjang 6. Jadi agent .036/.052 valid, paket skema LSP-nya
  yang jangan dipakai mentah-mentah.

## Keputusan yang masih terbuka (tanya Seti)

1. **Platform agent**: dibuat di mana? (a) Karsa Agent Studio — slot tim
   #020 dst (kapasitas 100 tim, terpakai 19); (b) definisi agent berupa file
   (pola TIM.md tim bella); (c) langsung sebagai modul di dashboard HR.
2. **Nama agent**: pakai ID + judul unit (AGT-001 dst, seperti di atas), atau
   nama orang Indonesia seperti tim bella (Sinta, Bagas, dst)?
3. **Isi detail tiap agent**: cukup kode + judul + jenjang (seperti dokumen
   ini), atau dilengkapi elemen + KUK lengkap dari lampiran SKKNI 149/2020
   (260 halaman — perlu diekstrak per unit)?
