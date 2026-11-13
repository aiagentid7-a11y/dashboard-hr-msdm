# Draf 9 Panel Klaster — Dashboard HR MSDM

**Status: DRAF** — dibuat 13 November 2026 atas perintah Seti ("Ya, buatkan draf 9 panel").
Ini draf tata letak + isi panel saja, **bukan** build dashboard. Struktur agent mengacu ke
`struktur-61-agent-msdm.md` (61 agent = 61 unit SKKNI 149/2020, 9 klaster).

Prinsip: **1 dashboard HR utama + 9 panel klaster** (bukan 9 dashboard lepas).
Tiap panel menampilkan: daftar agent klaster itu, tugas masuk, dan hasil kerjanya.
Koordinator yang memilih dan menggabungkan agent = dashboard (semua agent `reportsTo: null`).

## Dashboard utama

- Ringkasan: jumlah karyawan, status penilaian, tugas menunggu review manusia
- Cari karyawan
- Pilih jenjang (J3–J7) → koordinator pilih agent inti wajib + pilihan dari kolam resmi jenjang itu
- Pintu masuk ke 9 panel klaster di bawah

## Panel A — Strategi & Kebijakan MSDM (4 agent)

**Isi: anggaran + evaluasi kebijakan**

| Agent | Unit |
|---|---|
| AGT-001 | Merumuskan Strategi dan Kebijakan MSDM |
| AGT-002 | Mengevaluasi Efektivitas Strategi dan Kebijakan MSDM |
| AGT-003 | Menetapkan Rencana Kegiatan dan Anggaran MSDM |
| AGT-060 | Menyiapkan Data Penyusunan Anggaran Tahunan SDM |

Tugas masuk: rencana kegiatan + anggaran tahunan, evaluasi efektivitas kebijakan.
Hasil: draf kebijakan, anggaran MSDM, laporan evaluasi. Ritme: tahunan/kuartalan.

## Panel B — Desain & Pengembangan Organisasi (8 agent)

**Isi: struktur, proses bisnis, budaya**

| Agent | Unit |
|---|---|
| AGT-004 | Merancang Desain Organisasi |
| AGT-005 | Merumuskan Proses Bisnis serta Tugas dan Fungsi dalam Organisasi |
| AGT-006 | Merumuskan Perubahan Strategis Organisasi |
| AGT-007 | Merumuskan Budaya Organisasi |
| AGT-008 | Membuat Bagan Struktur Organisasi |
| AGT-009 | Mengevaluasi Efektivitas Struktur Organisasi |
| AGT-015 | Mengelola Proses Perubahan (Change Management) |
| AGT-016 | Mengelola Proses Pengembangan Budaya Organisasi |

Tugas masuk: desain/bagan struktur, proses bisnis, perubahan organisasi, budaya.
Hasil: bagan struktur, dokumen proses bisnis, rencana change management. Ritme: per proyek/perubahan.

## Panel C — Perencanaan & Pengadaan SDM (10 agent)

**Isi: kebutuhan SDM, rekrutmen, seleksi**

| Agent | Unit |
|---|---|
| AGT-010 | Menyusun Uraian Jabatan |
| AGT-011 | Melaksanakan Analisis Beban Kerja |
| AGT-012 | Menyusun Kebutuhan SDM |
| AGT-013 | Menyusun Standar Operasional Prosedur (SOP) MSDM |
| AGT-014 | Mengevaluasi Efektivitas Standar Operasional Prosedur (SOP) MSDM |
| AGT-017 | Melakukan Proses Rekrutmen |
| AGT-018 | Melakukan Proses Seleksi |
| AGT-019 | Menyusun Rekomendasi Hasil Seleksi |
| AGT-020 | Melakukan Penawaran Kerja Kepada Calon Pekerja |
| AGT-021 | Mengelola Program Orientasi Kerja |

Tugas masuk: kebutuhan SDM, lowongan, lamaran, hasil seleksi, orientasi karyawan baru.
Hasil: uraian jabatan, SOP, rekomendasi seleksi, surat penawaran kerja. Ritme: per rekrutmen.

## Panel D — Remunerasi & Pengupahan (5 agent)

**Isi: grading, gaji, insentif, administrasi pengupahan**

| Agent | Unit |
|---|---|
| AGT-022 | Menyusun Grading Jabatan |
| AGT-023 | Menyusun Sistem Remunerasi |
| AGT-024 | Menentukan Upah Pekerja |
| AGT-025 | Merumuskan Program Insentif dan/atau Bonus |
| AGT-057 | Melakukan Administrasi Pengupahan |

Tugas masuk: grading jabatan, struktur gaji, insentif/bonus, administrasi pengupahan.
Hasil: grading, sistem remunerasi, perhitungan upah/insentif. Ritme: bulanan
(kecuali AGT-057 Administrasi Pengupahan yang bisa harian). Keputusan gaji tidak pernah jalan otomatis.

## Panel E — Manajemen Kinerja (5 agent)

