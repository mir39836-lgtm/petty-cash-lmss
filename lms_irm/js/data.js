// PETTY CASH LEARNING - Comprehensive Learning Data & Initial State
(function () {
  // Ultra-fast Offline SVG Avatar & Thumbnail Generators (0ms Latency on GitHub Pages)
  function makeAvatar(initials, bg) {
    return "data:image/svg+xml;utf8," + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="${bg}"/><text x="50" y="58" font-size="34" text-anchor="middle" fill="white" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="800">${initials}</text></svg>`
    );
  }

  function makeVideoThumb(babNum, title, bg1, bg2) {
    return "data:image/svg+xml;utf8," + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360"><defs><linearGradient id="g${babNum}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${bg1}"/><stop offset="100%" stop-color="${bg2}"/></linearGradient></defs><rect width="600" height="360" rx="28" fill="url(#g${babNum})"/><circle cx="300" cy="180" r="48" fill="white" opacity="0.25"/><polygon points="290,160 322,180 290,200" fill="white"/><rect x="36" y="36" width="130" height="34" rx="17" fill="black" opacity="0.35"/><text x="101" y="58" fill="white" font-size="13" font-weight="800" font-family="sans-serif" text-anchor="middle">MODUL BAB ${babNum}</text><text x="300" y="275" fill="white" font-size="18" font-weight="800" font-family="sans-serif" text-anchor="middle">${title}</text><text x="300" y="304" fill="rgba(255,255,255,0.85)" font-size="12" font-weight="600" font-family="sans-serif" text-anchor="middle">PETTY CASH LEARNING - AKUNTANSI SMK</text></svg>`
    );
  }

  const INITIAL_DATA = {
    // Info Platform
    appInfo: {
      name: "PETTY CASH LEARNING",
      tagline: "Belajar Kas Kecil Jadi Lebih Mudah dan Menyenangkan!",
      institution: "LMS Akuntansi & Keuangan Lembaga (AKL)",
      academicYear: "2024/2025 - Semester Genap"
    },

    // Akun Pengguna Default
    users: {
      guru: {
        id: "T-001",
        role: "guru",
        name: "Dra. Hj. Nurjanah, M.Pd.",
        nip: "198204152008012015",
        subject: "Praktikum Akuntansi Perusahaan Jasa, Dagang & Manufaktur",
        avatar: makeAvatar("NJ", "#7C3AED"),
        email: "nurjanah.guru@lms-pettycash.sch.id",
        unreadNotif: 3
      },
      siswaList: [
        {
          id: "S-101",
          role: "siswa",
          name: "Rian Pratama",
          nis: "22231001",
          kelas: "XII AKL 1",
          avatar: makeAvatar("RP", "#2563EB"),
          progressPercent: 78,
          completedChapters: [1, 2, 3],
          completedVideos: [1],
          lastQuizScore: 92,
          quizHistory: [
            { id: "q1", title: "Kuis Bab 1 & 2: Konsep Dasar", score: 95, date: "2024-10-15" },
            { id: "q2", title: "Kuis Bab 3: Imprest vs Fluktuasi", score: 90, date: "2024-10-22" },
            { id: "q3", title: "Kuis Bab 4: Penjurnalan Kas Kecil", score: 92, date: "2024-10-29" }
          ],
          journalSimulations: [
            { id: "sim-1", title: "Pembentukan Dana Kas Kecil", score: 100, completed: true },
            { id: "sim-2", title: "Pengeluaran Beban ATK & Konsumsi", score: 100, completed: true },
            { id: "sim-3", title: "Penyesuaian Selisih Kas Kurang", score: 85, completed: true }
          ],
          badges: ["Pelajar Tanggap", "Master Imprest", "Akuntan Teliti"]
        },
        {
          id: "S-102",
          role: "siswa",
          name: "Siti Aisyah",
          nis: "22231002",
          kelas: "XII AKL 1",
          avatar: makeAvatar("SA", "#DB2777"),
          progressPercent: 92,
          completedChapters: [1, 2, 3, 4],
          completedVideos: [1],
          lastQuizScore: 96,
          quizHistory: [
            { id: "q1", title: "Kuis Bab 1 & 2: Konsep Dasar", score: 100, date: "2024-10-14" },
            { id: "q2", title: "Kuis Bab 3: Imprest vs Fluktuasi", score: 95, date: "2024-10-20" },
            { id: "q3", title: "Kuis Bab 4: Penjurnalan Kas Kecil", score: 96, date: "2024-10-28" }
          ],
          journalSimulations: [
            { id: "sim-1", title: "Pembentukan Dana Kas Kecil", score: 100, completed: true },
            { id: "sim-2", title: "Pengeluaran Beban ATK & Konsumsi", score: 100, completed: true },
            { id: "sim-3", title: "Penyesuaian Selisih Kas Kurang", score: 100, completed: true },
            { id: "sim-4", title: "Pengisian Kembali Kas Kecil", score: 95, completed: true }
          ],
          badges: ["Pelajar Tanggap", "Master Imprest", "Akuntan Teliti", "Bintang Kelas"]
        },
        {
          id: "S-103",
          role: "siswa",
          name: "Ahmad Fauzi",
          nis: "22231003",
          kelas: "XII AKL 1",
          avatar: makeAvatar("AF", "#D97706"),
          progressPercent: 45,
          completedChapters: [1, 2],
          completedVideos: [1],
          lastQuizScore: 78,
          quizHistory: [
            { id: "q1", title: "Kuis Bab 1 & 2: Konsep Dasar", score: 78, date: "2024-10-18" }
          ],
          journalSimulations: [
            { id: "sim-1", title: "Pembentukan Dana Kas Kecil", score: 90, completed: true }
          ],
          badges: ["Pelajar Tanggap"]
        },
        {
          id: "S-104",
          role: "siswa",
          name: "Dewi Lestari",
          nis: "22231004",
          kelas: "XII AKL 1",
          avatar: makeAvatar("DL", "#059669"),
          progressPercent: 65,
          completedChapters: [1, 2, 3],
          completedVideos: [1],
          lastQuizScore: 84,
          quizHistory: [
            { id: "q1", title: "Kuis Bab 1 & 2: Konsep Dasar", score: 88, date: "2024-10-17" },
            { id: "q2", title: "Kuis Bab 3: Imprest vs Fluktuasi", score: 84, date: "2024-10-25" }
          ],
          journalSimulations: [
            { id: "sim-1", title: "Pembentukan Dana Kas Kecil", score: 95, completed: true },
            { id: "sim-2", title: "Pengeluaran Beban ATK & Konsumsi", score: 90, completed: true }
          ],
          badges: ["Pelajar Tanggap", "Master Imprest"]
        },
        {
          id: "S-105",
          role: "siswa",
          name: "Bagas Wicaksono",
          nis: "22231005",
          kelas: "XII AKL 1",
          avatar: makeAvatar("BW", "#4F46E5"),
          progressPercent: 82,
          completedChapters: [1, 2, 3, 4],
          completedVideos: [1],
          lastQuizScore: 88,
          quizHistory: [
            { id: "q1", title: "Kuis Bab 1 & 2: Konsep Dasar", score: 85, date: "2024-10-15" },
            { id: "q2", title: "Kuis Bab 3: Imprest vs Fluktuasi", score: 90, date: "2024-10-22" },
            { id: "q3", title: "Kuis Bab 4: Penjurnalan Kas Kecil", score: 88, date: "2024-10-29" }
          ],
          journalSimulations: [
            { id: "sim-1", title: "Pembentukan Dana Kas Kecil", score: 100, completed: true },
            { id: "sim-2", title: "Pengeluaran Beban ATK & Konsumsi", score: 95, completed: true }
          ],
          badges: ["Pelajar Tanggap", "Master Imprest"]
        }
      ]
    },

    // 5 BAB MATERI LENGKAP KAS KECIL
    chapters: [
      {
        id: 1,
        title: "BAB 1 – Pengenalan Kas Kecil",
        subtitle: "Konsep Dasar, Tujuan, Karakteristik & Pengeluaran Kas Kecil",
        duration: "45 Menit",
        icon: "fa-wallet",
        color: "blue",
        summary: "Kas kecil (petty cash) adalah sejumlah dana kas yang dibentuk khusus untuk membiayai pengeluaran operasional perusahaan yang sifatnya relatif kecil, rutin, dan tidak efektif jika dibayar menggunakan cek bank.",
        sections: [
          {
            heading: "1. Pengertian Kas Kecil (Petty Cash)",
            content: `
              <p class="mb-3 leading-relaxed text-slate-700">Dalam tata kelola keuangan perusahaan modern, seluruh penerimaan kas umumnya disetor langsung ke bank, dan pengeluaran dalam jumlah besar dilakukan melalui <strong>cek atau transfer bank (bilyet giro)</strong> demi keamanan dan akuntabilitas.</p>
              <p class="mb-3 leading-relaxed text-slate-700">Namun, setiap hari selalu ada transaksi operasional rutin yang bernilai kecil, misalnya membeli materai, membeli perlengkapan ATK darurat, membayar ongkos parkir dan kurir, atau menyediakan konsumsi rapat tamu direksi. Membayar transaksi bernilai puluhan ribu rupiah dengan menulis selembar cek bank adalah tindakan yang <strong>sangat tidak praktis, memakan waktu, dan memboroskan biaya administrasi perbankan</strong>.</p>
              <div class="p-4 my-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl">
                <p class="font-bold text-blue-900 text-sm mb-1"><i class="fa-solid fa-lightbulb text-amber-500 mr-2"></i>Definisi Formal Kas Kecil:</p>
                <p class="text-blue-800 text-sm italic">"Kas Kecil (Petty Cash) adalah sejumlah dana tunai yang disisihkan dan disediakan secara khusus oleh perusahaan untuk melayani pembayaran pengeluaran-pengeluaran operasional yang jumlahnya relatif kecil, rutin, dan tidak efisien jika dibayarkan menggunakan cek."</p>
              </div>
            `
          },
          {
            heading: "2. Tujuan Pembentukan Kas Kecil",
            content: `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-400 transition-colors">
                  <div class="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-2">1</div>
                  <h4 class="font-bold text-slate-800 mb-1">Kelancaran Operasional Harian</h4>
                  <p class="text-xs text-slate-600">Menghindari hambatan operasional sehingga kebutuhan mendesak kantor dapat diselesaikan seketika tanpa birokrasi perbankan yang panjang.</p>
                </div>
                <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-purple-400 transition-colors">
                  <div class="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg mb-2">2</div>
                  <h4 class="font-bold text-slate-800 mb-1">Efisiensi Waktu & Biaya</h4>
                  <p class="text-xs text-slate-600">Menghemat waktu staf dan biaya administrasi karena staf tidak perlu bolak-balik ke bank hanya untuk mencairkan uang dalam jumlah kecil.</p>
                </div>
                <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-amber-400 transition-colors">
                  <div class="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg mb-2">3</div>
                  <h4 class="font-bold text-slate-800 mb-1">Pelayanan Prima (Service Excellence)</h4>
                  <p class="text-xs text-slate-600">Mempercepat penanganan tamu, relasi bisnis, atau keperluan mendadak pimpinan tanpa rasa canggung atau tertunda.</p>
                </div>
                <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-emerald-400 transition-colors">
                  <div class="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg mb-2">4</div>
                  <h4 class="font-bold text-slate-800 mb-1">Mencegah Penyelewengan Dana</h4>
                  <p class="text-xs text-slate-600">Memperketat pengawasan kas perusahaan dengan memisahkan kas besar di bank dan menetapkan batasan maksimal pengeluaran tunai.</p>
                </div>
              </div>
            `
          },
          {
            heading: "3. Karakteristik Kas Kecil",
            content: `
              <p class="mb-3 text-slate-700 leading-relaxed">Kas kecil memiliki ciri khas yang membedakannya dengan kas utama perusahaan di bank:</p>
              <ul class="space-y-2 text-sm text-slate-700">
                <li class="flex items-start gap-2"><i class="fa-solid fa-check-circle text-emerald-500 mt-1"></i><span><strong>Jumlah Dibatasi (Plafon Tertentu):</strong> Saldo kas kecil telah ditetapkan batas maksimalnya oleh manajemen berdasarkan estimasi kebutuhan pengeluaran periode tertentu (misal: Rp 5.000.000,- per bulan).</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check-circle text-emerald-500 mt-1"></i><span><strong>Hanya Untuk Pengeluaran Tertentu:</strong> Kas kecil tidak boleh digunakan untuk membayar gaji karyawan, membeli aktiva tetap bernilai besar, atau memberi pinjaman pribadi kepada pegawai.</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check-circle text-emerald-500 mt-1"></i><span><strong>Dikelola oleh Kasir Kas Kecil:</strong> Dikelola oleh pemegang kas kecil (petty cashier) yang ditunjuk khusus dan terpisah dari pemegang buku besar akuntansi.</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check-circle text-emerald-500 mt-1"></i><span><strong>Disimpan di Brankas Kecil (Petty Cash Box):</strong> Uang fisik kas kecil disimpan di kotak kas berkunci demi keamanan fisik.</span></li>
                <li class="flex items-start gap-2"><i class="fa-solid fa-check-circle text-emerald-500 mt-1"></i><span><strong>Wajib Disertai Bukti Fisik:</strong> Setiap pengeluaran sekecil apapun wajib melampirkan kuitansi, nota kontan, atau struk pembelian sebagai bukti pertanggungjawaban.</span></li>
              </ul>
            `
          },
          {
            heading: "4. Contoh Pengeluaran Nyata Kas Kecil",
            content: `
              <div class="overflow-x-auto my-3 border border-slate-200 rounded-xl">
                <table class="ledger-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Jenis Pengeluaran</th>
                      <th>Estimasi Biaya</th>
                      <th>Bukti Transaksi</th>
                      <th>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="font-bold">1</td>
                      <td>Pembelian Materai & Perangko</td>
                      <td class="font-semibold text-slate-800">Rp 100.000</td>
                      <td>Struk Kantor Pos / Nota</td>
                      <td>Legalitas surat perjanjian mendesak</td>
                    </tr>
                    <tr>
                      <td class="font-bold">2</td>
                      <td>Konsumsi Rapat Internal & Tamu</td>
                      <td class="font-semibold text-slate-800">Rp 250.000</td>
                      <td>Nota Kontan / Bon Makanan</td>
                      <td>Snack box & minuman rapat koordinasi</td>
                    </tr>
                    <tr>
                      <td class="font-bold">3</td>
                      <td>Perlengkapan ATK Darurat</td>
                      <td class="font-semibold text-slate-800">Rp 175.000</td>
                      <td>Struk Toko Buku / Nota</td>
                      <td>Kertas HVS A4 habis saat cetak laporan</td>
                    </tr>
                    <tr>
                      <td class="font-bold">4</td>
                      <td>Ongkos Kirim Kurir Instan / GrabExpress</td>
                      <td class="font-semibold text-slate-800">Rp 45.000</td>
                      <td>Bukti E-Receipt / Aplikasi</td>
                      <td>Pengiriman sampel produk ke mitra klien</td>
                    </tr>
                    <tr>
                      <td class="font-bold">5</td>
                      <td>Pembelian Alat Kebersihan Kantor</td>
                      <td class="font-semibold text-slate-800">Rp 80.000</td>
                      <td>Struk Swalayan / Minimarket</td>
                      <td>Refill pembersih lantai & pengharum ruangan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            `
          }
        ]
      },
      {
        id: 2,
        title: "BAB 2 – Pengelolaan Kas Kecil",
        subtitle: "Pihak Terkait, Prosedur Alur Dana & Bukti Dokumen Transaksi",
        duration: "50 Menit",
        icon: "fa-clipboard-list",
        color: "purple",
        summary: "Pengelolaan kas kecil melibatkan pemisahan tugas antara Bagian Utang/Akuntansi, Bagian Kasa, Kasir Kas Kecil, dan Departemen Pemakai. Setiap tahap dilengkapi dokumen baku seperti SK Pembentukan, Cek, BKK, BPKK, dan PPKK.",
        sections: [
          {
            heading: "1. Pihak-Pihak yang Bertanggung Jawab",
            content: `
              <p class="mb-3 text-slate-700 leading-relaxed">Prinsip <em>internal control</em> (pengendalian internal) mewajibkan adanya pemisahan fungsi dan tanggung jawab agar tidak terjadi manipulasi dana kas kecil:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div class="flex items-center gap-2 mb-2 font-bold text-purple-900">
                    <i class="fa-solid fa-file-invoice text-purple-600"></i> Bagian Utang / Akuntansi
                  </div>
                  <p class="text-xs text-slate-700 leading-relaxed">Bertanggung jawab membuat Bukti Kas Keluar (BKK), memeriksa keabsahan dokumen pengeluaran, mencatat pembentukan serta pengisian kembali kas kecil ke dalam jurnal umum.</p>
                </div>
                <div class="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div class="flex items-center gap-2 mb-2 font-bold text-blue-900">
                    <i class="fa-solid fa-building-columns text-blue-600"></i> Bagian Kasa / Bendahara Umum
                  </div>
                  <p class="text-xs text-slate-700 leading-relaxed">Bertanggung jawab menandatangani cek tunai perusahaan dan menyerahkan dana tersebut kepada kasir kas kecil setelah mendapat otorisasi pimpinan.</p>
                </div>
                <div class="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div class="flex items-center gap-2 mb-2 font-bold text-amber-900">
                    <i class="fa-solid fa-user-check text-amber-600"></i> Pemegang Kasir Kas Kecil (Petty Cashier)
                  </div>
                  <p class="text-xs text-slate-700 leading-relaxed">Menerima fisik uang tunai, menyimpannya di kas box, melayani pembayaran tunai harian sesuai bukti otorisasi, dan mengumpulkan bukti-bukti nota/kuitansi asli.</p>
                </div>
                <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div class="flex items-center gap-2 mb-2 font-bold text-emerald-900">
                    <i class="fa-solid fa-users text-emerald-600"></i> Departemen / Unit Pemakai
                  </div>
                  <p class="text-xs text-slate-700 leading-relaxed">Unit yang mengajukan permohonan dana tunai untuk keperluan dinas, menandatangani bukti pengeluaran, dan menyerahkan nota/bon asli setelah transaksi selesai.</p>
                </div>
              </div>
            `
          },
          {
            heading: "2. Prosedur Pengelolaan Dana Kas Kecil",
            content: `
              <div class="space-y-4 my-3">
                <div class="p-4 bg-white border border-slate-200 rounded-xl">
                  <h4 class="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">A</span>
                    Prosedur Pembentukan Dana Kas Kecil
                  </h4>
                  <ol class="list-decimal list-inside text-xs text-slate-600 space-y-1 ml-2">
                    <li>Manajemen menerbitkan Surat Keputusan penetapan plafon kas kecil (misal Rp 4.000.000,-).</li>
                    <li>Bagian Utang membuat Bukti Kas Keluar (BKK) rangkap 3 disertai lampiran SK.</li>
                    <li>Bagian Kasa menerbitkan dan menandatangani Cek Tunai atas nama pemegang kas kecil.</li>
                    <li>Pemegang kas kecil mencairkan cek ke bank dan menyimpan uang fisik di kas box.</li>
                  </ol>
                </div>

                <div class="p-4 bg-white border border-slate-200 rounded-xl">
                  <h4 class="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">B</span>
                    Prosedur Penggunaan & Pembayaran Kas Kecil
                  </h4>
                  <ol class="list-decimal list-inside text-xs text-slate-600 space-y-1 ml-2">
                    <li>Pemakai mengisi Formulir Permintaan Pengeluaran Kas Kecil (PPKK) disetujui kepala bagiannya.</li>
                    <li>Kasir kas kecil menyerahkan uang dan membuat Bukti Pengeluaran Kas Kecil (BPKK).</li>
                    <li>Pemakai menyerahkan nota, kuitansi, atau struk asli kepada kasir kas kecil sebagai bukti sah.</li>
                    <li>Kasir kas kecil mengarsipkan BPKK dan nota pendukung di kotak arsip kas kecil.</li>
                  </ol>
                </div>

                <div class="p-4 bg-white border border-slate-200 rounded-xl">
                  <h4 class="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">C</span>
                    Prosedur Pengisian Kembali Kas Kecil
                  </h4>
                  <ol class="list-decimal list-inside text-xs text-slate-600 space-y-1 ml-2">
                    <li>Saat sisa fisik kas kecil menipis (mencapai batas minimum, misal sisa Rp 500.000,-), kasir menyusun rekapitulasi pengeluaran.</li>
                    <li>Kasir membuat Permintaan Pengisian Kembali Kas Kecil (PPKK) dilampiri seluruh BPKK dan nota asli.</li>
                    <li>Bagian Akuntansi memeriksa fisik bukti transaksi, lalu menerbitkan BKK baru.</li>
                    <li>Bagian Kasa menerbitkan cek sejumlah pengeluaran yang telah disetujui agar saldo kembali ke jumlah awal.</li>
                  </ol>
                </div>
              </div>
            `
          },
          {
            heading: "3. Dokumen & Bukti Transaksi Kas Kecil",
            content: `
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span class="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold text-[11px] rounded">Dokumen 1</span>
                  <p class="font-bold text-slate-800 text-sm mt-1">Cek Tunai</p>
                  <p class="text-[12px] text-slate-600">Surat perintah bayar kepada bank untuk mencairkan uang kas kecil.</p>
                </div>
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span class="px-2 py-0.5 bg-purple-100 text-purple-800 font-bold text-[11px] rounded">Dokumen 2</span>
                  <p class="font-bold text-slate-800 text-sm mt-1">BKK (Bukti Kas Keluar)</p>
                  <p class="text-[12px] text-slate-600">Bukti resmi bahwa bagian kas mengeluarkan cek untuk pembentukan/pengisian.</p>
                </div>
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded">Dokumen 3</span>
                  <p class="font-bold text-slate-800 text-sm mt-1">BPKK (Bukti Pengeluaran)</p>
                  <p class="text-[12px] text-slate-600">Tanda terima kasir saat mengeluarkan uang tunai kepada pegawai pemakai.</p>
                </div>
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span class="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold text-[11px] rounded">Dokumen 4</span>
                  <p class="font-bold text-slate-800 text-sm mt-1">PPKK (Pengisian Kembali)</p>
                  <p class="text-[12px] text-slate-600">Daftar rekap nota yang diajukan kasir untuk meminta penggantian kas.</p>
                </div>
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span class="px-2 py-0.5 bg-cyan-100 text-cyan-800 font-bold text-[11px] rounded">Dokumen 5</span>
                  <p class="font-bold text-slate-800 text-sm mt-1">Nota Kontan & Struk</p>
                  <p class="text-[12px] text-slate-600">Bukti otentik eksternal dari toko/penjual barang/jasa sebagai lampiran wajib.</p>
                </div>
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span class="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold text-[11px] rounded">Dokumen 6</span>
                  <p class="font-bold text-slate-800 text-sm mt-1">Kuitansi Bermaterai</p>
                  <p class="text-[12px] text-slate-600">Tanda bukti penerimaan uang bagi transaksi bernilai tertentu yang sah menurut hukum.</p>
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: 3,
        title: "BAB 3 – Metode Pencatatan Kas Kecil",
        subtitle: "Metode Dana Tetap (Imprest) vs Dana Fluktuasi (Fluctuating)",
        duration: "60 Menit",
        icon: "fa-scale-balanced",
        color: "amber",
        summary: "Ada dua sistem akuntansi utama pencatatan kas kecil: Imprest Fund System (saldo rekening buku besar tetap sama, pengeluaran tidak langsung dijurnal) dan Fluctuating Fund System (saldo rekening berubah-ubah setiap ada transaksi pengeluaran).",
        sections: [
          {
            heading: "1. Pengertian Kedua Metode",
            content: `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl shadow-sm">
                  <div class="inline-block px-3 py-1 bg-blue-600 text-white rounded-full font-bold text-xs uppercase mb-2">Sistem 1</div>
                  <h3 class="text-lg font-bold text-blue-900 mb-2">Metode Dana Tetap (Imprest Fund System)</h3>
                  <p class="text-xs text-slate-700 leading-relaxed mb-3">
                    Pada metode ini, saldo rekening <strong>Kas Kecil di buku besar selalu bernilai TETAP</strong> (tidak pernah didebit atau dikredit saat terjadi pengeluaran harian).
                  </p>
                  <ul class="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    <li>Kasir hanya mencatat mutasi di Buku Kas Kecil intern (memorandum).</li>
                    <li>Saat pembayaran beban <strong>TIDAK DIBUAT JURNAL UMUM</strong>.</li>
                    <li>Jurnal beban baru dibuat saat <strong>pengisian kembali</strong>, dengan mendebit akun-akun beban dan mengkredit akun <em>Kas di Bank</em>.</li>
                    <li>Jumlah pengisian kembali selalu <strong>sama persis</strong> dengan total beban yang dikeluarkan.</li>
                  </ul>
                </div>

                <div class="p-5 bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-300 rounded-2xl shadow-sm">
                  <div class="inline-block px-3 py-1 bg-purple-600 text-white rounded-full font-bold text-xs uppercase mb-2">Sistem 2</div>
                  <h3 class="text-lg font-bold text-purple-900 mb-2">Metode Dana Berubah-Ubah (Fluctuating Fund System)</h3>
                  <p class="text-xs text-slate-700 leading-relaxed mb-3">
                    Pada metode ini, saldo rekening <strong>Kas Kecil di buku besar BERFLUKTUASI (naik-turun)</strong> setiap kali terjadi transaksi.
                  </p>
                  <ul class="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    <li>Setiap pengeluaran <strong>LANGSUNG DIJURNAL</strong> saat transaksi terjadi.</li>
                    <li>Jurnal pengeluaran: Debet <em>Beban ...</em>, Kredit <em>Kas Kecil</em>.</li>
                    <li>Saat pengisian kembali dijurnal: Debet <em>Kas Kecil</em>, Kredit <em>Kas di Bank</em>.</li>
                    <li>Jumlah pengisian kembali tidak harus sama dengan jumlah yang telah dikeluarkan (bisa lebih besar atau lebih kecil sesuai kebijakan).</li>
                  </ul>
                </div>
              </div>
            `
          },
          {
            heading: "2. Tabel Komparasi Komprehensif Antara Kedua Metode",
            content: `
              <div class="overflow-x-auto my-4 border border-slate-200 rounded-xl">
                <table class="ledger-table">
                  <thead>
                    <tr>
                      <th class="w-1/4">Peristiwa Transaksi</th>
                      <th class="w-3/8 text-blue-700">Metode Dana Tetap (Imprest)</th>
                      <th class="w-3/8 text-purple-700">Metode Fluktuasi (Fluctuating)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="font-bold text-slate-800">1. Pembentukan Dana Kas Kecil</td>
                      <td>
                        <span class="font-mono text-xs block text-emerald-700">Kas Kecil (D)</span>
                        <span class="font-mono text-xs block text-slate-600 ml-4">Kas di Bank (K)</span>
                      </td>
                      <td>
                        <span class="font-mono text-xs block text-emerald-700">Kas Kecil (D)</span>
                        <span class="font-mono text-xs block text-slate-600 ml-4">Kas di Bank (K)</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="font-bold text-slate-800">2. Pembayaran Beban Harian</td>
                      <td class="bg-amber-50/50">
                        <span class="font-bold text-xs text-amber-700 block">TIDAK DIJURNAL</span>
                        <span class="text-[11px] text-slate-500">(Hanya kumpulkan bukti fisik & catat di memo)</span>
                      </td>
                      <td>
                        <span class="font-mono text-xs block text-emerald-700">Beban-Beban (D)</span>
                        <span class="font-mono text-xs block text-slate-600 ml-4">Kas Kecil (K)</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="font-bold text-slate-800">3. Pengisian Kembali Kas Kecil</td>
                      <td>
                        <span class="font-mono text-xs block text-emerald-700">Beban-Beban (D)</span>
                        <span class="font-mono text-xs block text-slate-600 ml-4">Kas di Bank (K)</span>
                        <span class="text-[11px] text-blue-600 block mt-1">*(Nominal = total beban)*</span>
                      </td>
                      <td>
                        <span class="font-mono text-xs block text-emerald-700">Kas Kecil (D)</span>
                        <span class="font-mono text-xs block text-slate-600 ml-4">Kas di Bank (K)</span>
                        <span class="text-[11px] text-purple-600 block mt-1">*(Nominal bebas/sesuai kebutuhan)*</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="font-bold text-slate-800">4. Penyesuaian Akhir Periode (Bila belum diisi kembali)</td>
                      <td>
                        <span class="font-bold text-xs text-rose-700 block">WAJIB JURNAL PENYESUAIAN:</span>
                        <span class="font-mono text-xs block text-emerald-700">Beban-Beban (D)</span>
                        <span class="font-mono text-xs block text-slate-600 ml-4">Kas Kecil (K)</span>
                      </td>
                      <td class="bg-slate-50">
                        <span class="font-bold text-xs text-slate-500 block">TIDAK PERLU PENYESUAIAN</span>
                        <span class="text-[11px] text-slate-500">(Karena semua beban sudah tercatat seketika)</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="font-bold text-slate-800">5. Saldo Rekening Buku Besar</td>
                      <td class="font-semibold text-blue-700">Selalu Tetap sama dengan plafon awal</td>
                      <td class="font-semibold text-purple-700">Selalu berubah-ubah setiap saat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            `
          },
          {
            heading: "3. Perbandingan Kelebihan & Kekurangan",
            content: `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-xs text-slate-700">
                <div class="p-4 bg-white border border-slate-200 rounded-xl">
                  <h4 class="font-bold text-blue-800 mb-2">Metode Imprest (Dana Tetap):</h4>
                  <p class="text-emerald-700 font-semibold mb-1"><i class="fa-solid fa-thumbs-up mr-1"></i> Kelebihan:</p>
                  <ul class="list-disc list-inside space-y-1 mb-2 text-slate-600">
                    <li>Pengendalian anggaran sangat kuat dan terstruktur.</li>
                    <li>Mengurangi beban pekerjaan pencatatan jurnal harian di buku besar akuntansi.</li>
                    <li>Sisa dana dan total pengeluaran mudah diaudit setiap saat (Uang Fisik + Bukti Nota = Plafon Awal).</li>
                  </ul>
                  <p class="text-rose-700 font-semibold mb-1"><i class="fa-solid fa-thumbs-down mr-1"></i> Kekurangan:</p>
                  <ul class="list-disc list-inside space-y-1 text-slate-600">
                    <li>Saldo buku besar sebelum pengisian kembali tidak mencerminkan posisi saldo riil terkini.</li>
                    <li>Memerlukan jurnal penyesuaian di akhir periode bila laporan keuangan segera dibuat.</li>
                  </ul>
                </div>

                <div class="p-4 bg-white border border-slate-200 rounded-xl">
                  <h4 class="font-bold text-purple-800 mb-2">Metode Fluktuasi (Dana Berubah):</h4>
                  <p class="text-emerald-700 font-semibold mb-1"><i class="fa-solid fa-thumbs-up mr-1"></i> Kelebihan:</p>
                  <ul class="list-disc list-inside space-y-1 mb-2 text-slate-600">
                    <li>Saldo buku besar kas kecil selalu <em>up-to-date</em> mencerminkan kondisi riil setiap saat.</li>
                    <li>Pengisian kembali fleksibel tidak harus terikat jumlah plafon semula.</li>
                  </ul>
                  <p class="text-rose-700 font-semibold mb-1"><i class="fa-solid fa-thumbs-down mr-1"></i> Kekurangan:</p>
                  <ul class="list-disc list-inside space-y-1 text-slate-600">
                    <li>Frekuensi penjurnalan sangat tinggi, memakan waktu staf pembukuan.</li>
                    <li>Pengawasan dana lebih longgar sehingga rawan pemborosan kas operasional.</li>
                  </ul>
                </div>
              </div>
            `
          }
        ]
      },
      {
        id: 4,
        title: "BAB 4 – Pencatatan Transaksi Kas Kecil",
        subtitle: "Jurnal Pembentukan, Pengeluaran, Pengisian Kembali & Selisih Kas",
        duration: "65 Menit",
        icon: "fa-book-journal-whills",
        color: "blue",
        summary: "Mempelajari aturan debet/kredit lengkap, teknik penjurnalan kedua metode, hingga penanganan selisih kas lebih (cash overage) dan selisih kas kurang (cash shortage) disertai contoh studi kasus lengkap.",
        sections: [
          {
            heading: "1. Kaidah Penjurnalan Kas Kecil",
            content: `
              <p class="mb-3 text-slate-700 leading-relaxed">Kas Kecil merupakan akun golongan <strong>Aset Lancar (Harta)</strong> yang memiliki saldo normal di sisi <strong>Debet</strong>. Setiap penambahan kas kecil dicatat di Debet, dan setiap pengurangan kas kecil dicatat di Kredit.</p>
              <div class="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs space-y-2">
                <div class="text-amber-400 font-bold">// 1. Pembentukan Dana Kas Kecil (Semua Metode)</div>
                <div>[D] Kas Kecil ......................... Rp X.XXX.XXX</div>
                <div class="ml-8">[K] Kas di Bank ...................... Rp X.XXX.XXX</div>
                <div class="text-amber-400 font-bold mt-2">// 2. Pengeluaran Dana Kas Kecil (Hanya pada Metode Fluktuasi)</div>
                <div>[D] Beban ... (misal Beban Listrik/ATK) ... Rp XXX.XXX</div>
                <div class="ml-8">[K] Kas Kecil ........................ Rp XXX.XXX</div>
                <div class="text-amber-400 font-bold mt-2">// 3. Pengisian Kembali - Metode Imprest</div>
                <div>[D] Beban Perlengkapan Kantor ........... Rp XXX.XXX</div>
                <div>[D] Beban Konsumsi Rapat ................ Rp XXX.XXX</div>
                <div>[D] Beban Angkut / Kurir ................ Rp XXX.XXX</div>
                <div class="ml-8">[K] Kas di Bank ...................... Rp X.XXX.XXX</div>
                <div class="text-amber-400 font-bold mt-2">// 4. Pengisian Kembali - Metode Fluktuasi</div>
                <div>[D] Kas Kecil ......................... Rp X.XXX.XXX</div>
                <div class="ml-8">[K] Kas di Bank ...................... Rp X.XXX.XXX</div>
              </div>
            `
          },
          {
            heading: "2. Jurnal Selisih Kas Kecil (Cash Over & Cash Short)",
            content: `
              <p class="mb-3 text-slate-700 leading-relaxed">Saat dilakukan pemeriksaan fisik uang tunai (<em>cash count / physical count</em>) di kas box, terkadang terjadi perbedaan antara jumlah uang fisik nyata dengan catatan di buku kas kecil. Perbedaan ini disebut <strong>Selisih Kas (Cash Shortage / Cash Overage)</strong>.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                  <h4 class="font-bold text-rose-900 text-sm mb-1"><i class="fa-solid fa-circle-minus text-rose-600 mr-1"></i> Selisih Kas Kurang (Cash Shortage)</h4>
                  <p class="text-xs text-slate-600 mb-2">Terjadi jika fisik uang tunai <strong>LEBIH KECIL</strong> dibanding jumlah catatan buku kas.</p>
                  <p class="text-xs font-semibold text-rose-800">Jurnal Pengisian Kembali Imprest dengan Selisih Kurang:</p>
                  <div class="bg-white p-2.5 rounded border border-rose-300 font-mono text-[11px] mt-1 space-y-0.5">
                    <div>[D] Macam-macam Beban ..... Rp XXX</div>
                    <div>[D] Selisih Kas ............. Rp  50.000 (D)</div>
                    <div class="ml-6">[K] Kas di Bank ............. Rp XXX</div>
                  </div>
                  <p class="text-[11px] text-slate-500 mt-1 italic">*Selisih kas kurang di Debet diakui sebagai Beban Lain-lain.</p>
                </div>

                <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <h4 class="font-bold text-emerald-900 text-sm mb-1"><i class="fa-solid fa-circle-plus text-emerald-600 mr-1"></i> Selisih Kas Lebih (Cash Overage)</h4>
                  <p class="text-xs text-slate-600 mb-2">Terjadi jika fisik uang tunai <strong>LEBIH BESAR</strong> dibanding jumlah catatan buku kas.</p>
                  <p class="text-xs font-semibold text-emerald-800">Jurnal Pengisian Kembali Imprest dengan Selisih Lebih:</p>
                  <div class="bg-white p-2.5 rounded border border-emerald-300 font-mono text-[11px] mt-1 space-y-0.5">
                    <div>[D] Macam-macam Beban ..... Rp XXX</div>
                    <div class="ml-6">[K] Selisih Kas ............. Rp  30.000 (K)</div>
                    <div class="ml-6">[K] Kas di Bank ............. Rp XXX</div>
                  </div>
                  <p class="text-[11px] text-slate-500 mt-1 italic">*Selisih kas lebih di Kredit diakui sebagai Pendapatan Lain-lain.</p>
                </div>
              </div>
            `
          },
          {
            heading: "3. Contoh Soal Komprehensif & Pembahasan Penjurnalan",
            content: `
              <div class="p-4 bg-slate-50 border border-slate-300 rounded-xl mb-3">
                <h4 class="font-bold text-slate-800 text-sm mb-2"><i class="fa-solid fa-building text-blue-600 mr-1"></i> Kasus PT Maju Jaya Makmur (Bulan Oktober 2024)</h4>
                <ul class="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  <li><strong>01 Okt:</strong> Dibentuk dana kas kecil sebesar Rp 3.000.000,- dengan Cek No. C-101.</li>
                  <li><strong>07 Okt:</strong> Dibayar biaya konsumsi snack rapat mingguan sebesar Rp 350.000,-.</li>
                  <li><strong>14 Okt:</strong> Dibeli perlengkapan kantor (kertas dan tinta printer) Rp 450.000,-.</li>
                  <li><strong>21 Okt:</strong> Dibayar ongkos kirim dokumen kilat via kurir Rp 100.000,-.</li>
                  <li><strong>28 Okt:</strong> Dibayar biaya reparasi darurat AC kantor Rp 300.000,-.</li>
                  <li><strong>31 Okt:</strong> Dilakukan pengisian kembali kas kecil dengan cek No. C-102. Fisik uang cocok.</li>
                </ul>
              </div>

              <div class="overflow-x-auto border border-slate-200 rounded-xl my-2">
                <table class="ledger-table text-xs">
                  <thead>
                    <tr>
                      <th>Tgl</th>
                      <th>Keterangan</th>
                      <th class="text-blue-700">Jurnal Imprest</th>
                      <th class="text-purple-700">Jurnal Fluktuasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="font-bold">01 Okt</td>
                      <td>Pembentukan</td>
                      <td>Kas Kecil (D) 3.000.000<br><span class="ml-3">Kas di Bank (K) 3.000.000</span></td>
                      <td>Kas Kecil (D) 3.000.000<br><span class="ml-3">Kas di Bank (K) 3.000.000</span></td>
                    </tr>
                    <tr>
                      <td class="font-bold">07 Okt</td>
                      <td>Konsumsi Rapat</td>
                      <td class="text-amber-700 italic font-semibold">Tidak Dijurnal</td>
                      <td>Beban Konsumsi (D) 350.000<br><span class="ml-3">Kas Kecil (K) 350.000</span></td>
                    </tr>
                    <tr>
                      <td class="font-bold">14 Okt</td>
                      <td>ATK Perlengkapan</td>
                      <td class="text-amber-700 italic font-semibold">Tidak Dijurnal</td>
                      <td>Beban Perlengkapan (D) 450.000<br><span class="ml-3">Kas Kecil (K) 450.000</span></td>
                    </tr>
                    <tr>
                      <td class="font-bold">21 Okt</td>
                      <td>Ongkos Kirim</td>
                      <td class="text-amber-700 italic font-semibold">Tidak Dijurnal</td>
                      <td>Beban Angkut/Kurir (D) 100.000<br><span class="ml-3">Kas Kecil (K) 100.000</span></td>
                    </tr>
                    <tr>
                      <td class="font-bold">28 Okt</td>
                      <td>Reparasi AC</td>
                      <td class="text-amber-700 italic font-semibold">Tidak Dijurnal</td>
                      <td>Beban Pemeliharaan (D) 300.000<br><span class="ml-3">Kas Kecil (K) 300.000</span></td>
                    </tr>
                    <tr class="bg-blue-50/40">
                      <td class="font-bold">31 Okt</td>
                      <td>Pengisian Kembali<br>(Total: Rp 1.200.000)</td>
                      <td>
                        Beban Konsumsi (D) 350.000<br>
                        Beban Perlengkapan (D) 450.000<br>
                        Beban Kurir (D) 100.000<br>
                        Beban Pemeliharaan (D) 300.000<br>
                        <span class="ml-3 font-bold text-blue-700">Kas di Bank (K) 1.200.000</span>
                      </td>
                      <td>
                        Kas Kecil (D) 1.200.000<br>
                        <span class="ml-3 font-bold text-purple-700">Kas di Bank (K) 1.200.000</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            `
          }
        ]
      },
      {
        id: 5,
        title: "BAB 5 – Evaluasi dan Studi Kasus",
        subtitle: "Latihan Identifikasi Transaksi, Simulasi Analisis & Studi Kasus Perusahaan",
        duration: "55 Menit",
        icon: "fa-chart-pie",
        color: "purple",
        summary: "Menguji kompetensi analitis peserta didik dalam membedakan kelayakan transaksi kas kecil, menyelesaikan siklus akuntansi kas kecil, dan menganalisis studi kasus nyata di dunia kerja.",
        sections: [
          {
            heading: "1. Panduan Identifikasi Transaksi: Kas Kecil vs Kas Besar",
            content: `
              <p class="mb-3 text-slate-700 leading-relaxed">Seorang staf akuntansi harus mampu memilah dengan cepat dan tepat kapan sebuah transaksi dibiayai menggunakan kas kecil atau kas besar bank:</p>
              <div class="overflow-x-auto border border-slate-200 rounded-xl my-2">
                <table class="ledger-table text-xs">
                  <thead>
                    <tr>
                      <th>Karakteristik Pengeluaran</th>
                      <th class="text-blue-700">Kas Kecil (Petty Cash)</th>
                      <th class="text-purple-700">Kas Besar / Cek Bank</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="font-bold">Nominal Pembayaran</td>
                      <td>Di bawah batas plafon (biasanya &lt; Rp 1.000.000,-)</td>
                      <td>Nominal besar (ratusan juta s/d miliaran rupiah)</td>
                    </tr>
                    <tr>
                      <td class="font-bold">Alat Pembayaran</td>
                      <td>Uang tunai (kertas / koin fisik)</td>
                      <td>Cek, Bilyet Giro, atau RTGS/Transfer Bank</td>
                    </tr>
                    <tr>
                      <td class="font-bold">Sifat Kebutuhan</td>
                      <td>Rutin, mendadak, mendesak, operasional harian</td>
                      <td>Pembelian aset tetap, bayar utang usaha, bayar gaji</td>
                    </tr>
                    <tr>
                      <td class="font-bold">Risiko Keamanan</td>
                      <td>Rendah (karena jumlah uang tunai dibatasi)</td>
                      <td>Tinggi (membutuhkan otorisasi bertingkat / dewan direksi)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            `
          },
          {
            heading: "2. Studi Kasus Nyata: PT Sinar Abadi Mandiri",
            content: `
              <div class="p-4 bg-purple-50 border border-purple-200 rounded-xl text-xs text-slate-700 space-y-2">
                <div class="flex items-center gap-2 font-bold text-purple-900 text-sm">
                  <i class="fa-solid fa-briefcase"></i> Kasus Audit Dana Kas Kecil Akhir Bulan
                </div>
                <p>PT Sinar Abadi Mandiri menetapkan dana kas kecil sistem imprest sebesar <strong>Rp 5.000.000,-</strong> setiap tanggal 1 bulan berjalan. Pada tanggal 31 Oktober 2024, dilakukan penutupan buku dan pemeriksaan kas fisik (cash opname). Ditemukan data berikut:</p>
                <div class="bg-white p-3 rounded-lg border border-purple-200 font-mono space-y-1">
                  <div>- Uang kertas dan koin fisik di brankas : Rp 1.150.000,-</div>
                  <div>- Kuitansi nota konsumsi rapat direksi : Rp 1.200.000,-</div>
                  <div>- Nota pembelian perlengkapan cetak   : Rp 1.650.000,-</div>
                  <div>- Struk bensin dan tol kendaraan operasional : Rp 950.000,-</div>
                  <div class="border-t border-slate-300 pt-1 font-bold text-slate-800">
                    Total Bukti Pengeluaran + Fisik Uang = Rp 4.950.000,-
                  </div>
                </div>
                <div class="p-3 bg-amber-50 rounded-lg border border-amber-300">
                  <p class="font-bold text-amber-900"><i class="fa-solid fa-magnifying-glass mr-1"></i> Analisis Selisih:</p>
                  <p>Plafon Seharusnya = Rp 5.000.000,-<br>Total Riil (Fisik + Bukti) = Rp 4.950.000,-<br><strong>Selisih Kas Kurang (Cash Shortage) = Rp 50.000,-</strong> (uang tunai hilang/salah kembalian).</p>
                </div>
                <p class="font-semibold text-slate-800 mt-2">Jurnal Pengisian Kembali Imprest (Tanggal 31 Oktober):</p>
                <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono">
                  <div>[D] Beban Konsumsi Rapat ......... Rp 1.200.000</div>
                  <div>[D] Beban Perlengkapan Cetak ..... Rp 1.650.000</div>
                  <div>[D] Beban Transportasi & BBM ..... Rp   950.000</div>
                  <div>[D] Beban Selisih Kas ............ Rp    50.000</div>
                  <div class="ml-6 text-amber-400">[K] Kas di Bank ................. Rp 3.850.000</div>
                </div>
              </div>
            `
          },
          {
            heading: "3. Rangkuman Esensial & Glosarium Istilah Akuntansi",
            content: `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-2 text-xs">
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <p class="font-bold text-blue-800">Imprest Fund System</p>
                  <p class="text-slate-600">Sistem dana tetap di mana saldo akun kas kecil di buku besar tidak berubah, pengeluaran baru dicatat pada saat pengisian kembali.</p>
                </div>
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <p class="font-bold text-purple-800">Fluctuating Fund System</p>
                  <p class="text-slate-600">Sistem dana berfluktuasi di mana setiap pengeluaran langsung dijurnal mendebit beban dan mengkredit akun Kas Kecil.</p>
                </div>
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <p class="font-bold text-emerald-800">Cash Opname</p>
                  <p class="text-slate-600">Kegiatan penghitungan fisik uang tunai di brankas kas kecil secara serentak untuk dicocokkan dengan catatan kasir.</p>
                </div>
                <div class="p-3 bg-white border border-slate-200 rounded-lg">
                  <p class="font-bold text-rose-800">Cash Shortage / Overage</p>
                  <p class="text-slate-600">Kondisi ketidaksesuaian antara fisik kas dengan catatan saldo buku (kurang = debet beban selisih, lebih = kredit pendapatan selisih).</p>
                </div>
              </div>
            `
          }
        ]
      }
    ],

    // VIDEO PEMBELAJARAN (hanya 1 video)
    videos: [
      {
        id: 1,
        chapterId: 1,
        title: "Konsep Dasar Kas Kecil",
        duration: "08:45",
        thumbnail: makeVideoThumb(1, "Konsep & Definisi Kas Kecil", "#1e40af", "#3b82f6"),
        videoEmbedUrl: "https://www.youtube.com/embed/KBDshXy2pzU", // Masukkan link video Anda di sini
        description: "Penjelasan interaktif mengenai apa itu kas kecil, tujuan pembentukannya, dan karakteristik utamanya dalam perusahaan.",
        keyPoints: [
          "Definisi dan karakteristik Petty Cash",
          "Alasan perusahaan tidak menggunakan cek untuk pengeluaran kecil",
          "Dokumen pendukung pembentukan kas kecil"
        ]
      }
    ],

    // BANK SOAL KUIS INTERAKTIF LENGKAP DENGAN 5 TIPE SOAL
    quizzes: [
      {
        id: "q-1",
        type: "mc", // Multiple Choice
        chapterId: 1,
        title: "Karakteristik Kas Kecil",
        question: "Berikut ini yang BUKAN merupakan karakteristik dari dana kas kecil (petty cash) adalah...",
        options: [
          "Disediakan untuk pengeluaran yang jumlahnya relatif kecil dan rutin",
          "Disimpan di brankas kas kecil khusus dan dipegang oleh petty cashier",
          "Digunakan untuk membiayai pembelian aktiva tetap bernilai tinggi seperti gedung dan mesin",
          "Jumlah saldonya dibatasi sesuai dengan plafon yang telah ditetapkan manajemen"
        ],
        answer: 2,
        explanation: "Pengeluaran bernilai besar seperti pembelian mesin atau gedung dibiayai menggunakan kas besar via cek/transfer bank, bukan melalui kas kecil."
      },
      {
        id: "q-2",
        type: "tf", // True or False
        chapterId: 3,
        title: "Pencatatan Metode Imprest",
        question: "Pada sistem dana tetap (Imprest Fund System), setiap terjadi pengeluaran kas kecil oleh kasir, kasir langsung mendebit akun beban dan mengkredit akun Kas Kecil di buku besar akuntansi.",
        options: [
          "BENAR (True)",
          "SALAH (False)"
        ],
        answer: 1, // Salah
        explanation: "Pernyataan SALAH. Pada sistem Imprest, saat terjadi pengeluaran tidak dibuat jurnal di buku besar. Kasir hanya mencatat mutasi di buku kas kecil intern. Jurnal beban baru dibuat saat dilakukan pengisian kembali."
      },
      {
        id: "q-3",
        type: "mc",
        chapterId: 2,
        title: "Pihak Pengelola Kas Kecil",
        question: "Pihak yang bertugas membuat Bukti Kas Keluar (BKK) dan memeriksa keabsahan bukti-bukti pengeluaran sebelum diajukan pengisian kembali adalah...",
        options: [
          "Bagian Utang / Akuntansi",
          "Petugas Keamanan (Satpam)",
          "Departemen Pemasaran",
          "Nasabah Bank Eksternal"
        ],
        answer: 0,
        explanation: "Bagian Utang/Akuntansi bertugas memverifikasi keabsahan dokumen pengeluaran dan membuat Bukti Kas Keluar (BKK) untuk otorisasi pencairan cek."
      },
      {
        id: "q-4",
        type: "match", // Matching Accounting Terms
        chapterId: 3,
        title: "Mencocokkan Istilah Akuntansi Kas Kecil",
        instruction: "Pasangkan istilah akuntansi di sisi kiri dengan definisi yang tepat di sisi kanan:",
        pairs: [
          { id: "m1", term: "Imprest Fund System", def: "Metode dana tetap di mana saldo akun kas kecil di buku besar tidak berubah" },
          { id: "m2", term: "Fluctuating Fund System", def: "Metode dana berubah-ubah di mana setiap pengeluaran langsung dijurnal" },
          { id: "m3", term: "Cash Shortage", def: "Fisik uang tunai di brankas lebih sedikit dibandingkan catatan pembukuan" },
          { id: "m4", term: "Cash Overage", def: "Fisik uang tunai di brankas lebih banyak dibandingkan catatan pembukuan" }
        ]
      },
      {
        id: "q-5",
        type: "case", // Case Study
        chapterId: 4,
        title: "Studi Kasus Penjurnalan Pembentukan Kas Kecil",
        question: "Pada tanggal 1 September 2024, PT Harapan Bangsa membentuk dana kas kecil sebesar Rp 4.000.000,- dengan menerbitkan Cek No. 5512. Bagaimanakah jurnal umum yang dicatat oleh bagian akuntansi?",
        options: [
          "Kas di Bank (D) Rp 4.000.000 ; Kas Kecil (K) Rp 4.000.000",
          "Kas Kecil (D) Rp 4.000.000 ; Kas di Bank (K) Rp 4.000.000",
          "Beban Kas Kecil (D) Rp 4.000.000 ; Modal (K) Rp 4.000.000",
          "Kas Kecil (D) Rp 4.000.000 ; Beban Rupa-rupa (K) Rp 4.000.000"
        ],
        answer: 1,
        explanation: "Saat pembentukan dana kas kecil, akun Kas Kecil (aset) bertambah di sisi Debet, dan akun Kas di Bank (aset) berkurang di sisi Kredit sebesar Rp 4.000.000,-."
      },
      {
        id: "q-6",
        type: "mc",
        chapterId: 4,
        title: "Jurnal Selisih Kas Kurang",
        question: "Jika pada saat pemeriksaan kas ditemukan selisih kas kurang (cash short) sebesar Rp 25.000,- saat pengisian kembali kas kecil sistem imprest, maka posisi akun Selisih Kas dicatat di sisi...",
        options: [
          "Debet sebagai beban / kerugian",
          "Kredit sebagai pendapatan",
          "Tidak dicatat sama sekali",
          "Ekuitas pemilik di sisi Kredit"
        ],
        answer: 0,
        explanation: "Selisih kas kurang diakui sebagai kerugian/beban operasional lain-lain, sehingga dicatat di sisi DEBET."
      },
      {
        id: "q-7",
        type: "calc", // Accounting Calculation & Journal Entry
        chapterId: 4,
        title: "Perhitungan Pengisian Kembali Imprest",
        question: "Dana kas kecil ditetapkan plafon sebesar Rp 5.000.000,-. Pengeluaran selama bulan berjalan adalah: Beban Listrik Rp 450.000, Beban ATK Rp 600.000, Beban Kebersihan Rp 150.000. Berapakah jumlah nominal cek yang harus ditarik untuk pengisian kembali?",
        options: [
          "Rp 5.000.000,-",
          "Rp 1.200.000,-",
          "Rp 3.800.000,-",
          "Rp 6.200.000,-"
        ],
        answer: 1,
        explanation: "Pada sistem imprest, jumlah pengisian kembali selalu sama dengan total pengeluaran beban: Rp 450.000 + Rp 600.000 + Rp 150.000 = Rp 1.200.000,-."
      },
      {
        id: "q-8",
        type: "tf",
        chapterId: 2,
        title: "Bukti Transaksi Eksternal",
        question: "Setiap pengeluaran kas kecil wajib disertai bukti transaksi fisik seperti nota kontan, struk, atau kuitansi untuk menjamin asas akuntabilitas.",
        options: [
          "BENAR (True)",
          "SALAH (False)"
        ],
        answer: 0,
        explanation: "BENAR. Bukti fisik eksternal adalah dokumen sah pendukung pengeluaran kas kecil untuk mencegah fraud dan audit trail."
      }
    ],

    // FITUR SIMULASI LATIHAN JURNAL AKUNTANSI (INTERACTIVE LEDGER EXERCISES)
    journalExercises: [
      {
        id: "ex-1",
        title: "Latihan 1: Pembentukan Dana Kas Kecil",
        date: "02 Januari 2025",
        description: "PT Cahaya Gemilang menerbitkan cek No. CK-001 sebesar Rp 3.500.000,- untuk membentuk dana kas kecil dengan sistem dana tetap.",
        correctDebitAccount: "Kas Kecil",
        correctDebitAmount: 3500000,
        correctCreditAccount: "Kas di Bank",
        correctCreditAmount: 3500000,
        explanation: "Pembentukan kas kecil menambah aset Kas Kecil di sisi Debet dan mengurangi saldo Kas di Bank di sisi Kredit sejumlah Rp 3.500.000,-."
      },
      {
        id: "ex-2",
        title: "Latihan 2: Pengeluaran Beban ATK (Metode Fluktuasi)",
        date: "10 Januari 2025",
        description: "Dibeli perlengkapan alat tulis kantor (kertas, pulpen, map) sebesar Rp 275.000,- tunai menggunakan kas kecil dengan metode fluktuasi.",
        correctDebitAccount: "Beban Perlengkapan Kantor",
        correctDebitAmount: 275000,
        correctCreditAccount: "Kas Kecil",
        correctCreditAmount: 275000,
        explanation: "Pada metode fluktuasi, setiap pengeluaran langsung dicatat mendebit Beban Perlengkapan Kantor dan mengkredit Kas Kecil sebesar Rp 275.000,-."
      },
      {
        id: "ex-3",
        title: "Latihan 3: Pengisian Kembali Kas Kecil (Metode Imprest)",
        date: "31 Januari 2025",
        description: "Kasir mengajukan pengisian kembali untuk Beban Konsumsi Tamu Rp 400.000,-. Bagian Kasa menerbitkan cek tunai bank sesuai sistem dana tetap.",
        correctDebitAccount: "Beban Konsumsi",
        correctDebitAmount: 400000,
        correctCreditAccount: "Kas di Bank",
        correctCreditAmount: 400000,
        explanation: "Pada sistem Imprest saat pengisian kembali, akun beban dijurnal di sisi Debet dan akun Kas di Bank dikredit sejumlah pengeluaran tersebut."
      },
      {
        id: "ex-4",
        title: "Latihan 4: Pengisian Kembali dengan Selisih Kas Kurang",
        date: "15 Februari 2025",
        description: "Pengisian kembali Beban Transportasi Kurir Rp 200.000,-, namun saat cash opname fisik uang kurang Rp 20.000,- sehingga total cek ditarik Rp 220.000,-.",
        correctDebitAccount: "Beban Transportasi & Selisih Kas",
        correctDebitAmount: 220000,
        correctCreditAccount: "Kas di Bank",
        correctCreditAmount: 220000,
        explanation: "Beban Transportasi (D) Rp 200.000 + Selisih Kas (D) Rp 20.000, dan Kas di Bank (K) Rp 220.000."
      }
    ],

    // FITUR TUGAS DAN EVALUASI GURU & SISWA
    tasks: [
      {
        id: "task-1",
        title: "Tugas 1: Siklus Jurnal Kas Kecil PT Berkah Abadi",
        deadline: "2024-11-20 23:59",
        chapterRef: "Bab 3 & Bab 4",
        description: `
          Analisis 6 transaksi pengeluaran kas kecil PT Berkah Abadi selama bulan Oktober 2024. 
          Susunlah perbandingan tabel jurnal umum menggunakan dua metode berdampingan:
          1. Metode Dana Tetap (Imprest Fund System)
          2. Metode Dana Berubah-Ubah (Fluctuating Fund System)
          Pastikan format tabel debet dan kredit seimbang serta cantumkan tanggal dan penjelasan singkat.
        `,
        status: "open",
        submissions: [
          {
            studentId: "S-101",
            studentName: "Rian Pratama",
            submittedAt: "2024-11-05 14:30",
            content: "Berikut laporan perbandingan jurnal kas kecil PT Berkah Abadi: Pada metode imprest transaksi tgl 5, 12, 19 tidak dijurnal langsung, melainkan saat tgl 31 pengisian kembali didebet akun Beban Konsumsi Rp 300rb, Beban ATK Rp 200rb, Beban Ongkir Rp 100rb, kredit Kas di Bank Rp 600rb. Sedangkan fluktuasi langsung dikredit Kas Kecil.",
            fileAttachment: "Tugas1_Rian_Pratama_XIIAKL1.pdf",
            score: 95,
            feedback: "Analisis penjurnalan sangat tepat, rapi, dan pemahaman konsep Imprest sudah matang. Pertahankan prestasimu!",
            gradedBy: "Dra. Hj. Nurjanah, M.Pd.",
            gradedAt: "2024-11-06 09:15"
          },
          {
            studentId: "S-102",
            studentName: "Siti Aisyah",
            submittedAt: "2024-11-04 18:20",
            content: "Tugas analisis siklus kas kecil PT Berkah Abadi telah selesai dikerjakan sesuai standar akuntansi SMK. Jurnal imprest dan fluktuasi sudah disertakan lengkap dengan perhitungan saldo akhir buku besar.",
            fileAttachment: "SitiAisyah_KasKecil_Tugas1.xlsx",
            score: 98,
            feedback: "Sangat sempurna! Tabel komparasi dan buku kas pembantu disajikan sangat profesional.",
            gradedBy: "Dra. Hj. Nurjanah, M.Pd.",
            gradedAt: "2024-11-05 10:00"
          }
        ]
      },
      {
        id: "task-2",
        title: "Tugas 2: Analisis Audit Fisik & Penyesuaian Selisih Kas",
        deadline: "2024-11-28 23:59",
        chapterRef: "Bab 4 & Bab 5",
        description: `
          Berdasarkan kasus cash opname di mana saldo fisik uang brankas lebih sedikit Rp 75.000,- dibanding saldo buku kas:
          1. Jelaskan faktor-faktor penyebab terjadinya selisih kas tersebut!
          2. Buatlah jurnal penyesuaian yang diperlukan!
          3. Berikan saran rekomendasi pengendalian intern kas kecil agar selisih tidak terulang.
        `,
        status: "open",
        submissions: []
      }
    ],

    // PENGUMUMAN DAN KOMUNIKASI GURU - SISWA
    announcements: [
      {
        id: "ann-1",
        author: "Dra. Hj. Nurjanah, M.Pd.",
        role: "Guru Akuntansi",
        date: "05 November 2024, 08:30 WIB",
        tag: "Penting",
        tagColor: "rose",
        title: "Jadwal Evaluasi Tengah Semester & Pengumpulan Tugas 1",
        content: "Selamat pagi anak-anak kelas XII AKL 1. Jangan lupa mempelajari Bab 3 dan 4 mengenai perbandingan metode Imprest vs Fluktuasi dan jurnal selisih kas. Batas akhir pengumpulan Tugas 1 adalah tanggal 20 November 2024. Silakan gunakan fitur Simulasi Jurnal untuk berlatih mandiri!"
      },
      {
        id: "ann-2",
        author: "Dra. Hj. Nurjanah, M.Pd.",
        role: "Guru Akuntansi",
        date: "01 November 2024, 13:00 WIB",
        tag: "Materi Baru",
        tagColor: "blue",
        title: "Modul & Video Bab 4 Sudah Tersedia Lengkap",
        content: "Video pembelajaran Bab 4 mengenai Praktik Penjurnalan dan Selisih Kas sudah dapat diakses. Silakan tonton hingga selesai dan klik tombol 'Tandai Selesai' agar progres belajar kalian tercatat di sistem."
      }
    ],

    // FORUM TANYA JAWAB (DISCUSSIONS)
    discussions: [
      {
        id: "disc-1",
        studentName: "Rian Pratama",
        studentAvatar: makeAvatar("RP", "#2563EB"),
        date: "06 Nov 2024, 10:15 WIB",
        topic: "Bab 3: Saldo Kas Kecil Imprest",
        question: "Ibu guru, jika pada metode dana tetap (Imprest) ada pengeluaran di tanggal 25 namun hingga tanggal 31 belum sempat dilakukan pengisian kembali karena bank tutup, bagaimana pencatatannya pada saat tutup buku?",
        replies: [
          {
            author: "Dra. Hj. Nurjanah, M.Pd.",
            role: "Guru",
            avatar: makeAvatar("NJ", "#7C3AED"),
            date: "06 Nov 2024, 11:00 WIB",
            text: "Pertanyaan yang sangat bagus, Rian! Pada akhir periode akuntansi, bila ada pengeluaran kas kecil yang belum diisi kembali, wajib dibuat JURNAL PENYESUAIAN (adjusting entry): mendebit akun Beban-Beban dan mengkredit akun Kas Kecil, agar laporan laba rugi dan neraca per 31 Desember mencerminkan beban dan kas riil."
          }
        ]
      },
      {
        id: "disc-2",
        studentName: "Ahmad Fauzi",
        studentAvatar: makeAvatar("AF", "#D97706"),
        date: "04 Nov 2024, 15:40 WIB",
        topic: "Bab 1: Batas Maksimal Kas Kecil",
        question: "Apakah ada ketentuan standar nominal dari pemerintah mengenai besaran dana kas kecil perusahaan?",
        replies: [
          {
            author: "Dra. Hj. Nurjanah, M.Pd.",
            role: "Guru",
            avatar: makeAvatar("NJ", "#7C3AED"),
            date: "04 Nov 2024, 16:20 WIB",
            text: "Tidak ada ketentuan baku nominal dari undang-undang pemerintah, Ahmad. Besaran plafon kas kecil sepenuhnya menjadi kebijakan manajemen internal masing-masing perusahaan (disesuaikan dengan skala bisnis dan rata-rata pengeluaran rutin operasionalnya)."
          }
        ]
      }
    ]
  };

  // Expose to window
  window.PettyCashData = INITIAL_DATA;
})();