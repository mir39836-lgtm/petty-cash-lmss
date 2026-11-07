// PETTY CASH LEARNING - UI Components Renderer
(function () {
  const Components = {};

  // Utility format rupiah
  function formatRp(num) {
    return 'Rp ' + Number(num).toLocaleString('id-ID');
  }

  // Header / Navbar
  Components.renderNavbar = function (state) {
    const isGuru = state.currentUser.role === 'guru';
    const activeStudent = state.activeStudent;
    const currentName = isGuru ? state.currentUser.name : activeStudent.name;
    const currentRoleLabel = isGuru ? 'Guru Pengampu' : 'Siswa';
    const currentAvatar = isGuru ? state.currentUser.avatar : activeStudent.avatar;
    const isMuted = window.SoundFX ? window.SoundFX.isMuted() : false;

    return `
      <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 sm:h-20">
            <!-- Brand Logo -->
            <div class="flex items-center gap-3 cursor-pointer" onclick="PettyCashApp.navigate('landing')">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 transform hover:scale-105 transition-transform">
                <i class="fa-solid fa-calculator text-xl"></i>
              </div>
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-purple-600 block">LMS AKUNTANSI</span>
                <span class="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 bg-clip-text text-transparent">PETTY CASH LEARNING</span>
              </div>
            </div>

            <!-- Navigation Links (Desktop) -->
            <nav class="hidden xl:flex items-center gap-1 text-sm font-semibold text-slate-600">
              <button onclick="PettyCashApp.navigate('landing')" class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition ${state.currentPage === 'landing' ? 'text-blue-700 font-bold bg-blue-50' : ''}">
                <i class="fa-solid fa-house mr-1.5 text-slate-400"></i>Beranda
              </button>
              <button onclick="PettyCashApp.navigate('dashboard')" class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition ${state.currentPage === 'dashboard' ? 'text-blue-700 font-bold bg-blue-50' : ''}">
                <i class="fa-solid fa-gauge-high mr-1.5 text-slate-400"></i>Dashboard
              </button>
              <button onclick="PettyCashApp.navigate('materials')" class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition ${state.currentPage === 'materials' ? 'text-blue-700 font-bold bg-blue-50' : ''}">
                <i class="fa-solid fa-book-open mr-1.5 text-slate-400"></i>Materi (Bab 1-5)
              </button>
              <button onclick="PettyCashApp.navigate('videos')" class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition ${state.currentPage === 'videos' ? 'text-blue-700 font-bold bg-blue-50' : ''}">
                <i class="fa-solid fa-circle-play mr-1.5 text-slate-400"></i>Video
              </button>
              <button onclick="PettyCashApp.navigate('quiz')" class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition ${state.currentPage === 'quiz' ? 'text-blue-700 font-bold bg-blue-50' : ''}">
                <i class="fa-solid fa-clipboard-question mr-1.5 text-slate-400"></i>Kuis
              </button>
              <button onclick="PettyCashApp.navigate('journal')" class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition ${state.currentPage === 'journal' ? 'text-blue-700 font-bold bg-blue-50' : ''}">
                <i class="fa-solid fa-book-journal-whills mr-1.5 text-slate-400"></i>Latihan Jurnal
              </button>
              <button onclick="PettyCashApp.navigate('tasks')" class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition ${state.currentPage === 'tasks' ? 'text-blue-700 font-bold bg-blue-50' : ''}">
                <i class="fa-solid fa-list-check mr-1.5 text-slate-400"></i>Tugas
              </button>
              <button onclick="PettyCashApp.navigate('progress')" class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition ${state.currentPage === 'progress' ? 'text-blue-700 font-bold bg-blue-50' : ''}">
                <i class="fa-solid fa-chart-line mr-1.5 text-slate-400"></i>Progres
              </button>
              <button onclick="PettyCashApp.navigate('communication')" class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition ${state.currentPage === 'communication' ? 'text-blue-700 font-bold bg-blue-50' : ''}">
                <i class="fa-solid fa-comments mr-1.5 text-slate-400"></i>Diskusi
              </button>
            </nav>

            <!-- Actions / Switch Role / Profile -->
            <div class="flex items-center gap-2 sm:gap-3">
              <!-- Audio FX Toggle -->
              <button onclick="PettyCashApp.toggleSound()" title="Efek Suara Belajar" class="w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm transition">
                <i class="fa-solid ${isMuted ? 'fa-volume-xmark text-rose-500' : 'fa-volume-high text-blue-600'}"></i>
              </button>

              <!-- Quick Role Switcher Pill -->
              <div class="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button onclick="PettyCashApp.switchRole('siswa')" class="px-3 py-1 text-xs font-bold rounded-lg transition ${!isGuru ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}">
                  <i class="fa-solid fa-user-graduate mr-1"></i>Siswa
                </button>
                <button onclick="PettyCashApp.switchRole('guru')" class="px-3 py-1 text-xs font-bold rounded-lg transition ${isGuru ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}">
                  <i class="fa-solid fa-chalkboard-user mr-1"></i>Guru
                </button>
              </div>

              <!-- User Profile Dropdown/Trigger -->
              <div class="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer" onclick="PettyCashApp.openProfileModal()">
                <img src="${currentAvatar}" alt="${currentName}" class="w-9 h-9 rounded-full object-cover ring-2 ${isGuru ? 'ring-purple-500' : 'ring-blue-500'}">
                <div class="hidden md:block text-left">
                  <p class="text-xs font-bold text-slate-800 leading-tight">${currentName.split(' ')[0]}</p>
                  <span class="inline-block px-1.5 py-0.2 text-[10px] font-bold rounded ${isGuru ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">${currentRoleLabel}</span>
                </div>
              </div>

              <!-- Mobile Menu Toggle Button -->
              <button onclick="PettyCashApp.toggleMobileMenu()" class="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 text-lg">
                <i class="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Drawer Navigation -->
        <div id="mobile-drawer" class="hidden xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <div class="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="${currentAvatar}" alt="${currentName}" class="w-10 h-10 rounded-full object-cover">
              <div>
                <p class="text-xs font-bold text-slate-800">${currentName}</p>
                <p class="text-[11px] text-slate-500">${currentRoleLabel} • ${isGuru ? 'Akses Pengelolaan' : activeStudent.kelas}</p>
              </div>
            </div>
            <button onclick="PettyCashApp.switchRole(PettyCashApp.state.currentUser.role === 'guru' ? 'siswa' : 'guru')" class="text-xs font-bold text-blue-700 underline">
              Ganti ke ${isGuru ? 'Siswa' : 'Guru'}
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button onclick="PettyCashApp.navigate('landing')" class="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 flex items-center gap-2">
              <i class="fa-solid fa-house text-blue-600"></i> Beranda
            </button>
            <button onclick="PettyCashApp.navigate('dashboard')" class="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 flex items-center gap-2">
              <i class="fa-solid fa-gauge-high text-blue-600"></i> Dashboard
            </button>
            <button onclick="PettyCashApp.navigate('materials')" class="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 flex items-center gap-2">
              <i class="fa-solid fa-book-open text-purple-600"></i> Materi Bab 1-5
            </button>
            <button onclick="PettyCashApp.navigate('videos')" class="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 flex items-center gap-2">
              <i class="fa-solid fa-circle-play text-red-500"></i> Video Pembelajaran
            </button>
            <button onclick="PettyCashApp.navigate('quiz')" class="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 flex items-center gap-2">
              <i class="fa-solid fa-clipboard-question text-amber-500"></i> Kuis Interaktif
            </button>
            <button onclick="PettyCashApp.navigate('journal')" class="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 flex items-center gap-2">
              <i class="fa-solid fa-book-journal-whills text-emerald-600"></i> Latihan Jurnal
            </button>
            <button onclick="PettyCashApp.navigate('tasks')" class="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 flex items-center gap-2">
              <i class="fa-solid fa-list-check text-indigo-600"></i> Tugas & Penilaian
            </button>
            <button onclick="PettyCashApp.navigate('progress')" class="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 flex items-center gap-2">
              <i class="fa-solid fa-chart-line text-cyan-600"></i> Progres Belajar
            </button>
            <button onclick="PettyCashApp.navigate('communication')" class="p-2.5 rounded-lg text-left bg-slate-50 hover:bg-blue-50 flex items-center gap-2 col-span-2">
              <i class="fa-solid fa-comments text-violet-600"></i> Pengumuman & Forum Diskusi
            </button>
          </div>
        </div>
      </header>
    `;
  };

  // Footer Component
  Components.renderFooter = function () {
    return `
      <footer class="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div class="md:col-span-2 space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  <i class="fa-solid fa-calculator text-lg"></i>
                </div>
                <span class="text-xl font-black text-white tracking-wide">PETTY CASH LEARNING</span>
              </div>
              <p class="text-sm text-slate-400 max-w-md leading-relaxed">
                Platform Media Pembelajaran Interaktif Akuntansi Keuangan Lembaga. Dirancang khusus untuk mempermudah pemahaman konsep, pengelolaan, dan teknik pencatatan kas kecil bagi pendidik dan peserta didik secara menyenangkan.
              </p>
              <div class="flex items-center gap-3 pt-2 text-xs text-slate-400">
                <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-blue-400 font-semibold border border-slate-700">Imprest Fund System</span>
                <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-purple-400 font-semibold border border-slate-700">Fluctuating Fund System</span>
                <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-amber-400 font-semibold border border-slate-700">Cash Opname</span>
              </div>
            </div>

            <div>
              <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-3">Fitur Utama</h4>
              <ul class="space-y-2 text-xs text-slate-400">
                <li><a href="javascript:void(0)" onclick="PettyCashApp.navigate('materials')" class="hover:text-white transition">5 Bab Modul Interaktif</a></li>
                <li><a href="javascript:void(0)" onclick="PettyCashApp.navigate('videos')" class="hover:text-white transition">Video Penjelasan Konsep</a></li>
                <li><a href="javascript:void(0)" onclick="PettyCashApp.navigate('quiz')" class="hover:text-white transition">Kuis Interaktif 5 Tipe Soal</a></li>
                <li><a href="javascript:void(0)" onclick="PettyCashApp.navigate('journal')" class="hover:text-white transition">Simulator Jurnal Akuntansi</a></li>
                <li><a href="javascript:void(0)" onclick="PettyCashApp.navigate('tasks')" class="hover:text-white transition">Manajemen Tugas & Feedback</a></li>
              </ul>
            </div>

            <div>
              <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-3">Pusat Bantuan</h4>
              <ul class="space-y-2 text-xs text-slate-400">
                <li><a href="javascript:void(0)" onclick="PettyCashApp.openGuideModal()" class="hover:text-white transition"><i class="fa-regular fa-circle-question mr-1.5 text-blue-400"></i>Panduan Penggunaan LMS</a></li>
                <li><a href="javascript:void(0)" onclick="PettyCashApp.resetDemoData()" class="hover:text-amber-400 transition"><i class="fa-solid fa-rotate-left mr-1.5 text-amber-400"></i>Reset Data Percobaan</a></li>
                <li class="pt-2 text-[11px] text-slate-500 leading-tight">
                  Sesuai Standar Akuntansi Keuangan (SAK) & Kurikulum Merdeka AKL.
                </li>
              </ul>
            </div>
          </div>

          <div class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2024-2025 PETTY CASH LEARNING. Media Pembelajaran Digital Akuntansi.</p>
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5 text-emerald-400"><i class="fa-solid fa-circle text-[8px]"></i> Sistem Aktif & Interaktif</span>
              <span>Versi 2.5 LMS Akuntansi</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  };

  // Section B: Landing Page
  Components.renderLanding = function (state) {
    return `
      <div class="space-y-16">
        <!-- Hero Section -->
        <section class="relative overflow-hidden pt-10 pb-16 gradient-hero">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <!-- Left Text Content -->
              <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 font-bold text-xs tracking-wide shadow-sm">
                  <span class="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <i class="fa-solid fa-sparkles text-amber-500"></i> MEDIA BELAJAR DIGITAL AKUNTANSI TERBAIK
                </div>

                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                  Belajar <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Kas Kecil</span> Jadi Lebih Mudah dan Menyenangkan!
                </h1>

                <p class="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Selamat datang di <strong>PETTY CASH LEARNING</strong> — sarana edukasi modern interaktif untuk menguasai pengelolaan dana kas kecil, sistem dana tetap <em>(imprest)</em>, sistem dana berfluktuasi, hingga teknik penjurnalan dan audit kas opname.
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <button onclick="PettyCashApp.navigate('materials')" class="btn-bounce px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center gap-2">
                    <i class="fa-solid fa-rocket"></i> Mulai Belajar Sekarang
                  </button>
                  <button onclick="PettyCashApp.openLoginModal()" class="btn-bounce px-6 py-3.5 rounded-2xl bg-white text-slate-800 font-bold text-sm border-2 border-slate-200 hover:border-purple-300 shadow-sm flex items-center gap-2">
                    <i class="fa-solid fa-right-to-bracket text-purple-600"></i> Masuk / Ganti Akun
                  </button>
                  <button onclick="PettyCashApp.navigate('journal')" class="btn-bounce px-5 py-3.5 rounded-2xl bg-amber-50 text-amber-800 font-bold text-sm border border-amber-200 hover:bg-amber-100 transition flex items-center gap-2">
                    <i class="fa-solid fa-calculator text-amber-600"></i> Coba Simulasi Jurnal
                  </button>
                </div>

                <!-- Stats Badges -->
                <div class="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-center">
                  <div class="p-3 bg-white/70 backdrop-blur rounded-xl border border-slate-200">
                    <p class="text-xl sm:text-2xl font-black text-blue-600">5 BAB</p>
                    <p class="text-[11px] font-bold text-slate-500">Materi Lengkap</p>
                  </div>
                  <div class="p-3 bg-white/70 backdrop-blur rounded-xl border border-slate-200">
                    <p class="text-xl sm:text-2xl font-black text-purple-600">5 Tipe</p>
                    <p class="text-[11px] font-bold text-slate-500">Kuis & Game</p>
                  </div>
                  <div class="p-3 bg-white/70 backdrop-blur rounded-xl border border-slate-200">
                    <p class="text-xl sm:text-2xl font-black text-amber-500">100%</p>
                    <p class="text-[11px] font-bold text-slate-500">Interaktif & Fun</p>
                  </div>
                </div>
              </div>

              <!-- Right Visual Illustration (Accounting Canvas) -->
              <div class="lg:col-span-5 relative">
                <div class="relative mx-auto max-w-md p-6 bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-amber-500/10 rounded-3xl border border-slate-200 shadow-xl float-animation">
                  
                  <!-- Main Interactive Preview Card -->
                  <div class="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2.5">
                        <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                          <i class="fa-solid fa-coins"></i>
                        </div>
                        <div>
                          <p class="text-xs font-bold text-slate-500">KAS KECIL BULAN BERJALAN</p>
                          <p class="text-lg font-black text-slate-800">Rp 5.000.000,-</p>
                        </div>
                      </div>
                      <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold flex items-center gap-1">
                        <i class="fa-solid fa-shield-check"></i> Imprest
                      </span>
                    </div>

                    <!-- Mini Ledger Preview -->
                    <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-[11px] space-y-1.5 text-slate-700">
                      <div class="flex justify-between border-b border-slate-200 pb-1 font-bold text-slate-900">
                        <span>Transaksi</span>
                        <span>D / K</span>
                      </div>
                      <div class="flex justify-between text-blue-700 font-semibold">
                        <span>[D] Kas Kecil (Pembentukan)</span>
                        <span>Rp 5.000.000</span>
                      </div>
                      <div class="flex justify-between text-slate-600">
                        <span class="pl-3">[K] Kas di Bank</span>
                        <span>Rp 5.000.000</span>
                      </div>
                      <div class="flex justify-between text-purple-700 font-semibold pt-1 border-t border-dashed border-slate-200">
                        <span>[D] Beban Konsumsi Rapat</span>
                        <span>Rp 350.000</span>
                      </div>
                      <div class="flex justify-between text-emerald-700 font-semibold">
                        <span>[D] Beban Perlengkapan ATK</span>
                        <span>Rp 250.000</span>
                      </div>
                    </div>

                    <!-- Interactive Badges Floating -->
                    <div class="flex items-center justify-between pt-1">
                      <span class="text-xs font-bold text-slate-500">Status Cash Box:</span>
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
                        <i class="fa-solid fa-circle-check text-blue-500"></i> Seimbang (Balanced)
                      </span>
                    </div>
                  </div>

                  <!-- Floating decorative stickers -->
                  <div class="absolute -top-4 -right-4 bg-amber-400 text-amber-950 px-3.5 py-2 rounded-2xl shadow-md font-bold text-xs flex items-center gap-1.5 transform rotate-3">
                    <i class="fa-solid fa-stamp"></i> SAK AKUN KAS
                  </div>
                  <div class="absolute -bottom-4 -left-4 bg-purple-600 text-white px-3.5 py-2 rounded-2xl shadow-md font-bold text-xs flex items-center gap-1.5 transform -rotate-3">
                    <i class="fa-solid fa-circle-check"></i> Cek Fisik Kasir
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- Feature Showcase Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-bold text-xs tracking-wider uppercase">Fitur Unggulan</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Segala yang Anda Butuhkan untuk Menguasai Kas Kecil</h2>
            <p class="text-sm text-slate-600">Dikembangkan khusus untuk mendukung kegiatan belajar mengajar antara guru dan siswa dengan interaktivitas tinggi.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Feature 1 -->
            <div class="p-6 bg-white rounded-2xl border border-slate-200 card-hover-effect space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-book-bookmark"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-800">5 Bab Materi Terstruktur</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Mulai dari definisi, prosedur dokumen pengeluaran, perbandingan metode imprest & fluktuasi, hingga teknik penjurnalan selisih kas.
              </p>
              <button onclick="PettyCashApp.navigate('materials')" class="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-1">
                Jelajahi Materi <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <!-- Feature 2 -->
            <div class="p-6 bg-white rounded-2xl border border-slate-200 card-hover-effect space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-clapperboard"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-800">Video Animasi Pembelajaran</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Penjelasan visual menarik untuk membedah alur transaksi, bukti kuitansi, dan simulasi jurnal dengan indikator progres menonton.
              </p>
              <button onclick="PettyCashApp.navigate('videos')" class="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 pt-1">
                Tonton Video <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <!-- Feature 3 -->
            <div class="p-6 bg-white rounded-2xl border border-slate-200 card-hover-effect space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-gamepad"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-800">Kuis Interaktif 5 Tipe Soal</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Pilihan ganda, Benar/Salah, mencocokkan istilah akuntansi, studi kasus, dan hitung jurnal dengan skor seketika & pembahasan lengkap.
              </p>
              <button onclick="PettyCashApp.navigate('quiz')" class="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 pt-1">
                Mulai Kuis <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <!-- Feature 4 -->
            <div class="p-6 bg-white rounded-2xl border border-slate-200 card-hover-effect space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-receipt"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-800">Simulasi Jurnal Real-Time</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Praktik mencatat transaksi debet & kredit secara mandiri dengan sistem validasi keseimbangan dan pembetulan otomatis.
              </p>
              <button onclick="PettyCashApp.navigate('journal')" class="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 pt-1">
                Buka Simulator <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <!-- Feature 5 -->
            <div class="p-6 bg-white rounded-2xl border border-slate-200 card-hover-effect space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-user-check"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-800">Dashboard Siswa & Guru</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Guru dapat mengelola tugas, materi, dan mengevaluasi siswa. Siswa dapat memantau progres belajar dan nilai rapor mereka.
              </p>
              <button onclick="PettyCashApp.navigate('dashboard')" class="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 pt-1">
                Buka Dashboard <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <!-- Feature 6 -->
            <div class="p-6 bg-white rounded-2xl border border-slate-200 card-hover-effect space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-comments"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-800">Komunikasi & Tanya Jawab</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Papan pengumuman guru terpadu dan forum diskusi aktif untuk membahas kesulitan materi secara langsung.
              </p>
              <button onclick="PettyCashApp.navigate('communication')" class="text-xs font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1 pt-1">
                Masuk ke Forum <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>

        <!-- Chapter Overview Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div class="relative z-10 max-w-3xl space-y-4">
              <span class="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider">Kurikulum Lengkap</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold">Kurikulum Materi Kas Kecil Standar Industri</h2>
              <p class="text-sm text-blue-100 leading-relaxed">
                Disusun bertahap dari pemahaman mendasar hingga penyelesaian studi kasus audit nyata di perusahaan dagang dan jasa.
              </p>

              <!-- Chapter Cards Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                ${state.chapters.map(c => `
                  <div onclick="PettyCashApp.openChapter(${c.id})" class="p-3.5 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl border border-white/20 cursor-pointer transition flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white text-blue-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      ${c.id}
                    </div>
                    <div>
                      <h4 class="font-bold text-sm text-white">${c.title}</h4>
                      <p class="text-[11px] text-blue-200 line-clamp-1">${c.subtitle}</p>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="pt-4">
                <button onclick="PettyCashApp.navigate('materials')" class="btn-bounce px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm rounded-xl shadow-md flex items-center gap-2">
                  <i class="fa-solid fa-book-open"></i> Buka Seluruh Materi Sekarang
                </button>
              </div>
            </div>
            
            <i class="fa-solid fa-vault absolute -right-10 -bottom-10 text-[200px] text-white/5 pointer-events-none"></i>
          </div>
        </section>

        <!-- Role Quick Switch Bar -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl">
                <i class="fa-solid fa-users-gear"></i>
              </div>
              <div>
                <h4 class="text-base font-bold text-slate-800">Eksplorasi Hak Akses Guru & Siswa</h4>
                <p class="text-xs text-slate-500">Anda dapat berpindah peran kapan saja untuk menguji alur kerja guru (menilai tugas, buat materi) atau alur siswa (belajar & kuis).</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button onclick="PettyCashApp.switchRole('siswa')" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2">
                <i class="fa-solid fa-user-graduate"></i> Masuk Siswa (Rian)
              </button>
              <button onclick="PettyCashApp.switchRole('guru')" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2">
                <i class="fa-solid fa-chalkboard-user"></i> Masuk Guru (Bu Nurjanah)
              </button>
            </div>
          </div>
        </section>
      </div>
    `;
  };

  // Section D: Dashboard (Role-based)
  Components.renderDashboard = function (state) {
    if (state.currentUser.role === 'guru') {
      return Components.renderTeacherDashboard(state);
    } else {
      return Components.renderStudentDashboard(state);
    }
  };

  // Student Dashboard
  Components.renderStudentDashboard = function (state) {
    const s = state.activeStudent;
    const totalChapters = state.chapters.length;
    const completedCh = s.completedChapters ? s.completedChapters.length : 0;
    const progressVal = Math.round((completedCh / totalChapters) * 100);

    return `
      <div class="space-y-8">
        <!-- Welcome Card -->
        <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex items-center gap-4">
              <img src="${s.avatar}" alt="${s.name}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-md">
              <div>
                <div class="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-blue-100 text-xs font-bold mb-1">
                  NIS: ${s.nis} • Kelas: ${s.kelas}
                </div>
                <h1 class="text-2xl sm:text-3xl font-black">Selamat Datang, ${s.name}! 👋</h1>
                <p class="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
                  Lanjutkan perjalanan belajarmu hari ini. Kamu sudah menuntaskan ${completedCh} dari ${totalChapters} bab materi kas kecil!
                </p>
              </div>
            </div>

            <!-- Action button -->
            <button onclick="PettyCashApp.navigate('materials')" class="btn-bounce px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm shadow-md flex items-center justify-center gap-2 flex-shrink-0">
              <i class="fa-solid fa-play"></i> Lanjutkan Belajar
            </button>
          </div>
          <i class="fa-solid fa-graduation-cap absolute -right-6 -bottom-6 text-9xl text-white/10 pointer-events-none"></i>
        </div>

        <!-- 4 Key Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Progres -->
          <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 card-hover-effect">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Progres Belajar</span>
              <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                <i class="fa-solid fa-chart-pie"></i>
              </div>
            </div>
            <p class="text-2xl font-black text-slate-800">${progressVal}%</p>
            <div class="w-full bg-slate-100 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="width: ${progressVal}%"></div>
            </div>
            <p class="text-[11px] text-slate-500">${completedCh} dari ${totalChapters} Bab Selesai</p>
          </div>

          <!-- Nilai Terakhir -->
          <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 card-hover-effect">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Nilai Kuis Terakhir</span>
              <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                <i class="fa-solid fa-award"></i>
              </div>
            </div>
            <p class="text-2xl font-black text-purple-600">${s.lastQuizScore} <span class="text-xs text-slate-400 font-normal">/ 100</span></p>
            <span class="inline-block px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold text-[11px]">Sangat Memuaskan</span>
            <p class="text-[11px] text-slate-500">Kuis Penjurnalan Kas Kecil</p>
          </div>

          <!-- Simulasi Jurnal -->
          <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 card-hover-effect">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Simulasi Jurnal</span>
              <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
                <i class="fa-solid fa-book-journal-whills"></i>
              </div>
            </div>
            <p class="text-2xl font-black text-emerald-600">${s.journalSimulations ? s.journalSimulations.length : 0} Selesai</p>
            <button onclick="PettyCashApp.navigate('journal')" class="text-xs font-bold text-emerald-600 hover:text-emerald-800">
              Latihan Jurnal Baru <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <!-- Lencana Capaian -->
          <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 card-hover-effect">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Lencana Siswa</span>
              <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">
                <i class="fa-solid fa-medal"></i>
              </div>
            </div>
            <p class="text-2xl font-black text-amber-600">${s.badges ? s.badges.length : 0} Lencana</p>
            <div class="flex flex-wrap gap-1">
              ${(s.badges || []).map(b => `<span class="px-1.5 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10px] rounded border border-amber-200">${b}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Two Column Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Left: Bab Pembelajaran Status -->
          <div class="lg:col-span-8 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold text-slate-800">Daftar Materi Pembelajaran</h3>
                <p class="text-xs text-slate-500">Pilih bab untuk membaca modul atau mengulang kembali.</p>
              </div>
              <button onclick="PettyCashApp.navigate('materials')" class="text-xs font-bold text-blue-600 hover:underline">
                Lihat Semua Bab
              </button>
            </div>

            <div class="space-y-3">
              ${state.chapters.map(ch => {
                const isCompleted = (s.completedChapters || []).includes(ch.id);
                return `
                  <div class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 transition-all flex items-center justify-between gap-4 shadow-sm">
                    <div class="flex items-center gap-3">
                      <div class="w-11 h-11 rounded-xl ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center text-lg font-bold flex-shrink-0">
                        <i class="fa-solid ${isCompleted ? 'fa-circle-check' : ch.icon}"></i>
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <h4 class="font-bold text-sm text-slate-800">${ch.title}</h4>
                          ${isCompleted ? '<span class="px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">SELESAI</span>' : '<span class="px-2 py-0.2 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">BELUM</span>'}
                        </div>
                        <p class="text-xs text-slate-500 mt-0.5">${ch.subtitle}</p>
                      </div>
                    </div>

                    <button onclick="PettyCashApp.openChapter(${ch.id})" class="px-4 py-2 rounded-xl text-xs font-bold ${isCompleted ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-blue-600 text-white hover:bg-blue-700'} flex-shrink-0">
                      ${isCompleted ? 'Review' : 'Buka Bab'}
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right: Pending Tasks & Announcements -->
          <div class="lg:col-span-4 space-y-6">
            <!-- Tugas Menunggu -->
            <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 class="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <i class="fa-solid fa-list-check text-indigo-600"></i> Tugas Kelas
                </h4>
                <button onclick="PettyCashApp.navigate('tasks')" class="text-[11px] font-bold text-indigo-600">Buka</button>
              </div>

              <div class="space-y-3">
                ${state.tasks.map(t => {
                  const submission = t.submissions.find(sub => sub.studentId === s.id);
                  const isGraded = submission && submission.score !== undefined;
                  const isSubmitted = !!submission;

                  return `
                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                      <div class="flex items-center justify-between">
                        <span class="text-[10px] font-bold text-slate-500">${t.chapterRef}</span>
                        ${isGraded ? `<span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-extrabold text-[10px] rounded">Nilai: ${submission.score}</span>` :
                          isSubmitted ? `<span class="px-2 py-0.5 bg-amber-100 text-amber-700 font-extrabold text-[10px] rounded">Menunggu Nilai</span>` :
                          `<span class="px-2 py-0.5 bg-rose-100 text-rose-700 font-extrabold text-[10px] rounded">Belum Dikerjakan</span>`
                        }
                      </div>
                      <h5 class="font-bold text-xs text-slate-800">${t.title}</h5>
                      <p class="text-[11px] text-slate-500"><i class="fa-regular fa-clock mr-1"></i>Batas: ${t.deadline}</p>
                      <button onclick="PettyCashApp.openTaskModal('${t.id}')" class="w-full mt-1 py-1.5 bg-white border border-slate-300 hover:border-indigo-400 rounded-lg text-xs font-bold text-slate-700 text-center">
                        ${isSubmitted ? 'Lihat Jawaban & Feedback' : 'Kerjakan Sekarang'}
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Pengumuman Guru Terbaru -->
            <div class="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 shadow-sm space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-sm text-purple-900 flex items-center gap-2">
                  <i class="fa-solid fa-bullhorn text-purple-600"></i> Pengumuman Guru
                </h4>
                <button onclick="PettyCashApp.navigate('communication')" class="text-[11px] font-bold text-purple-700">Semua</button>
              </div>

              ${state.announcements.slice(0, 2).map(a => `
                <div class="p-3 bg-white/90 rounded-xl border border-purple-100 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${a.tagColor === 'rose' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}">${a.tag}</span>
                    <span class="text-[10px] text-slate-400">${a.date.split(',')[0]}</span>
                  </div>
                  <h5 class="font-bold text-xs text-slate-800 leading-snug">${a.title}</h5>
                  <p class="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">${a.content}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Teacher Dashboard
  Components.renderTeacherDashboard = function (state) {
    const totalStudents = state.users.siswaList.length;
    const totalChapters = state.chapters.length;
    const pendingSubmissions = state.tasks.reduce((acc, t) => {
      const pending = t.submissions.filter(s => s.score === undefined).length;
      return acc + pending;
    }, 0);

    // Compute average score across student quizzes
    let totalScore = 0;
    let scoreCount = 0;
    state.users.siswaList.forEach(s => {
      if (s.lastQuizScore) {
        totalScore += s.lastQuizScore;
        scoreCount++;
      }
    });
    const avgScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;

    return `
      <div class="space-y-8">
        <!-- Teacher Welcome Hero -->
        <div class="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex items-center gap-4">
              <img src="${state.currentUser.avatar}" alt="${state.currentUser.name}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-md">
              <div>
                <div class="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-purple-100 text-xs font-bold mb-1">
                  NIP: ${state.currentUser.nip} • Guru Akuntansi AKL
                </div>
                <h1 class="text-2xl sm:text-3xl font-black">Panel Pengelolaan Guru: ${state.currentUser.name}</h1>
                <p class="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
                  Kelola materi kas kecil, periksa lembar kerja & tugas siswa, pantau grafik hasil belajar, serta kirim pengumuman ke seluruh kelas.
                </p>
              </div>
            </div>

            <!-- Quick Action Buttons -->
            <div class="flex flex-wrap items-center gap-2 flex-shrink-0">
              <button onclick="PettyCashApp.openAddMaterialModal()" class="btn-bounce px-4 py-2.5 rounded-xl bg-white text-purple-800 font-extrabold text-xs shadow-md flex items-center gap-1.5">
                <i class="fa-solid fa-plus-circle text-purple-600"></i> Tambah Materi
              </button>
              <button onclick="PettyCashApp.openAddTaskModal()" class="btn-bounce px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs shadow-md flex items-center gap-1.5">
                <i class="fa-solid fa-file-circle-plus"></i> Beri Tugas Baru
              </button>
            </div>
          </div>
          <i class="fa-solid fa-chalkboard-user absolute -right-6 -bottom-6 text-9xl text-white/10 pointer-events-none"></i>
        </div>

        <!-- 4 Stat Cards for Teacher -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 card-hover-effect">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Total Siswa Aktif</span>
              <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                <i class="fa-solid fa-user-group"></i>
              </div>
            </div>
            <p class="text-2xl font-black text-slate-800">${totalStudents} Siswa</p>
            <p class="text-[11px] text-emerald-600 font-bold"><i class="fa-solid fa-circle-check mr-1"></i>Semua terdaftar di Kelas XII AKL</p>
          </div>

          <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 card-hover-effect">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Rata-Rata Nilai Kuis</span>
              <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
                <i class="fa-solid fa-chart-line"></i>
              </div>
            </div>
            <p class="text-2xl font-black text-emerald-600">${avgScore} <span class="text-xs text-slate-400 font-normal">/ 100</span></p>
            <p class="text-[11px] text-slate-500">Target KKM: 75.00 (Tercapai)</p>
          </div>

          <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 card-hover-effect">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Tugas Perlu Dinilai</span>
              <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">
                <i class="fa-solid fa-clock-rotate-left"></i>
              </div>
            </div>
            <p class="text-2xl font-black text-amber-600">${pendingSubmissions} Kiriman</p>
            <button onclick="PettyCashApp.navigate('tasks')" class="text-xs font-bold text-amber-700 hover:underline">
              Periksa Sekarang <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 card-hover-effect">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Materi Kas Kecil</span>
              <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                <i class="fa-solid fa-book"></i>
              </div>
            </div>
            <p class="text-2xl font-black text-purple-600">${totalChapters} Bab Aktif</p>
            <p class="text-[11px] text-slate-500">Dilengkapi 1 Video Pembelajaran</p>
          </div>
        </div>

        <!-- Student Progress Table & Management -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 class="text-base font-bold text-slate-800">Daftar Perkembangan Belajar Siswa (Kelas XII AKL 1)</h3>
              <p class="text-xs text-slate-500">Pantau progres penyelesaian materi, nilai kuis, dan simulasi jurnal masing-masing siswa.</p>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" id="student-search-input" onkeyup="PettyCashApp.filterStudentList(this.value)" placeholder="Cari nama atau NIS siswa..." class="px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400">
            </div>
          </div>

          <!-- Student Table -->
          <div class="overflow-x-auto">
            <table class="ledger-table text-xs" id="teacher-student-table">
              <thead>
                <tr>
                  <th>Siswa</th>
                  <th>NIS</th>
                  <th>Progres Materi</th>
                  <th>Nilai Kuis Terakhir</th>
                  <th>Simulasi Jurnal</th>
                  <th>Lencana</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${state.users.siswaList.map(st => `
                  <tr>
                    <td>
                      <div class="flex items-center gap-2.5">
                        <img src="${st.avatar}" alt="${st.name}" class="w-8 h-8 rounded-full object-cover">
                        <div>
                          <p class="font-bold text-slate-800">${st.name}</p>
                          <span class="text-[10px] text-slate-500">${st.kelas}</span>
                        </div>
                      </div>
                    </td>
                    <td class="font-mono text-slate-600">${st.nis}</td>
                    <td>
                      <div class="flex items-center gap-2">
                        <div class="w-20 bg-slate-100 rounded-full h-2">
                          <div class="bg-purple-600 h-2 rounded-full" style="width: ${st.progressPercent}%"></div>
                        </div>
                        <span class="font-bold text-slate-700">${st.progressPercent}%</span>
                      </div>
                    </td>
                    <td>
                      <span class="px-2 py-0.5 rounded font-bold ${st.lastQuizScore >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
                        ${st.lastQuizScore || '-'} / 100
                      </span>
                    </td>
                    <td>
                      <span class="font-semibold text-slate-700">${(st.journalSimulations || []).length} Skenario</span>
                    </td>
                    <td>
                      <div class="flex flex-wrap gap-1">
                        ${(st.badges || []).map(b => `<span class="px-1.5 py-0.2 bg-amber-50 text-amber-800 text-[9px] rounded font-semibold border border-amber-200">${b}</span>`).join('')}
                      </div>
                    </td>
                    <td>
                      <button onclick="PettyCashApp.viewStudentDetail('${st.id}')" class="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg border border-purple-200 transition">
                        Buku Rapor
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Teacher Quick Actions & Announcements -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Kirim Pengumuman Cepat -->
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 class="font-bold text-sm text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-bullhorn text-purple-600"></i> Buat Pengumuman Baru
              </h4>
              <span class="text-[11px] text-slate-400">Tampil di dashboard seluruh siswa</span>
            </div>

            <form onsubmit="PettyCashApp.handleCreateAnnouncement(event)" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Judul Pengumuman</label>
                <input type="text" id="ann-title" required placeholder="Contoh: Pengingat Ujian Praktik Kas Kecil" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none">
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Kategori Tag</label>
                  <select id="ann-tag" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none">
                    <option value="Penting">Penting</option>
                    <option value="Materi Baru">Materi Baru</option>
                    <option value="Info Tugas">Info Tugas</option>
                    <option value="Tips Belajar">Tips Belajar</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Warna Tag</label>
                  <select id="ann-color" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none">
                    <option value="rose">Merah (Darurat/Penting)</option>
                    <option value="blue">Biru (Umum/Materi)</option>
                    <option value="purple">Ungu (Tugas/Kuis)</option>
                    <option value="amber">Kuning (Tips)</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Isi Pengumuman</label>
                <textarea id="ann-content" required rows="3" placeholder="Tulis instruksi atau informasi penting untuk siswa..." class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"></textarea>
              </div>
              <button type="submit" class="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-paper-plane"></i> Publikasikan Pengumuman
              </button>
            </form>
          </div>

          <!-- Quick Submission Grading -->
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 class="font-bold text-sm text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-clipboard-check text-emerald-600"></i> Tugas yang Telah Masuk
              </h4>
              <button onclick="PettyCashApp.navigate('tasks')" class="text-xs font-bold text-purple-700">Kelola Semua Tugas</button>
            </div>

            <div class="space-y-3">
              ${state.tasks.map(t => {
                const gradedCount = t.submissions.filter(s => s.score !== undefined).length;
                const totalSubs = t.submissions.length;
                return `
                  <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <span class="text-[10px] font-bold text-purple-700 uppercase">${t.chapterRef}</span>
                      <h5 class="font-bold text-xs text-slate-800">${t.title}</h5>
                      <p class="text-[11px] text-slate-500">${totalSubs} Pengumpulan (${gradedCount} Dinilai)</p>
                    </div>
                    <button onclick="PettyCashApp.openTaskModal('${t.id}')" class="px-3 py-1.5 bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold rounded-lg flex-shrink-0">
                      Periksa
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Section E: Materials (Bab 1 to 5)
  Components.renderMaterials = function (state) {
    const activeChId = state.activeChapterId || 1;
    const ch = state.chapters.find(c => c.id === activeChId) || state.chapters[0];
    const isCompleted = (state.activeStudent.completedChapters || []).includes(ch.id);

    return `
      <div class="space-y-8">
        <!-- Header Banner -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-purple-600 mb-1 uppercase tracking-wider">
              <i class="fa-solid fa-book-open"></i> Modul Pembelajaran Kas Kecil
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">${ch.title}</h1>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">${ch.subtitle} • Estimasi: ${ch.duration}</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="PettyCashApp.toggleCompleteChapter(${ch.id})" class="btn-bounce px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${isCompleted ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}">
              <i class="fa-solid ${isCompleted ? 'fa-circle-check text-emerald-600' : 'fa-check'}"></i>
              ${isCompleted ? 'Bab Ini Sudah Selesai' : 'Tandai Bab Selesai'}
            </button>
            <button onclick="PettyCashApp.navigate('quiz')" class="btn-bounce px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs shadow-md flex items-center gap-1.5">
              <i class="fa-solid fa-gamepad"></i> Coba Kuis Bab Ini
            </button>
          </div>
        </div>

        <!-- Chapter Selector Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${state.chapters.map(c => {
            const isActive = c.id === ch.id;
            const isDone = (state.activeStudent.completedChapters || []).includes(c.id);
            return `
              <button onclick="PettyCashApp.openChapter(${c.id})" class="px-4 py-3 rounded-2xl font-bold text-xs whitespace-nowrap transition flex items-center gap-2 border ${isActive ? 'tab-active border-transparent' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'}">
                <span class="w-5 h-5 rounded-full ${isActive ? 'bg-white text-blue-700' : isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'} flex items-center justify-center text-[10px]">
                  ${isDone ? '<i class="fa-solid fa-check"></i>' : c.id}
                </span>
                <span>Bab ${c.id}: ${c.title.split('–')[1] ? c.title.split('–')[1].trim() : c.title}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Chapter Summary Card -->
        <div class="p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/80 shadow-sm flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
            <i class="fa-solid fa-lightbulb"></i>
          </div>
          <div>
            <h4 class="font-bold text-sm text-blue-900 mb-1">Rangkuman Intisari Bab ${ch.id}</h4>
            <p class="text-xs text-blue-800 leading-relaxed">${ch.summary}</p>
          </div>
        </div>

        <!-- Main Chapter Body Sections -->
        <div class="space-y-6">
          ${ch.sections.map((sec, idx) => `
            <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 class="text-lg font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span class="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">${idx + 1}</span>
                ${sec.heading}
              </h3>
              <div class="prose max-w-none text-slate-700 text-sm">
                ${sec.content}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Next / Prev Chapter Navigation -->
        <div class="flex items-center justify-between pt-6 border-t border-slate-200">
          ${ch.id > 1 ? `
            <button onclick="PettyCashApp.openChapter(${ch.id - 1})" class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition flex items-center gap-2">
              <i class="fa-solid fa-arrow-left"></i> Bab Sebelumnya (Bab ${ch.id - 1})
            </button>
          ` : `<div></div>`}

          ${ch.id < state.chapters.length ? `
            <button onclick="PettyCashApp.openChapter(${ch.id + 1})" class="btn-bounce px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2">
              Lanjut ke Bab ${ch.id + 1} <i class="fa-solid fa-arrow-right"></i>
            </button>
          ` : `
            <button onclick="PettyCashApp.navigate('quiz')" class="btn-bounce px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2">
              Selesaikan Kuis Evaluasi Akhir <i class="fa-solid fa-trophy"></i>
            </button>
          `}
        </div>
      </div>
    `;
  };

  // Section F: Videos (hanya 1 video, tanpa daftar pembelajaran)
  Components.renderVideos = function (state) {
    const currentVideo = state.videos[0];
    const isWatched = (state.activeStudent.completedVideos || []).includes(currentVideo.id);

    return `
      <div class="space-y-8 max-w-5xl mx-auto">
        <!-- Header & Stats -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-purple-600 mb-1 uppercase tracking-wider">
              <i class="fa-solid fa-video"></i> Video Pembelajaran Interaktif
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Materi Audio Visual Kas Kecil</h1>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">Tonton penjelasan di bawah ini untuk memperdalam pemahaman konsep Anda.</p>
          </div>

          <!-- Video Progress Indicator -->
          <div class="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
              <i class="fa-solid ${isWatched ? 'fa-check text-emerald-600' : 'fa-play'}"></i>
            </div>
            <div>
              <p class="text-xs font-bold text-slate-800">Status Video</p>
              <p class="text-xs font-bold ${isWatched ? 'text-emerald-600' : 'text-amber-500'} mt-0.5">
                ${isWatched ? 'Selesai Ditonton (100%)' : 'Belum Selesai (0%)'}
              </p>
            </div>
          </div>
        </div>

        <!-- Main Video Player Section -->
        <div class="space-y-5">
          <div class="relative bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 aspect-video">
            <iframe
              src="${currentVideo.videoEmbedUrl}"
              title="${currentVideo.title}"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>

          <!-- Video Info & Mark Complete -->
          <div class="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">Materi Utama</span>
                <h2 class="text-2xl font-bold text-slate-900 mt-2">${currentVideo.title}</h2>
              </div>
              <button onclick="PettyCashApp.toggleCompleteVideo(${currentVideo.id})" class="btn-bounce px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition flex-shrink-0 ${isWatched ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'}">
                <i class="fa-solid ${isWatched ? 'fa-circle-check text-emerald-600' : 'fa-check'}"></i>
                ${isWatched ? 'Sudah Ditonton' : 'Tandai Selesai Ditonton'}
              </button>
            </div>

            <p class="text-sm text-slate-600 leading-relaxed">${currentVideo.description}</p>

            <!-- Key Takeaways -->
            <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 class="font-bold text-sm text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fa-solid fa-list-ul text-blue-600"></i> Poin-Poin Penting Video Ini:
              </h4>
              <ul class="space-y-2 text-sm text-slate-600">
                ${currentVideo.keyPoints.map(kp => `<li class="flex items-start gap-2.5"><i class="fa-solid fa-check-circle text-emerald-500 mt-0.5 text-base"></i><span>${kp}</span></li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Section G: Interactive Quiz Engine (5 Question Types)
  Components.renderQuiz = function (state) {
    const quizState = state.quizRunner;
    const questions = state.quizzes;

    // If quiz not started or finished, show intro / summary
    if (quizState.status === 'intro') {
      return Components.renderQuizIntro(state);
    } else if (quizState.status === 'completed') {
      return Components.renderQuizResult(state);
    }

    // Active Quiz Question (One Question per screen)
    const currentQ = questions[quizState.currentIndex];
    const totalQ = questions.length;
    const progress = Math.round(((quizState.currentIndex + 1) / totalQ) * 100);

    return `
      <div class="max-w-3xl mx-auto space-y-6">
        <!-- Top Bar: Progress & Question Counter -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between text-xs font-bold text-slate-600">
            <span class="flex items-center gap-1.5 text-purple-700">
              <i class="fa-solid fa-circle-question"></i> Soal ${quizState.currentIndex + 1} dari ${totalQ}
            </span>
            <span class="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px]">
              Tipe: ${currentQ.type === 'mc' ? 'Pilihan Ganda' : currentQ.type === 'tf' ? 'Benar / Salah' : currentQ.type === 'match' ? 'Menjodohkan Istilah' : currentQ.type === 'case' ? 'Studi Kasus' : 'Hitung Jurnal'}
            </span>
            <span class="text-slate-500">Skor Saat Ini: ${quizState.score}</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div class="space-y-2">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">${currentQ.title}</span>
            <h2 class="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              ${currentQ.question || currentQ.instruction}
            </h2>
          </div>

          <!-- Dynamic Question Renderer by Type -->
          <div id="quiz-question-container">
            ${Components.renderQuestionBody(currentQ, quizState)}
          </div>

          <!-- Instant Feedback Alert (Shown after answer submission) -->
          ${quizState.answered ? `
            <div class="p-4 rounded-2xl border transition-all ${quizState.isCurrentCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'} space-y-1.5 animate-fadeIn">
              <div class="flex items-center gap-2 font-bold text-sm">
                <i class="fa-solid ${quizState.isCurrentCorrect ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-rose-600'} text-base"></i>
                <span>${quizState.isCurrentCorrect ? 'Jawaban Kamu Tepat Sekali! 🎉 (+10 Poin)' : 'Jawaban Kurang Tepat! Tetap Semangat!'}</span>
              </div>
              <p class="text-xs leading-relaxed ${quizState.isCurrentCorrect ? 'text-emerald-800' : 'text-rose-800'}">
                <strong>Pembahasan:</strong> ${currentQ.explanation || 'Perhatikan prinsip keseimbangan debet dan kredit dalam penjurnalan kas kecil.'}
              </p>
            </div>
          ` : ''}

          <!-- Bottom Action Buttons -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <button onclick="PettyCashApp.exitQuiz()" class="text-xs font-bold text-slate-500 hover:text-slate-800">
              <i class="fa-solid fa-xmark mr-1"></i> Keluar Kuis
            </button>

            ${!quizState.answered ? `
              <button onclick="PettyCashApp.submitCurrentAnswer()" id="btn-submit-answer" class="btn-bounce px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50" ${quizState.selectedAnswer === null ? 'disabled' : ''}>
                Kirim Jawaban <i class="fa-solid fa-arrow-right ml-1"></i>
              </button>
            ` : `
              <button onclick="PettyCashApp.nextQuestion()" class="btn-bounce px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
                ${quizState.currentIndex + 1 < totalQ ? 'Soal Berikutnya <i class="fa-solid fa-arrow-right ml-1"></i>' : 'Lihat Hasil Akhir <i class="fa-solid fa-trophy ml-1"></i>'}
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  };

  // Helper render question body
  Components.renderQuestionBody = function (q, quizState) {
    if (q.type === 'mc' || q.type === 'tf' || q.type === 'case' || q.type === 'calc') {
      return `
        <div class="space-y-2.5">
          ${q.options.map((opt, idx) => {
            let extraClass = '';
            if (quizState.answered) {
              extraClass += ' locked';
              if (idx === q.answer) {
                extraClass += ' correct';
              } else if (idx === quizState.selectedAnswer) {
                extraClass += ' wrong';
              }
            } else if (quizState.selectedAnswer === idx) {
              extraClass += ' selected';
            }

            return `
              <div onclick="${!quizState.answered ? `PettyCashApp.selectQuizOption(${idx})` : ''}" class="quiz-option p-4 rounded-xl flex items-center justify-between gap-3 ${extraClass}">
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-lg border border-slate-300 font-bold text-xs flex items-center justify-center flex-shrink-0 ${quizState.selectedAnswer === idx ? 'bg-purple-600 text-white border-transparent' : 'bg-slate-50 text-slate-700'}">
                    ${String.fromCharCode(65 + idx)}
                  </span>
                  <span class="text-xs sm:text-sm font-medium text-slate-800">${opt}</span>
                </div>
                ${quizState.answered && idx === q.answer ? '<i class="fa-solid fa-check text-emerald-600 text-sm"></i>' : ''}
                ${quizState.answered && idx === quizState.selectedAnswer && idx !== q.answer ? '<i class="fa-solid fa-xmark text-rose-600 text-sm"></i>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (q.type === 'match') {
      // Matching term type
      const activeTerm = quizState.matchingActiveTerm;
      const matches = quizState.matchingMatches || {};

      return `
        <div class="space-y-4">
          <p class="text-xs text-slate-500">Klik istilah di sebelah kiri, lalu klik pasangannya di sebelah kanan:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Left Terms -->
            <div class="space-y-2">
              <h4 class="font-bold text-xs text-slate-700 uppercase">Istilah Akuntansi</h4>
              ${q.pairs.map(p => {
                const isMatched = !!matches[p.id];
                const isActive = activeTerm === p.id;
                return `
                  <div onclick="${!quizState.answered && !isMatched ? `PettyCashApp.selectMatchingTerm('${p.id}')` : ''}" class="match-item p-3 rounded-xl border-2 text-xs font-bold ${isMatched ? 'matched' : isActive ? 'active' : 'border-slate-200 bg-white hover:border-purple-300'}">
                    <div class="flex items-center justify-between">
                      <span>${p.term}</span>
                      ${isMatched ? '<i class="fa-solid fa-circle-check text-emerald-600"></i>' : '<i class="fa-solid fa-arrow-right text-slate-300"></i>'}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Right Definitions -->
            <div class="space-y-2">
              <h4 class="font-bold text-xs text-slate-700 uppercase">Definisi Konsep</h4>
              ${q.pairs.map((p, idx) => {
                const isMatchedValue = Object.values(matches).includes(p.id);
                return `
                  <div onclick="${!quizState.answered && !isMatchedValue ? `PettyCashApp.matchDefinition('${p.id}')` : ''}" class="match-item p-3 rounded-xl border-2 text-xs font-medium ${isMatchedValue ? 'matched' : 'border-slate-200 bg-white hover:border-purple-300'}">
                    <div class="flex items-center justify-between gap-2">
                      <span>${p.def}</span>
                      ${isMatchedValue ? '<i class="fa-solid fa-check-double text-emerald-600"></i>' : '<i class="fa-solid fa-plus text-slate-300"></i>'}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }
  };

  // Quiz Intro Screen
  Components.renderQuizIntro = function (state) {
    const totalQ = state.quizzes.length;
    return `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10 text-center space-y-6">
        <div class="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-purple-600 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-purple-500/20 badge-pulse">
          <i class="fa-solid fa-trophy"></i>
        </div>

        <div class="space-y-2">
          <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-bold text-xs uppercase tracking-wider">Uji Kompetensi Mandiri</span>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900">Kuis Komprehensif Kas Kecil</h1>
          <p class="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Kuis ini dirancang untuk menguji pemahaman Anda terhadap Bab 1 hingga Bab 5. Dilengkapi pilihan ganda, benar/salah, mencocokkan istilah, dan latihan hitung jurnal.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <div>
            <p class="text-lg font-black text-purple-700">${totalQ}</p>
            <p class="text-[11px] font-bold text-slate-500">Total Soal</p>
          </div>
          <div>
            <p class="text-lg font-black text-blue-600">10 Poin</p>
            <p class="text-[11px] font-bold text-slate-500">Per Jawaban Benar</p>
          </div>
          <div>
            <p class="text-lg font-black text-emerald-600">Instan</p>
            <p class="text-[11px] font-bold text-slate-500">Pembahasan Detail</p>
          </div>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onclick="PettyCashApp.startQuiz()" class="btn-bounce w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-sm shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2">
            <i class="fa-solid fa-play"></i> Mulai Mengerjakan Kuis
          </button>
          <button onclick="PettyCashApp.navigate('materials')" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm">
            Review Materi Dahulu
          </button>
        </div>
      </div>
    `;
  };

  // Quiz Result Summary Screen
  Components.renderQuizResult = function (state) {
    const quizState = state.quizRunner;
    const finalScore = Math.round((quizState.correctCount / state.quizzes.length) * 100);
    const isPassed = finalScore >= 75;

    return `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 text-center space-y-6">
        <div class="w-24 h-24 rounded-3xl ${isPassed ? 'bg-gradient-to-tr from-emerald-400 to-teal-600' : 'bg-gradient-to-tr from-amber-400 to-orange-500'} text-white flex items-center justify-center text-5xl mx-auto shadow-xl">
          <i class="fa-solid ${isPassed ? 'fa-award' : 'fa-rotate-right'}"></i>
        </div>

        <div class="space-y-2">
          <span class="px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider ${isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
            ${isPassed ? 'Selamat! Anda Kompeten' : 'Perlu Pendalaman Materi'}
          </span>
          <h1 class="text-3xl font-black text-slate-900">Hasil Evaluasi Kuis</h1>
          <p class="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            ${isPassed ? 'Luar biasa! Anda telah menguasai konsep dan teknik pencatatan kas kecil dengan sangat baik.' : 'Jangan berkecil hati. Pelajari kembali ringkasan Bab 3 dan Bab 4 lalu ulangi kuis ini.'}
          </p>
        </div>

        <!-- Big Score Number -->
        <div class="p-6 bg-slate-50 rounded-3xl border border-slate-200 inline-block px-12">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Nilai Akhir</p>
          <p class="text-5xl sm:text-6xl font-black ${isPassed ? 'text-emerald-600' : 'text-amber-600'} my-1">${finalScore}</p>
          <p class="text-xs font-bold text-slate-600">KKM: 75.00</p>
        </div>

        <!-- Breakdown Stats -->
        <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
            <p class="text-2xl font-black text-emerald-700">${quizState.correctCount}</p>
            <p class="text-xs font-bold text-emerald-800">Jawaban Benar</p>
          </div>
          <div class="p-4 bg-rose-50 rounded-2xl border border-rose-200">
            <p class="text-2xl font-black text-rose-700">${quizState.wrongCount}</p>
            <p class="text-xs font-bold text-rose-800">Jawaban Salah</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onclick="PettyCashApp.saveQuizScoreToProfile(${finalScore})" class="btn-bounce w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2">
            <i class="fa-solid fa-floppy-disk"></i> Simpan Nilai ke Rapor Siswa
          </button>
          <button onclick="PettyCashApp.startQuiz()" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2">
            <i class="fa-solid fa-rotate-right"></i> Ulangi Kuis
          </button>
          <button onclick="PettyCashApp.navigate('dashboard')" class="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs">
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    `;
  };

  // Section H: Interactive Accounting Journal Simulation
  Components.renderJournal = function (state) {
    const exercises = state.journalExercises;
    const activeExId = state.activeExerciseId || exercises[0].id;
    const currentEx = exercises.find(e => e.id === activeExId) || exercises[0];
    const journalResult = state.journalRunner;

    return `
      <div class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider">
              <i class="fa-solid fa-book-journal-whills"></i> Simulator Jurnal Akuntansi Kas Kecil
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Praktik Penjurnalan Real-Time</h1>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">Pilih studi transaksi, isi akun Debet dan Kredit beserta nominalnya. Sistem otomatis memvalidasi keseimbangan jurnal!</p>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl font-extrabold text-xs">
              <i class="fa-solid fa-shield-halved mr-1"></i> Standar Jurnal SAK
            </span>
          </div>
        </div>

        <!-- Exercise Scenario Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          ${exercises.map(ex => {
            const isActive = ex.id === currentEx.id;
            return `
              <button onclick="PettyCashApp.selectJournalExercise('${ex.id}')" class="px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${isActive ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'}">
                ${ex.title}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Selected Transaction Case Card -->
        <div class="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 rounded-2xl border border-emerald-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-xs">${currentEx.title}</span>
            <span class="text-xs font-mono font-bold text-slate-600"><i class="fa-regular fa-calendar mr-1"></i>Tanggal: ${currentEx.date}</span>
          </div>
          <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">${currentEx.description}</h3>
        </div>

        <!-- Interactive Ledger Entry Form -->
        <div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 class="font-bold text-sm text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-pen-to-square text-emerald-600"></i> Formulir Lembar Kerja Jurnal Umum
            </h4>
            <span class="text-[11px] text-slate-400">Pastikan Debet == Kredit</span>
          </div>

          <form onsubmit="PettyCashApp.checkJournalEntry(event)" class="space-y-4">
            <!-- Row 1: Date & Description -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div class="md:col-span-4">
                <label class="block text-xs font-bold text-slate-700 mb-1">Tanggal Transaksi</label>
                <input type="text" id="journal-input-date" value="${currentEx.date}" readonly class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
              </div>
              <div class="md:col-span-8">
                <label class="block text-xs font-bold text-slate-700 mb-1">Keterangan Singkat</label>
                <input type="text" id="journal-input-memo" placeholder="Contoh: Pembentukan kas kecil Cek No. 001" required class="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none">
              </div>
            </div>

            <!-- Ledger Table Interactive Inputs -->
            <div class="overflow-x-auto border border-slate-200 rounded-2xl">
              <table class="ledger-table text-xs">
                <thead>
                  <tr>
                    <th class="w-1/2">Nama Akun Perkiraan</th>
                    <th class="w-1/4 text-emerald-700">Debet (Rp)</th>
                    <th class="w-1/4 text-purple-700">Kredit (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Debet Line -->
                  <tr>
                    <td>
                      <select id="journal-debit-account" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                        <option value="">-- Pilih Akun Sisi Debet --</option>
                        <option value="Kas Kecil">Kas Kecil (Aset)</option>
                        <option value="Kas di Bank">Kas di Bank (Aset)</option>
                        <option value="Beban Perlengkapan Kantor">Beban Perlengkapan Kantor</option>
                        <option value="Beban Konsumsi">Beban Konsumsi</option>
                        <option value="Beban Transportasi & Selisih Kas">Beban Transportasi & Selisih Kas</option>
                        <option value="Beban Rupa-rupa">Beban Rupa-rupa</option>
                        <option value="Selisih Kas">Selisih Kas</option>
                      </select>
                    </td>
                    <td>
                      <input type="number" id="journal-debit-amount" placeholder="Contoh: 3500000" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono text-emerald-700 font-bold focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                    </td>
                    <td class="bg-slate-50 text-slate-400 text-center">-</td>
                  </tr>

                  <!-- Kredit Line -->
                  <tr>
                    <td class="pl-8">
                      <select id="journal-credit-account" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                        <option value="">-- Pilih Akun Sisi Kredit --</option>
                        <option value="Kas di Bank">Kas di Bank (Aset)</option>
                        <option value="Kas Kecil">Kas Kecil (Aset)</option>
                        <option value="Selisih Kas Lebih">Selisih Kas Lebih</option>
                        <option value="Pendapatan Lain-lain">Pendapatan Lain-lain</option>
                      </select>
                    </td>
                    <td class="bg-slate-50 text-slate-400 text-center">-</td>
                    <td>
                      <input type="number" id="journal-credit-amount" placeholder="Contoh: 3500000" required class="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono text-purple-700 font-bold focus:ring-2 focus:ring-purple-400 focus:outline-none">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Validation Trigger Button -->
            <div class="flex items-center justify-between pt-2">
              <span class="text-xs text-slate-500 italic">*Pilihlah akun yang tepat sesuai metode pencatatan yang diminta.</span>
              <button type="submit" class="btn-bounce px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2">
                <i class="fa-solid fa-calculator"></i> Periksa Jawaban Jurnal Saya
              </button>
            </div>
          </form>

          <!-- Result & Solution Card -->
          ${journalResult && journalResult.exerciseId === currentEx.id ? `
            <div class="p-5 rounded-2xl border transition-all ${journalResult.isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'} space-y-3 animate-fadeIn">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 font-bold text-sm ${journalResult.isCorrect ? 'text-emerald-900' : 'text-rose-900'}">
                  <i class="fa-solid ${journalResult.isCorrect ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-rose-600'} text-lg"></i>
                  <span>${journalResult.isCorrect ? 'Koreksi Berhasil: Jurnal Anda 100% Benar & Seimbang!' : 'Perlu Diperbaiki: Masih Ada Ketidaksesuaian Akun / Nominal'}</span>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-black ${journalResult.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}">
                  Skor: ${journalResult.score}/100
                </span>
              </div>

              <div class="p-4 bg-white rounded-xl border ${journalResult.isCorrect ? 'border-emerald-200' : 'border-rose-200'} text-xs space-y-2">
                <p class="font-bold text-slate-800">Kunci Jurnal Standar yang Benar:</p>
                <div class="font-mono text-slate-700 bg-slate-50 p-3 rounded-lg space-y-1">
                  <div class="text-emerald-700 font-bold">[D] ${currentEx.correctDebitAccount} ... ${formatRp(currentEx.correctDebitAmount)}</div>
                  <div class="text-purple-700 font-bold pl-6">[K] ${currentEx.correctCreditAccount} ... ${formatRp(currentEx.correctCreditAmount)}</div>
                </div>
                <p class="text-slate-600 leading-relaxed"><strong>Penjelasan Konseptual:</strong> ${currentEx.explanation}</p>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  };

  // Section I: Tasks and Grading
  Components.renderTasks = function (state) {
    const isGuru = state.currentUser.role === 'guru';
    const s = state.activeStudent;

    return `
      <div class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wider">
              <i class="fa-solid fa-list-check"></i> Tugas & Penilaian Hasil Belajar
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Lembar Kerja & Tugas Akuntansi</h1>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">${isGuru ? 'Periksa pengumpulan tugas siswa, berikan skor dan umpan balik personal.' : 'Kumpulkan lembar jawaban tugas kas kecil tepat waktu sebelum batas deadline.'}</p>
          </div>

          ${isGuru ? `
            <button onclick="PettyCashApp.openAddTaskModal()" class="btn-bounce px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md flex items-center gap-2">
              <i class="fa-solid fa-plus-circle"></i> Buat Tugas Baru
            </button>
          ` : ''}
        </div>

        <!-- Task List Cards -->
        <div class="space-y-6">
          ${state.tasks.map(t => {
            const studentSubmission = t.submissions.find(sub => sub.studentId === s.id);
            const isGraded = studentSubmission && studentSubmission.score !== undefined;
            const isSubmitted = !!studentSubmission;

            return `
              <div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-xs">${t.chapterRef}</span>
                      <span class="text-xs font-bold text-slate-500"><i class="fa-regular fa-clock mr-1"></i>Batas Pengumpulan: ${t.deadline}</span>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 mt-1">${t.title}</h3>
                  </div>

                  <!-- Badge Status -->
                  <div>
                    ${!isGuru ? (
                      isGraded ? `<span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">Nilai: ${studentSubmission.score} / 100</span>` :
                      isSubmitted ? `<span class="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs">Sudah Dikumpulkan (Menunggu Penilaian)</span>` :
                      `<span class="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-extrabold text-xs">Belum Dikumpulkan</span>`
                    ) : (
                      `<span class="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-extrabold text-xs">${t.submissions.length} Siswa Mengumpulkan</span>`
                    )}
                  </div>
                </div>

                <!-- Description / Instructions -->
                <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                  ${t.description}
                </div>

                <!-- Student View: Submission Status or Submit Form -->
                ${!isGuru ? `
                  ${isSubmitted ? `
                    <div class="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-blue-900"><i class="fa-solid fa-file-circle-check text-blue-600 mr-1.5"></i> Jawaban Anda (${studentSubmission.submittedAt}):</span>
                        ${studentSubmission.fileAttachment ? `<span class="text-[11px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border"><i class="fa-solid fa-paperclip mr-1"></i>${studentSubmission.fileAttachment}</span>` : ''}
                      </div>
                      <p class="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">${studentSubmission.content}</p>

                      ${isGraded ? `
                        <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 mt-2">
                          <p class="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                            <i class="fa-solid fa-comment-dots text-emerald-600"></i> Umpan Balik Guru (${studentSubmission.gradedBy}):
                          </p>
                          <p class="text-xs text-emerald-800 leading-relaxed italic">"${studentSubmission.feedback}"</p>
                        </div>
                      ` : ''}
                    </div>
                  ` : `
                    <!-- Submission Form -->
                    <form onsubmit="PettyCashApp.handleSubmitTask(event, '${t.id}')" class="p-4 bg-slate-50 rounded-2xl border border-dashed border-indigo-300 space-y-3">
                      <h4 class="font-bold text-xs text-indigo-900 uppercase">Kirim Lembar Jawaban Tugas</h4>
                      <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Ketik Jawaban / Penjelasan Jurnal Anda</label>
                        <textarea id="task-submission-text-${t.id}" required rows="3" placeholder="Tuliskan analisis perbandingan jurnal imprest dan fluktuasi Anda di sini..." class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"></textarea>
                      </div>
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div class="flex items-center gap-2">
                          <label class="text-xs font-bold text-slate-600 flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-400">
                            <i class="fa-solid fa-upload text-indigo-600"></i> Unggah Lampiran File (PDF/Excel)
                            <input type="file" class="hidden" onchange="PettyCashApp.handleFileSelect(this, '${t.id}')">
                          </label>
                          <span id="file-chosen-${t.id}" class="text-[11px] text-slate-500 italic">Belum ada file dipilih</span>
                        </div>
                        <button type="submit" class="btn-bounce px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md">
                          Kumpulkan Tugas Sekarang
                        </button>
                      </div>
                    </form>
                  `}
                ` : `
                  <!-- Teacher View: Submissions List to Grade -->
                  <div class="space-y-3 pt-2">
                    <h4 class="font-bold text-xs text-slate-800 uppercase tracking-wider">Kiriman Jawaban Siswa:</h4>
                    ${t.submissions.length === 0 ? `
                      <p class="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border">Belum ada siswa yang mengumpulkan tugas ini.</p>
                    ` : `
                      <div class="space-y-2">
                        ${t.submissions.map((sub, sIdx) => `
                          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-2.5">
                                <span class="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">${sIdx + 1}</span>
                                <div>
                                  <p class="font-bold text-xs text-slate-900">${sub.studentName}</p>
                                  <p class="text-[10px] text-slate-500">Dikumpulkan pada: ${sub.submittedAt}</p>
                                </div>
                              </div>
                              <span class="px-2.5 py-0.5 rounded font-bold text-xs ${sub.score !== undefined ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                                ${sub.score !== undefined ? `Nilai: ${sub.score}/100` : 'Belum Dinilai'}
                              </span>
                            </div>

                            <p class="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">${sub.content}</p>

                            <!-- Grading Form for Teacher -->
                            <form onsubmit="PettyCashApp.handleGradeSubmission(event, '${t.id}', '${sub.studentId}')" class="flex flex-col sm:flex-row items-center gap-2 pt-1">
                              <input type="number" min="0" max="100" value="${sub.score || ''}" placeholder="Nilai (0-100)" required class="w-28 px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold">
                              <input type="text" value="${sub.feedback || ''}" placeholder="Tulis feedback untuk siswa..." required class="flex-grow px-3 py-1.5 text-xs border border-slate-300 rounded-lg">
                              <button type="submit" class="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg shadow-sm whitespace-nowrap">
                                Simpan Nilai
                              </button>
                            </form>
                          </div>
                        `).join('')}
                      </div>
                    `}
                  </div>
                `}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  };

  // Section J: Progress
  Components.renderProgress = function (state) {
    const s = state.activeStudent;
    const totalChapters = state.chapters.length;
    const completedCh = (s.completedChapters || []).length;
    const chProgress = Math.round((completedCh / totalChapters) * 100);

    const totalVideos = state.videos.length;
    const completedVid = (s.completedVideos || []).length;
    const vidProgress = Math.min(100, Math.round((completedVid / totalVideos) * 100));

    return `
      <div class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-cyan-600 mb-1 uppercase tracking-wider">
              <i class="fa-solid fa-chart-line"></i> Analisis Hasil Belajar
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Progres Belajar & Rapor Kompetensi</h1>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">Pantau grafik capaian belajar, rekapitulasi nilai kuis, dan lencana prestasi yang telah diraih.</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="PettyCashApp.downloadReport()" class="btn-bounce px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-blue-400 font-bold text-xs text-slate-700 shadow-sm flex items-center gap-2">
              <i class="fa-solid fa-download text-blue-600"></i> Unduh Ringkasan Rapor
            </button>
          </div>
        </div>

        <!-- Progress Overview Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Modul Progress -->
          <div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Modul Materi</span>
              <span class="text-xs font-bold text-blue-600">${completedCh}/${totalChapters} Bab</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-slate-800">${chProgress}%</span>
              <span class="text-xs text-slate-500">Tuntas</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2.5">
              <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${chProgress}%"></div>
            </div>
            <p class="text-[11px] text-slate-500">Materi Bab 1 s/d Bab 5</p>
          </div>

          <!-- Video Progress -->
          <div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Video Pembelajaran</span>
              <span class="text-xs font-bold text-purple-600">${completedVid}/${totalVideos} Video</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-purple-600">${vidProgress}%</span>
              <span class="text-xs text-slate-500">Ditonton</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2.5">
              <div class="bg-purple-600 h-2.5 rounded-full" style="width: ${vidProgress}%"></div>
            </div>
            <p class="text-[11px] text-slate-500">Animasi & Studi Kasus Kasir</p>
          </div>

          <!-- Rata-rata Kuis -->
          <div class="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-500 uppercase">Nilai Kuis Terakhir</span>
              <span class="text-xs font-bold text-emerald-600">KKM: 75</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-emerald-600">${s.lastQuizScore || 90}</span>
              <span class="text-xs text-slate-500">/ 100</span>
            </div>
            <span class="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[11px]">Sangat Kompeten</span>
            <p class="text-[11px] text-slate-500">Terdaftar di Buku Nilai Resmi</p>
          </div>
        </div>

        <!-- Quiz History Table -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 class="font-bold text-base text-slate-800 flex items-center gap-2">
            <i class="fa-solid fa-clock-rotate-left text-blue-600"></i> Riwayat Evaluasi & Nilai Kuis
          </h3>

          <div class="overflow-x-auto">
            <table class="ledger-table text-xs">
              <thead>
                <tr>
                  <th>Judul Kuis</th>
                  <th>Tanggal Pengerjaan</th>
                  <th>Nilai Diperoleh</th>
                  <th>Status Kelulusan</th>
                </tr>
              </thead>
              <tbody>
                ${(s.quizHistory || []).map(q => `
                  <tr>
                    <td class="font-bold text-slate-800">${q.title}</td>
                    <td class="text-slate-500 font-mono">${q.date}</td>
                    <td>
                      <span class="text-sm font-black text-blue-600">${q.score}</span> / 100
                    </td>
                    <td>
                      <span class="px-2.5 py-0.5 rounded-full font-bold text-[10px] ${q.score >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                        ${q.score >= 75 ? 'LULUS (KOMPETEN)' : 'REMIDIAL'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Badges & Achievements -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 class="font-bold text-base text-slate-800 flex items-center gap-2">
            <i class="fa-solid fa-medal text-amber-500"></i> Lencana & Sertifikat Capaian
          </h3>
          <p class="text-xs text-slate-500">Dapatkan lencana penghargaan dengan menyelesaikan modul, menonton video, dan meraih skor 100 pada kuis.</p>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div class="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-center space-y-2">
              <div class="w-12 h-12 rounded-full bg-amber-400 text-white flex items-center justify-center text-xl mx-auto shadow-md">
                <i class="fa-solid fa-star"></i>
              </div>
              <h5 class="font-bold text-xs text-slate-800">Pelajar Tanggap</h5>
              <p class="text-[10px] text-slate-500">Menyelesaikan Bab 1 & 2 Kas Kecil</p>
            </div>

            <div class="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 text-center space-y-2">
              <div class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl mx-auto shadow-md">
                <i class="fa-solid fa-scale-balanced"></i>
              </div>
              <h5 class="font-bold text-xs text-slate-800">Master Imprest</h5>
              <p class="text-[10px] text-slate-500">Kuasai Sistem Dana Tetap Kas</p>
            </div>

            <div class="p-4 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl border border-purple-200 text-center space-y-2">
              <div class="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl mx-auto shadow-md">
                <i class="fa-solid fa-calculator"></i>
              </div>
              <h5 class="font-bold text-xs text-slate-800">Akuntan Teliti</h5>
              <p class="text-[10px] text-slate-500">Skor 100 pada Simulasi Jurnal</p>
            </div>

            <div class="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <div class="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl mx-auto shadow-md">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>
              <h5 class="font-bold text-xs text-slate-800">Bintang Kelas</h5>
              <p class="text-[10px] text-slate-500">Nilai Rata-Rata Kuis &gt; 90</p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Section K: Communication (Announcements & Discussions)
  Components.renderCommunication = function (state) {
    const isGuru = state.currentUser.role === 'guru';

    return `
      <div class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-purple-600 mb-1 uppercase tracking-wider">
              <i class="fa-solid fa-comments"></i> Pusat Komunikasi & Interaksi
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Pengumuman & Forum Tanya Jawab</h1>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">Ruang diskusi interaktif antara pendidik dan peserta didik seputar materi kas kecil.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Left: Announcements Board -->
          <div class="lg:col-span-5 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-base text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-bullhorn text-purple-600"></i> Papan Pengumuman
              </h3>
              ${isGuru ? `
                <button onclick="PettyCashApp.openAddAnnouncementModal()" class="text-xs font-bold text-purple-600 hover:underline">
                  + Buat Baru
                </button>
              ` : ''}
            </div>

            <div class="space-y-3">
              ${state.announcements.map(ann => `
                <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 card-hover-effect">
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded font-bold text-[10px] ${ann.tagColor === 'rose' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'}">
                      ${ann.tag}
                    </span>
                    <span class="text-[10px] text-slate-400">${ann.date}</span>
                  </div>
                  <h4 class="font-bold text-sm text-slate-900">${ann.title}</h4>
                  <p class="text-xs text-slate-600 leading-relaxed">${ann.content}</p>
                  <div class="pt-2 flex items-center gap-2 text-[11px] text-slate-500 border-t border-slate-100">
                    <i class="fa-solid fa-user-tie text-purple-600"></i>
                    <span>Oleh: <strong>${ann.author}</strong></span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right: Interactive Q&A Discussions -->
          <div class="lg:col-span-7 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-base text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-message text-blue-600"></i> Forum Diskusi Materi
              </h3>
              <span class="text-xs text-slate-500">${state.discussions.length} Pertanyaan Aktif</span>
            </div>

            <!-- Post New Question Form -->
            <form onsubmit="PettyCashApp.handlePostQuestion(event)" class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h4 class="font-bold text-xs text-slate-700 uppercase">Ajukan Pertanyaan kepada Guru / Teman</h4>
              <div>
                <input type="text" id="disc-topic" required placeholder="Topik (contoh: Bab 3: Pengisian Kembali Imprest)" class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none">
              </div>
              <div>
                <textarea id="disc-question" required rows="2" placeholder="Tuliskan pertanyaan Anda mengenai materi kas kecil secara spesifik..." class="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"></textarea>
              </div>
              <div class="flex justify-end">
                <button type="submit" class="btn-bounce px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2">
                  <i class="fa-solid fa-paper-plane"></i> Kirim Pertanyaan
                </button>
              </div>
            </form>

            <!-- Discussion Thread Items -->
            <div class="space-y-4">
              ${state.discussions.map(d => `
                <div class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <!-- Question -->
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-2.5">
                      <img src="${d.studentAvatar}" alt="${d.studentName}" class="w-8 h-8 rounded-full object-cover">
                      <div>
                        <p class="font-bold text-xs text-slate-900">${d.studentName}</p>
                        <span class="text-[10px] text-slate-400">${d.date}</span>
                      </div>
                    </div>
                    <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200">${d.topic}</span>
                  </div>

                  <p class="text-xs text-slate-800 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "${d.question}"
                  </p>

                  <!-- Replies -->
                  <div class="space-y-2 pl-4 border-l-2 border-purple-200">
                    ${(d.replies || []).map(r => `
                      <div class="p-3 bg-purple-50/70 rounded-xl border border-purple-100 space-y-1">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-2">
                            <img src="${r.avatar}" alt="${r.author}" class="w-6 h-6 rounded-full object-cover">
                            <span class="font-bold text-xs text-purple-900">${r.author} <span class="text-[10px] bg-purple-200 text-purple-800 px-1.5 py-0.2 rounded">${r.role}</span></span>
                          </div>
                          <span class="text-[10px] text-slate-400">${r.date}</span>
                        </div>
                        <p class="text-xs text-slate-700 leading-relaxed pl-8">${r.text}</p>
                      </div>
                    `).join('')}

                    <!-- Reply Form -->
                    <form onsubmit="PettyCashApp.handleReplyQuestion(event, '${d.id}')" class="flex items-center gap-2 pt-1">
                      <input type="text" placeholder="Tulis balasan atau tanggapan..." required class="flex-grow px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none">
                      <button type="submit" class="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm">
                        Balas
                      </button>
                    </form>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.Components = Components;
})();