**Isi: indikator, monitoring, penilaian**

| Agent | Unit |
|---|---|
| AGT-026 | Mengelola Proses Perumusan Indikator Kinerja Individu |
| AGT-027 | Mengelola Proses Monitoring Pencapaian Kinerja Individu |
| AGT-028 | Mengelola Proses Pemberian Umpan Balik Kinerja Individu |
| AGT-029 | Mengelola Proses Penilaian Kinerja Individu |
| AGT-030 | Menindaklanjuti Hasil Penilaian Kinerja Individu |

Tugas masuk: indikator kinerja, capaian, umpan balik, penilaian.
Hasil: indikator individu, laporan monitoring, hasil penilaian + tindak lanjut. Ritme: mingguan/bulanan.

## Panel F — Pembelajaran & Pengembangan (6 agent)

**Isi: kebutuhan training, program, asesmen**

| Agent | Unit |
|---|---|
| AGT-031 | Menyusun Kebutuhan Pembelajaran dan Pengembangan |
| AGT-032 | Merancang Program Pembelajaran dan Pengembangan |
| AGT-033 | Melaksanakan Kegiatan Pembelajaran dan Pengembangan |
| AGT-034 | Mengevaluasi Pelaksanaan Program Pembelajaran dan Pengembangan |
| AGT-035 | Merancang Model dan Kamus Kompetensi |
| AGT-036 | Mengelola Kegiatan Asesmen |

Tugas masuk: gap kompetensi dari hasil penilaian, kebutuhan training.
Hasil: rencana pelatihan, program, model/kamus kompetensi, hasil asesmen. Ritme: per program.

## Panel G — Manajemen Talenta & Karir (5 agent)

**Isi: talent pool, suksesi, jalur karir**

| Agent | Unit |
|---|---|
| AGT-037 | Menyusun Kelompok Pekerja Bertalenta (Talent Pool) |
| AGT-038 | Mengelola Program Pengembangan Kelompok Pekerja Bertalenta (Talent Pool) |
| AGT-039 | Merancang Jalur Karir Pekerja |
| AGT-040 | Mengelola Program Suksesi |
| AGT-041 | Melakukan Konsultasi Karir |

Tugas masuk: daftar talenta, rencana suksesi, jalur karir.
Hasil: talent pool, program pengembangan talenta, jalur karir, rencana suksesi. Ritme: per program/kuartalan.

## Panel H — Hubungan Industrial (13 agent)

**Isi: keluhan, disiplin, PHK, PP/PKB**

| Agent | Unit |
|---|---|
| AGT-042 | Membuat Kesepakatan Kerja |
| AGT-043 | Menyusun Peraturan Perusahaan dan/atau Perjanjian Kerja Bersama |
| AGT-044 | Membangun Komunikasi Organisasi yang Efektif |
| AGT-045 | Menjalin Kerjasama Pengusaha dan Pekerja |
| AGT-046 | Menjalin Kerjasama Tripartit |
| AGT-047 | Menangani Keluhan Pekerja |
| AGT-048 | Mengelola Proses Pelaksanaan Tindakan Disiplin |
| AGT-049 | Melaksanakan Proses Pemutusan Hubungan Kerja |
| AGT-050 | Mengelola Masalah Perselisihan Hubungan Industrial Antar Pemangku Kepentingan di Organisasi |
| AGT-051 | Memfasilitasi Pengelolaan Kepuasan dan Keterlekatan Pekerja |
| AGT-052 | Mengelola Keseimbangan Antara Pekerjaan Dan Kehidupan Pribadi Pekerja |
| AGT-053 | Mengelola Pelaksanaan Alihdaya atau Outsourcing |
| AGT-054 | Menyelesaikan Mogok Kerja dan/atau Lock-out |

Tugas masuk: keluhan pekerja, kasus disiplin, PHK, perselisihan, PP/PKB.
Hasil: kesepakatan kerja, PP/PKB, berita acara disiplin/PHK, status kasus. Ritme: insidentil (per kasus).
Keputusan sensitif (PHK, disiplin) tidak pernah jalan otomatis — selalu tahan untuk manusia.

## Panel I — Sistem Informasi & Administrasi SDM (5 agent)

**Isi: data karyawan, BPJS, sistem informasi**

| Agent | Unit |
|---|---|
| AGT-055 | Mengembangkan Sistem Informasi Pekerja |
| AGT-056 | Memfasilitasi Penggunaan Sistem Informasi Pekerja |
| AGT-058 | Melakukan Administrasi Jaminan Sosial |
| AGT-059 | Melakukan Administrasi Penerapan Kebijakan MSDM |
| AGT-061 | Menangani Administrasi Pekerja Antar Negara |

Tugas masuk: data karyawan, absensi/cuti, BPJS, surat, administrasi kebijakan.
Hasil: data karyawan terkelola, status BPJS, surat administrasi. Ritme: **harian** — ini klaster
yang paling rutin kegiatan hariannya.
