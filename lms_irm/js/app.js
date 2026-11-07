// PETTY CASH LEARNING - Core Application Engine & State Controller
(function () {
  const STORAGE_KEY = 'petty_cash_lms_v2';

  // Load state from localStorage or fallback to initial data
  function loadInitialState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sinkronkan daftar video dengan data terbaru (hanya 1 video) agar state lama di localStorage tidak error
        parsed.videos = JSON.parse(JSON.stringify(window.PettyCashData.videos));
        const validIds = parsed.videos.map(v => v.id);
        const clamp = (stu) => {
          if (stu && Array.isArray(stu.completedVideos)) {
            stu.completedVideos = stu.completedVideos.filter(id => validIds.includes(id));
          }
        };
        clamp(parsed.activeStudent);
        clamp(parsed.currentUser);
        if (parsed.users && Array.isArray(parsed.users.siswaList)) parsed.users.siswaList.forEach(clamp);
        parsed.activeVideoId = validIds[0];
        return parsed;
      }
    } catch (e) {
      console.warn("Error reading localStorage", e);
    }
    // Clone default data
    const initial = JSON.parse(JSON.stringify(window.PettyCashData));
    initial.currentPage = 'landing';
    initial.activeChapterId = 1;
    initial.activeVideoId = 1;
    initial.activeExerciseId = 'ex-1';
    initial.currentUser = initial.users.siswaList[0]; // Default student Rian Pratama
    initial.activeStudent = initial.users.siswaList[0];
    initial.quizRunner = {
      status: 'intro', // 'intro' | 'running' | 'completed'
      currentIndex: 0,
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      selectedAnswer: null,
      answered: false,
      isCurrentCorrect: false,
      matchingActiveTerm: null,
      matchingMatches: {}
    };
    initial.journalRunner = null;
    return initial;
  }

  const PettyCashApp = {
    state: loadInitialState(),

    saveState: function () {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn("Error saving to localStorage", e);
      }
    },

    init: function () {
      console.log("PETTY CASH LEARNING LMS Initialized!");
      this.render();
      window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
          this.state.currentPage = e.state.page;
          this.render();
        }
      });
    },

    // Rendering pipeline
    render: function () {
      const appContainer = document.getElementById('app-root');
      if (!appContainer) return;

      const navbarHtml = window.Components.renderNavbar(this.state);
      const footerHtml = window.Components.renderFooter();
      let pageContentHtml = '';

      switch (this.state.currentPage) {
        case 'landing':
          pageContentHtml = window.Components.renderLanding(this.state);
          break;
        case 'dashboard':
          pageContentHtml = window.Components.renderDashboard(this.state);
          break;
        case 'materials':
          pageContentHtml = window.Components.renderMaterials(this.state);
          break;
        case 'videos':
          pageContentHtml = window.Components.renderVideos(this.state);
          break;
        case 'quiz':
          pageContentHtml = window.Components.renderQuiz(this.state);
          break;
        case 'journal':
          pageContentHtml = window.Components.renderJournal(this.state);
          break;
        case 'tasks':
          pageContentHtml = window.Components.renderTasks(this.state);
          break;
        case 'progress':
          pageContentHtml = window.Components.renderProgress(this.state);
          break;
        case 'communication':
          pageContentHtml = window.Components.renderCommunication(this.state);
          break;
        default:
          pageContentHtml = window.Components.renderLanding(this.state);
      }

      appContainer.innerHTML = `
        <div class="min-h-screen flex flex-col bg-slate-50">
          ${navbarHtml}
          <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            ${pageContentHtml}
          </main>
          ${footerHtml}
        </div>
        <div id="modal-container"></div>
        <div id="toast-container"></div>
      `;

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Navigation
    navigate: function (page, param) {
      if (window.SoundFX) window.SoundFX.playClick();
      this.state.currentPage = page;
      if (page === 'materials' && param) {
        this.state.activeChapterId = Number(param);
      } else if (page === 'videos' && param) {
        this.state.activeVideoId = Number(param);
      }
      this.closeMobileMenu();
      this.saveState();
      this.render();
    },

    toggleMobileMenu: function () {
      const drawer = document.getElementById('mobile-drawer');
      if (drawer) {
        drawer.classList.toggle('hidden');
      }
    },

    closeMobileMenu: function () {
      const drawer = document.getElementById('mobile-drawer');
      if (drawer && !drawer.classList.contains('hidden')) {
        drawer.classList.add('hidden');
      }
    },

    toggleSound: function () {
      if (window.SoundFX) {
        const muted = window.SoundFX.toggleMute();
        this.showToast(muted ? 'Suara audio dinonaktifkan (Mute)' : 'Suara audio diaktifkan (Unmute)', 'info');
        this.render();
      }
    },

    // Switch Role between Siswa and Guru
    switchRole: function (role) {
      if (window.SoundFX) window.SoundFX.playSuccess();
      if (role === 'guru') {
        this.state.currentUser = this.state.users.guru;
        this.showToast('Beralih ke Akun Guru: Dra. Hj. Nurjanah, M.Pd.', 'success');
      } else {
        this.state.currentUser = this.state.users.siswaList[0];
        this.state.activeStudent = this.state.users.siswaList[0];
        this.showToast('Beralih ke Akun Siswa: Rian Pratama (XII AKL 1)', 'success');
      }
      this.closeMobileMenu();
      this.closeModal();
      this.saveState();
      this.render();
    },

    // Chapter Management
    openChapter: function (chapterId) {
      if (window.SoundFX) window.SoundFX.playClick();
      this.state.activeChapterId = chapterId;
      this.state.currentPage = 'materials';
      this.saveState();
      this.render();
    },

    toggleCompleteChapter: function (chapterId) {
      const s = this.state.activeStudent;
      s.completedChapters = s.completedChapters || [];
      const idx = s.completedChapters.indexOf(chapterId);

      if (idx > -1) {
        s.completedChapters.splice(idx, 1);
        this.showToast(`Status Bab ${chapterId} dikembalikan menjadi belum selesai.`, 'info');
      } else {
        s.completedChapters.push(chapterId);
        if (window.SoundFX) window.SoundFX.playSuccess();
        this.triggerConfetti();
        this.showToast(`Selamat! Anda telah menyelesaikan Bab ${chapterId}! 🎉`, 'success');
      }

      // Recompute student progress percentage
      s.progressPercent = Math.round((s.completedChapters.length / this.state.chapters.length) * 100);
      this.saveState();
      this.render();
    },

    // Video Management
    selectVideo: function (videoId) {
      if (window.SoundFX) window.SoundFX.playClick();
      this.state.activeVideoId = videoId;
      this.saveState();
      this.render();
    },

    

    toggleCompleteVideo: function (videoId, autoFinish) {
      const s = this.state.activeStudent;
      s.completedVideos = s.completedVideos || [];
      const idx = s.completedVideos.indexOf(videoId);

      if (idx > -1 && !autoFinish) {
        s.completedVideos.splice(idx, 1);
        this.showToast(`Status Video ${videoId} diubah.`, 'info');
      } else if (idx === -1) {
        s.completedVideos.push(videoId);
        if (window.SoundFX) window.SoundFX.playSuccess();
        this.showToast(`Video ${videoId} ditandai selesai ditonton! 👍`, 'success');
      }

      this.saveState();
      this.render();
    },

    // Quiz Engine
    startQuiz: function () {
      if (window.SoundFX) window.SoundFX.playClick();
      this.state.quizRunner = {
        status: 'running',
        currentIndex: 0,
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        selectedAnswer: null,
        answered: false,
        isCurrentCorrect: false,
        matchingActiveTerm: null,
        matchingMatches: {}
      };
      this.saveState();
      this.render();
    },

    exitQuiz: function () {
      this.state.quizRunner.status = 'intro';
      this.saveState();
      this.render();
    },

    selectQuizOption: function (idx) {
      if (window.SoundFX) window.SoundFX.playClick();
      this.state.quizRunner.selectedAnswer = idx;
      this.render();
    },

    selectMatchingTerm: function (termId) {
      if (window.SoundFX) window.SoundFX.playClick();
      this.state.quizRunner.matchingActiveTerm = termId;
      this.render();
    },

    matchDefinition: function (defId) {
      const qr = this.state.quizRunner;
      if (!qr.matchingActiveTerm) {
        this.showToast("Klik terlebih dahulu istilah di sebelah kiri!", "info");
        return;
      }
      if (window.SoundFX) window.SoundFX.playClick();
      qr.matchingMatches[qr.matchingActiveTerm] = defId;
      qr.matchingActiveTerm = null;

      // Check if all pairs are matched
      const q = this.state.quizzes[qr.currentIndex];
      if (Object.keys(qr.matchingMatches).length === q.pairs.length) {
        qr.selectedAnswer = 'all-matched';
      }
      this.render();
    },

    submitCurrentAnswer: function () {
      const qr = this.state.quizRunner;
      const q = this.state.quizzes[qr.currentIndex];
      qr.answered = true;

      let isCorrect = false;
      if (q.type === 'match') {
        // Validate all matches
        let matchCorrect = true;
        q.pairs.forEach(p => {
          if (qr.matchingMatches[p.id] !== p.id) {
            matchCorrect = false;
          }
        });
        isCorrect = matchCorrect;
      } else {
        isCorrect = qr.selectedAnswer === q.answer;
      }

      qr.isCurrentCorrect = isCorrect;
      if (isCorrect) {
        qr.score += 10;
        qr.correctCount += 1;
        if (window.SoundFX) window.SoundFX.playSuccess();
      } else {
        qr.wrongCount += 1;
        if (window.SoundFX) window.SoundFX.playError();
      }

      this.saveState();
      this.render();
    },

    nextQuestion: function () {
      if (window.SoundFX) window.SoundFX.playClick();
      const qr = this.state.quizRunner;
      if (qr.currentIndex + 1 < this.state.quizzes.length) {
        qr.currentIndex += 1;
        qr.selectedAnswer = null;
        qr.answered = false;
        qr.isCurrentCorrect = false;
        qr.matchingActiveTerm = null;
        qr.matchingMatches = {};
      } else {
        qr.status = 'completed';
        if (window.SoundFX) window.SoundFX.playFanfare();
        this.triggerConfetti();
      }
      this.saveState();
      this.render();
    },

    saveQuizScoreToProfile: function (score) {
      if (window.SoundFX) window.SoundFX.playSuccess();
      const s = this.state.activeStudent;
      s.lastQuizScore = score;
      s.quizHistory = s.quizHistory || [];
      s.quizHistory.unshift({
        id: 'q-' + Date.now(),
        title: 'Evaluasi Komprehensif Kas Kecil',
        score: score,
        date: new Date().toISOString().split('T')[0]
      });

      // Add badge if score 100
      if (score === 100 && (!s.badges || !s.badges.includes("Juara Kuis 100"))) {
        s.badges = s.badges || [];
        s.badges.push("Juara Kuis 100");
      }

      this.showToast(`Nilai ${score} berhasil dicatat di rapor ${s.name}!`, 'success');
      this.state.quizRunner.status = 'intro';
      this.saveState();
      this.render();
    },

    // Interactive Journal Simulation
    selectJournalExercise: function (exId) {
      if (window.SoundFX) window.SoundFX.playClick();
      this.state.activeExerciseId = exId;
      this.state.journalRunner = null;
      this.saveState();
      this.render();
    },

    checkJournalEntry: function (event) {
      event.preventDefault();
      const currentEx = this.state.journalExercises.find(e => e.id === this.state.activeExerciseId);
      if (!currentEx) return;

      const debitAcc = document.getElementById('journal-debit-account').value;
      const debitAmt = Number(document.getElementById('journal-debit-amount').value);
      const creditAcc = document.getElementById('journal-credit-account').value;
      const creditAmt = Number(document.getElementById('journal-credit-amount').value);

      // Check balance
      if (debitAmt !== creditAmt) {
        if (window.SoundFX) window.SoundFX.playError();
        this.showToast("Jurnal tidak seimbang! Nominal Debet harus sama dengan nominal Kredit.", "error");
        return;
      }

      const isAccountCorrect = debitAcc === currentEx.correctDebitAccount && creditAcc === currentEx.correctCreditAccount;
      const isAmountCorrect = debitAmt === currentEx.correctDebitAmount && creditAmt === currentEx.correctCreditAmount;
      const isCorrect = isAccountCorrect && isAmountCorrect;

      this.state.journalRunner = {
        exerciseId: currentEx.id,
        isCorrect: isCorrect,
        score: isCorrect ? 100 : (debitAmt === currentEx.correctDebitAmount ? 60 : 30)
      };

      if (isCorrect) {
        if (window.SoundFX) window.SoundFX.playSuccess();
        this.triggerConfetti();
        this.showToast("Luar biasa! Jurnal Anda benar dan seimbang secara akuntansi!", "success");

        // Record simulation to student profile
        const s = this.state.activeStudent;
        s.journalSimulations = s.journalSimulations || [];
        const existingSim = s.journalSimulations.find(j => j.id === currentEx.id);
        if (!existingSim) {
          s.journalSimulations.push({
            id: currentEx.id,
            title: currentEx.title,
            score: 100,
            completed: true
          });
        }
      } else {
        if (window.SoundFX) window.SoundFX.playError();
        this.showToast("Masih ada kesalahan pada penempatan akun atau nominal. Periksa kunci jawaban di bawah.", "error");
      }

      this.saveState();
      this.render();
    },

    // Task Management
    handleSubmitTask: function (event, taskId) {
      event.preventDefault();
      const text = document.getElementById(`task-submission-text-${taskId}`).value;
      const s = this.state.activeStudent;

      const task = this.state.tasks.find(t => t.id === taskId);
      if (!task) return;

      // Add submission
      task.submissions.push({
        studentId: s.id,
        studentName: s.name,
        submittedAt: new Date().toLocaleString('id-ID'),
        content: text,
        fileAttachment: window.lastSelectedFileName || null,
        score: undefined,
        feedback: null
      });

      window.lastSelectedFileName = null;
      if (window.SoundFX) window.SoundFX.playSuccess();
      this.showToast("Tugas Anda berhasil dikirim ke guru! Menunggu penilaian.", "success");
      this.saveState();
      this.render();
    },

    handleFileSelect: function (input, taskId) {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        window.lastSelectedFileName = file.name;
        const label = document.getElementById(`file-chosen-${taskId}`);
        if (label) {
          label.innerHTML = `<span class="text-indigo-600 font-bold"><i class="fa-solid fa-file-check mr-1"></i>${file.name}</span>`;
        }
      }
    },

    handleGradeSubmission: function (event, taskId, studentId) {
      event.preventDefault();
      const task = this.state.tasks.find(t => t.id === taskId);
      if (!task) return;

      const sub = task.submissions.find(s => s.studentId === studentId);
      if (!sub) return;

      const form = event.target;
      const score = Number(form.querySelector('input[type="number"]').value);
      const feedback = form.querySelector('input[type="text"]').value;

      sub.score = score;
      sub.feedback = feedback;
      sub.gradedBy = this.state.currentUser.name;
      sub.gradedAt = new Date().toLocaleString('id-ID');

      if (window.SoundFX) window.SoundFX.playSuccess();
      this.showToast(`Nilai ${score} dan feedback berhasil disimpan untuk ${sub.studentName}!`, "success");
      this.saveState();
      this.render();
    },

    // Announcements & Discussions
    handleCreateAnnouncement: function (event) {
      event.preventDefault();
      const title = document.getElementById('ann-title').value;
      const tag = document.getElementById('ann-tag').value;
      const color = document.getElementById('ann-color').value;
      const content = document.getElementById('ann-content').value;

      this.state.announcements.unshift({
        id: 'ann-' + Date.now(),
        author: this.state.currentUser.name,
        role: "Guru Pengampu",
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        tag: tag,
        tagColor: color,
        title: title,
        content: content
      });

      if (window.SoundFX) window.SoundFX.playSuccess();
      this.showToast("Pengumuman berhasil dipublikasikan ke seluruh siswa!", "success");
      this.closeModal();
      this.saveState();
      this.render();
    },

    handlePostQuestion: function (event) {
      event.preventDefault();
      const topic = document.getElementById('disc-topic').value;
      const question = document.getElementById('disc-question').value;
      const s = this.state.activeStudent;

      this.state.discussions.unshift({
        id: 'disc-' + Date.now(),
        studentName: s.name,
        studentAvatar: s.avatar,
        date: new Date().toLocaleString('id-ID'),
        topic: topic,
        question: question,
        replies: []
      });

      if (window.SoundFX) window.SoundFX.playSuccess();
      this.showToast("Pertanyaan Anda telah diterbitkan di forum kelas!", "success");
      this.saveState();
      this.render();
    },

    handleReplyQuestion: function (event, discId) {
      event.preventDefault();
      const input = event.target.querySelector('input');
      const text = input.value;
      const disc = this.state.discussions.find(d => d.id === discId);
      if (!disc) return;

      const isGuru = this.state.currentUser.role === 'guru';
      disc.replies = disc.replies || [];
      disc.replies.push({
        author: isGuru ? this.state.currentUser.name : this.state.activeStudent.name,
        role: isGuru ? 'Guru' : 'Siswa',
        avatar: isGuru ? this.state.currentUser.avatar : this.state.activeStudent.avatar,
        date: new Date().toLocaleString('id-ID'),
        text: text
      });

      input.value = '';
      if (window.SoundFX) window.SoundFX.playClick();
      this.showToast("Balasan terkirim!", "success");
      this.saveState();
      this.render();
    },

    // Teacher Modals for Add Material / Task
    openAddMaterialModal: function () {
      const modal = document.getElementById('modal-container');
      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-base text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-book-medical text-purple-600"></i> Tambah Bab Materi Baru
              </h3>
              <button onclick="PettyCashApp.closeModal()" class="text-slate-400 hover:text-slate-700 text-lg">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="PettyCashApp.handleCreateMaterial(event)" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Judul Bab</label>
                <input type="text" id="new-mat-title" required placeholder="Contoh: BAB 6 – Analisis Rekonsiliasi Bank & Kas Kecil" class="w-full px-3 py-2 text-xs border rounded-xl focus:ring-2 focus:ring-purple-400">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Sub Judul</label>
                <input type="text" id="new-mat-subtitle" required placeholder="Contoh: Sinkronisasi Laporan Kas Kecil dengan Rekening Koran" class="w-full px-3 py-2 text-xs border rounded-xl focus:ring-2 focus:ring-purple-400">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Rangkuman Materi</label>
                <textarea id="new-mat-summary" required rows="3" placeholder="Tuliskan rangkuman materi ringkas..." class="w-full px-3 py-2 text-xs border rounded-xl focus:ring-2 focus:ring-purple-400"></textarea>
              </div>
              <div class="pt-2 flex justify-end gap-2">
                <button type="button" onclick="PettyCashApp.closeModal()" class="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl">Batal</button>
                <button type="submit" class="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md">Simpan Materi</button>
              </div>
            </form>
          </div>
        </div>
      `;
    },

    handleCreateMaterial: function (event) {
      event.preventDefault();
      const title = document.getElementById('new-mat-title').value;
      const subtitle = document.getElementById('new-mat-subtitle').value;
      const summary = document.getElementById('new-mat-summary').value;
      const newId = this.state.chapters.length + 1;

      this.state.chapters.push({
        id: newId,
        title: title,
        subtitle: subtitle,
        duration: "45 Menit",
        icon: "fa-book-bookmark",
        color: "blue",
        summary: summary,
        sections: [
          {
            heading: "1. Pendahuluan Materi Baru",
            content: `<p class="text-slate-700 leading-relaxed text-sm">${summary}</p>`
          }
        ]
      });

      if (window.SoundFX) window.SoundFX.playSuccess();
      this.showToast(`Bab materi baru berhasil ditambahkan!`, 'success');
      this.closeModal();
      this.saveState();
      this.render();
    },

    openAddTaskModal: function () {
      const modal = document.getElementById('modal-container');
      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-base text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-file-circle-plus text-indigo-600"></i> Buat Tugas Baru untuk Siswa
              </h3>
              <button onclick="PettyCashApp.closeModal()" class="text-slate-400 hover:text-slate-700 text-lg">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onsubmit="PettyCashApp.handleCreateTask(event)" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Judul Tugas</label>
                <input type="text" id="new-task-title" required placeholder="Contoh: Praktik Siklus Kas Kecil Perusahaan Manufaktur" class="w-full px-3 py-2 text-xs border rounded-xl">
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Referensi Bab</label>
                  <input type="text" id="new-task-ref" required placeholder="Contoh: Bab 3 & 4" class="w-full px-3 py-2 text-xs border rounded-xl">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Batas Waktu (Deadline)</label>
                  <input type="text" id="new-task-deadline" required placeholder="Contoh: 2024-12-01 23:59" class="w-full px-3 py-2 text-xs border rounded-xl">
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Instruksi Tugas</label>
                <textarea id="new-task-desc" required rows="3" placeholder="Tulis instruksi pengerjaan tugas secara rinci..." class="w-full px-3 py-2 text-xs border rounded-xl"></textarea>
              </div>
              <div class="pt-2 flex justify-end gap-2">
                <button type="button" onclick="PettyCashApp.closeModal()" class="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl">Batal</button>
                <button type="submit" class="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md">Terbitkan Tugas</button>
              </div>
            </form>
          </div>
        </div>
      `;
    },

    handleCreateTask: function (event) {
      event.preventDefault();
      const title = document.getElementById('new-task-title').value;
      const ref = document.getElementById('new-task-ref').value;
      const deadline = document.getElementById('new-task-deadline').value;
      const desc = document.getElementById('new-task-desc').value;

      this.state.tasks.push({
        id: 'task-' + Date.now(),
        title: title,
        chapterRef: ref,
        deadline: deadline,
        description: desc,
        status: 'open',
        submissions: []
      });

      if (window.SoundFX) window.SoundFX.playSuccess();
      this.showToast("Tugas baru berhasil diterbitkan untuk siswa!", "success");
      this.closeModal();
      this.saveState();
      this.render();
    },

    openAddAnnouncementModal: function () {
      const modal = document.getElementById('modal-container');
      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-base text-slate-800">Buat Pengumuman Baru</h3>
              <button onclick="PettyCashApp.closeModal()" class="text-slate-400 hover:text-slate-700 text-lg">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onsubmit="PettyCashApp.handleCreateAnnouncement(event)" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Judul</label>
                <input type="text" id="ann-title" required class="w-full px-3 py-2 text-xs border rounded-xl">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Tag</label>
                <select id="ann-tag" class="w-full px-3 py-2 text-xs border rounded-xl">
                  <option value="Penting">Penting</option>
                  <option value="Materi Baru">Materi Baru</option>
                  <option value="Info Ujian">Info Ujian</option>
                </select>
                <input type="hidden" id="ann-color" value="rose">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Isi Pesan</label>
                <textarea id="ann-content" required rows="3" class="w-full px-3 py-2 text-xs border rounded-xl"></textarea>
              </div>
              <div class="pt-2 flex justify-end gap-2">
                <button type="button" onclick="PettyCashApp.closeModal()" class="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl">Batal</button>
                <button type="submit" class="px-5 py-2 text-xs font-bold text-white bg-purple-600 rounded-xl shadow-md">Publikasikan</button>
              </div>
            </form>
          </div>
        </div>
      `;
    },

    // Login / Switch Modal
    openLoginModal: function () {
      const modal = document.getElementById('modal-container');
      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-black text-lg text-slate-800">Pilih Akun Masuk (Demo)</h3>
                <p class="text-xs text-slate-500">Pilih peran untuk mencoba fitur guru atau siswa.</p>
              </div>
              <button onclick="PettyCashApp.closeModal()" class="text-slate-400 hover:text-slate-700 text-lg">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Role Cards -->
            <div class="space-y-3">
              <!-- Siswa Card -->
              <div onclick="PettyCashApp.switchRole('siswa')" class="p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="${this.state.users.siswaList[0].avatar}" class="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500">
                  <div>
                    <span class="px-2 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">AKUN SISWA</span>
                    <h4 class="font-bold text-sm text-slate-800">${this.state.users.siswaList[0].name}</h4>
                    <p class="text-xs text-slate-500">${this.state.users.siswaList[0].kelas} • NIS: ${this.state.users.siswaList[0].nis}</p>
                  </div>
                </div>
                <i class="fa-solid fa-chevron-right text-slate-300 text-sm"></i>
              </div>

              <!-- Guru Card -->
              <div onclick="PettyCashApp.switchRole('guru')" class="p-4 rounded-2xl border-2 border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 cursor-pointer transition flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="${this.state.users.guru.avatar}" class="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500">
                  <div>
                    <span class="px-2 py-0.2 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">AKUN GURU</span>
                    <h4 class="font-bold text-sm text-slate-800">${this.state.users.guru.name}</h4>
                    <p class="text-xs text-slate-500">NIP: ${this.state.users.guru.nip}</p>
                  </div>
                </div>
                <i class="fa-solid fa-chevron-right text-slate-300 text-sm"></i>
              </div>
            </div>

            <div class="pt-2 text-center">
              <button onclick="PettyCashApp.closeModal()" class="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800">
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      `;
    },

    openProfileModal: function () {
      const isGuru = this.state.currentUser.role === 'guru';
      const u = isGuru ? this.state.currentUser : this.state.activeStudent;
      const modal = document.getElementById('modal-container');

      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-base text-slate-800">Profil Pengguna</h3>
              <button onclick="PettyCashApp.closeModal()" class="text-slate-400 hover:text-slate-700 text-lg">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="flex items-center gap-4">
              <img src="${u.avatar}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-400">
              <div>
                <span class="px-2 py-0.2 rounded font-bold text-[10px] ${isGuru ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">${isGuru ? 'Guru Pengampu' : 'Peserta Didik'}</span>
                <h4 class="font-bold text-base text-slate-800 mt-1">${u.name}</h4>
                <p class="text-xs text-slate-500">${isGuru ? 'NIP: ' + u.nip : 'NIS: ' + u.nis + ' • ' + u.kelas}</p>
              </div>
            </div>

            <div class="p-3 bg-slate-50 rounded-xl border text-xs space-y-1 text-slate-600">
              <p><strong>Platform:</strong> LMS PETTY CASH LEARNING</p>
              <p><strong>Status Belajar:</strong> Aktif & Terdaftar</p>
            </div>

            <div class="pt-2 space-y-2">
              <button onclick="PettyCashApp.switchRole(PettyCashApp.state.currentUser.role === 'guru' ? 'siswa' : 'guru')" class="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs rounded-xl shadow-md">
                Beralih ke Peran ${isGuru ? 'Siswa' : 'Guru'}
              </button>
              <button onclick="PettyCashApp.closeModal()" class="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800">
                Tutup
              </button>
            </div>
          </div>
        </div>
      `;
    },

    openGuideModal: function () {
      const modal = document.getElementById('modal-container');
      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                <i class="fa-regular fa-circle-question text-blue-600"></i> Panduan Penggunaan LMS Kas Kecil
              </h3>
              <button onclick="PettyCashApp.closeModal()" class="text-slate-400 hover:text-slate-700 text-lg">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div class="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <h4 class="font-bold text-blue-900 mb-1">1. Alur Belajar Siswa</h4>
                <p>Buka menu <strong>Materi</strong> untuk membaca konsep Bab 1 sampai 5. Tonton video pada menu <strong>Video</strong>, lalu uji kemampuan Anda pada <strong>Kuis Interaktif</strong> dan <strong>Latihan Jurnal</strong>.</p>
              </div>

              <div class="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <h4 class="font-bold text-purple-900 mb-1">2. Alur Pengelolaan Guru</h4>
                <p>Klik tombol <strong>"Guru"</strong> di navbar atas untuk masuk sebagai guru. Anda dapat memeriksa kiriman tugas siswa, memberi nilai dan feedback, membuat tugas baru, serta membuat materi dan pengumuman.</p>
              </div>

              <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 class="font-bold text-emerald-900 mb-1">3. Fitur Simulasi Jurnal</h4>
                <p>Pilih salah satu skenario transaksi kas kecil, pilih akun Debet & Kredit beserta nominalnya. Sistem otomatis memvalidasi apakah jurnal seimbang dan benar sesuai standar SAK.</p>
              </div>
            </div>

            <div class="pt-2 text-right">
              <button onclick="PettyCashApp.closeModal()" class="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md">
                Mengerti
              </button>
            </div>
          </div>
        </div>
      `;
    },

    openTaskModal: function (taskId) {
      this.navigate('tasks');
    },

    viewStudentDetail: function (studentId) {
      const student = this.state.users.siswaList.find(s => s.id === studentId);
      if (!student) return;

      const modal = document.getElementById('modal-container');
      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-bold text-base text-slate-800">Buku Rapor Siswa: ${student.name}</h3>
              <button onclick="PettyCashApp.closeModal()" class="text-slate-400 hover:text-slate-700 text-lg">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="flex items-center gap-3">
              <img src="${student.avatar}" class="w-14 h-14 rounded-2xl object-cover">
              <div>
                <h4 class="font-bold text-sm text-slate-800">${student.name}</h4>
                <p class="text-xs text-slate-500">NIS: ${student.nis} • Kelas: ${student.kelas}</p>
                <p class="text-xs font-bold text-purple-700 mt-0.5">Progres Belajar: ${student.progressPercent}%</p>
              </div>
            </div>

            <div class="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-2 text-xs">
              <p class="font-bold text-slate-800">Daftar Nilai Kuis:</p>
              ${(student.quizHistory || []).map(q => `
                <div class="flex justify-between border-b border-slate-200 pb-1">
                  <span>${q.title}</span>
                  <span class="font-bold text-emerald-700">${q.score} / 100</span>
                </div>
              `).join('')}
            </div>

            <div class="flex justify-end pt-2">
              <button onclick="PettyCashApp.closeModal()" class="px-5 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-md">
                Tutup Rapor
              </button>
            </div>
          </div>
        </div>
      `;
    },

    downloadReport: function () {
      if (window.SoundFX) window.SoundFX.playSuccess();
      const s = this.state.activeStudent;
      const reportText = `
=====================================================
LAPORAN HASIL EVALUASI PEMBELAJARAN KAS KECIL
LMS PETTY CASH LEARNING - AKUNTANSI KEUANGAN
=====================================================
Nama Siswa     : ${s.name}
NIS            : ${s.nis}
Kelas          : ${s.kelas}
Tingkat        : SMK / MA Akuntansi
Tahun Ajaran   : 2024/2025

1. CAPAIAN MATERI
- Modul Terselesaikan : ${(s.completedChapters || []).length} / 5 Bab (${s.progressPercent}%)
- Video Ditonton      : ${(s.completedVideos || []).length} / 1 Video

2. REKAPITULASI NILAI KUIS & EVALUASI
- Nilai Kuis Terakhir : ${s.lastQuizScore || 90} / 100
- Status Kompetensi   : KOMPETEN (SANGAT MEMUASKAN)

3. LENCANA PENGHARGAAN:
${(s.badges || []).map(b => '- ' + b).join('\n')}

Dicetak otomatis pada: ${new Date().toLocaleString('id-ID')}
Guru Pengampu: Dra. Hj. Nurjanah, M.Pd.
=====================================================
      `.trim();

      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Rapor_KasKecil_${s.name.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.showToast("Ringkasan rapor berhasil diunduh!", "success");
    },

    filterStudentList: function (query) {
      const q = (query || '').toLowerCase();
      const rows = document.querySelectorAll('#teacher-student-table tbody tr');
      rows.forEach(r => {
        const text = r.innerText.toLowerCase();
        r.style.display = text.includes(q) ? '' : 'none';
      });
    },

    resetDemoData: function () {
      if (confirm("Apakah Anda yakin ingin mengembalikan seluruh data simulasi, tugas, dan nilai ke setelan bawaan awal?")) {
        localStorage.removeItem(STORAGE_KEY);
        this.state = loadInitialState();
        if (window.SoundFX) window.SoundFX.playSuccess();
        this.showToast("Data demo berhasil direset ke kondisi awal!", "success");
        this.render();
      }
    },

    // ==========================================
    // INTERACTIVE ENHANCEMENTS & MODALS
    // ==========================================

    // 1. Voucher Generator (Bukti Pengeluaran Kas Kecil - BPKK)
    openVoucherModal: function () {
      if (window.SoundFX) window.SoundFX.playClick();
      const s = this.state.activeStudent;
      const modal = document.getElementById('modal-container');
      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-black text-lg text-slate-800 flex items-center gap-2">
                  <i class="fa-solid fa-receipt text-blue-600"></i> Simulator Bukti Pengeluaran Kas Kecil (BPKK)
                </h3>
                <p class="text-xs text-slate-500">Format dokumen resmi transaksi kas kecil sesuai standar tata kelola kantor.</p>
              </div>
              <button onclick="PettyCashApp.closeModal()" class="text-slate-400 hover:text-slate-700 text-lg">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Interactive Inputs to Customize Voucher -->
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Nomor Dokumen</label>
                <input type="text" id="v-no" value="BPKK-082/X/2024" oninput="PettyCashApp.updateVoucherPreview()" class="w-full px-3 py-1.5 border rounded-lg font-mono">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Tanggal Transaksi</label>
                <input type="text" id="v-date" value="18 Oktober 2024" oninput="PettyCashApp.updateVoucherPreview()" class="w-full px-3 py-1.5 border rounded-lg">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Dibayarkan Kepada</label>
                <input type="text" id="v-to" value="Toko Karisma ATK" oninput="PettyCashApp.updateVoucherPreview()" class="w-full px-3 py-1.5 border rounded-lg">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Jumlah Uang (Rp)</label>
                <input type="number" id="v-amount" value="275000" oninput="PettyCashApp.updateVoucherPreview()" class="w-full px-3 py-1.5 border rounded-lg font-bold">
              </div>
              <div class="sm:col-span-2">
                <label class="block font-bold text-slate-700 mb-1">Untuk Keperluan / Uraian</label>
                <input type="text" id="v-for" value="Pembelian Kertas HVS A4 70gr (3 rim) dan Tinta Printer Hitam" oninput="PettyCashApp.updateVoucherPreview()" class="w-full px-3 py-1.5 border rounded-lg">
              </div>
            </div>

            <!-- Realistic Accounting Voucher Paper (Printable) -->
            <div id="printable-voucher" class="voucher-paper p-6 rounded-2xl border-2 border-slate-700 space-y-4">
              <!-- Header -->
              <div class="flex items-center justify-between border-b-2 border-slate-800 pb-3">
                <div>
                  <h4 class="font-black text-sm text-slate-900 tracking-wider">PT MAJU JAYA MAKMUR</h4>
                  <p class="text-[10px] text-slate-600">Jl. Sudirman No. 45, Jakarta Pusat • Telp: (021) 555-8899</p>
                </div>
                <div class="text-right">
                  <span class="inline-block px-3 py-1 bg-slate-900 text-white font-extrabold text-xs rounded tracking-widest uppercase">BPKK</span>
                  <p id="pv-no" class="font-mono text-[11px] font-bold text-slate-700 mt-1">No: BPKK-082/X/2024</p>
                </div>
              </div>

              <!-- Body Details -->
              <div class="text-xs space-y-2 text-slate-800">
                <div class="grid grid-cols-12 gap-2">
                  <span class="col-span-3 font-bold">Tanggal</span>
                  <span class="col-span-9" id="pv-date">: 18 Oktober 2024</span>
                </div>
                <div class="grid grid-cols-12 gap-2">
                  <span class="col-span-3 font-bold">Dibayarkan Kepada</span>
                  <span class="col-span-9" id="pv-to">: Toko Karisma ATK</span>
                </div>
                <div class="grid grid-cols-12 gap-2">
                  <span class="col-span-3 font-bold">Uraian Keperluan</span>
                  <span class="col-span-9 font-medium" id="pv-for">: Pembelian Kertas HVS A4 70gr (3 rim) dan Tinta Printer Hitam</span>
                </div>
                <div class="grid grid-cols-12 gap-2">
                  <span class="col-span-3 font-bold">Jumlah Pembayaran</span>
                  <span class="col-span-9 font-mono font-black text-sm text-blue-700" id="pv-amount">: Rp 275.000,-</span>
                </div>
                <div class="grid grid-cols-12 gap-2">
                  <span class="col-span-3 font-bold">Terbilang</span>
                  <span class="col-span-9 italic text-slate-600" id="pv-words">: (Dua Ratus Tujuh Puluh Lima Ribu Rupiah)</span>
                </div>
              </div>

              <!-- Signature Boxes -->
              <div class="grid grid-cols-3 gap-3 pt-4 border-t border-slate-300 text-center text-[10px]">
                <div class="space-y-8">
                  <p class="font-bold">Disetujui Oleh,</p>
                  <div>
                    <p class="font-bold underline text-slate-900">Dra. Hj. Nurjanah, M.Pd.</p>
                    <p class="text-slate-500">Kabag. Keuangan</p>
                  </div>
                </div>
                <div class="space-y-8 relative">
                  <p class="font-bold">Dibayarkan Oleh,</p>
                  <div class="voucher-stamp absolute inset-x-0 top-3 text-[12px] py-1 border-2">LUNAS</div>
                  <div>
                    <p class="font-bold underline text-slate-900">${s.name}</p>
                    <p class="text-slate-500">Kasir Kas Kecil</p>
                  </div>
                </div>
                <div class="space-y-8">
                  <p class="font-bold">Diterima Oleh,</p>
                  <div>
                    <p class="font-bold underline text-slate-900">Hendra Wijaya</p>
                    <p class="text-slate-500">Penerima Kas</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-2">
              <span class="text-xs text-slate-500 italic">*Dapat dicetak untuk lampiran tugas akuntansi fisik.</span>
              <div class="flex items-center gap-2">
                <button onclick="window.print()" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2">
                  <i class="fa-solid fa-print"></i> Cetak Dokumen BPKK
                </button>
                <button onclick="PettyCashApp.closeModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    updateVoucherPreview: function () {
      const no = document.getElementById('v-no').value;
      const date = document.getElementById('v-date').value;
      const to = document.getElementById('v-to').value;
      const amount = Number(document.getElementById('v-amount').value || 0);
      const forReason = document.getElementById('v-for').value;

      document.getElementById('pv-no').innerText = 'No: ' + no;
      document.getElementById('pv-date').innerText = ': ' + date;
      document.getElementById('pv-to').innerText = ': ' + to;
      document.getElementById('pv-amount').innerText = ': Rp ' + amount.toLocaleString('id-ID') + ',-';
      document.getElementById('pv-for').innerText = ': ' + forReason;
    },

    // 2. Interactive Buku Kas Kecil (Petty Cash Subsidiary Ledger Modal)
    openPettyCashBookModal: function (method = 'imprest') {
      if (window.SoundFX) window.SoundFX.playClick();
      const modal = document.getElementById('modal-container');
      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 class="font-black text-lg text-slate-800 flex items-center gap-2">
                  <i class="fa-solid fa-table-columns text-purple-600"></i> Buku Kas Kecil (Format Kolom Pembantu)
                </h3>
                <p class="text-xs text-slate-500">Mencatat mutasi fisik dan pengelompokan beban kas kecil harian.</p>
              </div>
              <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button onclick="PettyCashApp.openPettyCashBookModal('imprest')" class="px-3 py-1 text-xs font-bold rounded-lg ${method === 'imprest' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}">
                  Sistem Dana Tetap (Imprest)
                </button>
                <button onclick="PettyCashApp.openPettyCashBookModal('fluctuating')" class="px-3 py-1 text-xs font-bold rounded-lg ${method === 'fluctuating' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600'}">
                  Sistem Fluktuasi
                </button>
              </div>
            </div>

            <!-- Explanatory Banner -->
            <div class="p-3.5 rounded-xl text-xs flex items-center gap-3 ${method === 'imprest' ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'bg-purple-50 text-purple-900 border border-purple-200'}">
              <i class="fa-solid fa-circle-info text-base"></i>
              <span><strong>Karakteristik ${method === 'imprest' ? 'Metode Imprest' : 'Metode Fluktuasi'}:</strong> ${method === 'imprest' ? 'Kolom pengeluaran hanya sebagai memo intern kasir. Jurnal buku besar baru dibuat saat pengisian kembali sebesar total beban (Rp 1.150.000).' : 'Setiap baris transaksi pengeluaran langsung didebet ke akun beban dan dikredit ke Kas Kecil.'}</span>
            </div>

            <!-- Ledger Table -->
            <div class="overflow-x-auto border border-slate-200 rounded-2xl">
              <table class="ledger-table text-xs text-center">
                <thead>
                  <tr>
                    <th rowspan="2">Tgl</th>
                    <th rowspan="2">No. Bukti</th>
                    <th rowspan="2">Keterangan</th>
                    <th rowspan="2" class="text-emerald-700">Penerimaan (Rp)</th>
                    <th rowspan="2" class="text-rose-700">Pengeluaran (Rp)</th>
                    <th colspan="4" class="text-purple-700">Akun Pengeluaran Yang Didebet</th>
                    <th rowspan="2">Saldo Akhir</th>
                  </tr>
                  <tr>
                    <th>Beban ATK</th>
                    <th>Konsumsi</th>
                    <th>Transport</th>
                    <th>Rupa-Rupa</th>
                  </tr>
                </thead>
                <tbody class="text-slate-700 font-mono">
                  <tr class="bg-blue-50/40 font-bold">
                    <td>01 Okt</td>
                    <td>CK-101</td>
                    <td class="text-left font-sans">Pembentukan Dana Kas Kecil</td>
                    <td class="text-emerald-700">5.000.000</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td class="text-blue-800 font-bold">5.000.000</td>
                  </tr>
                  <tr>
                    <td>05 Okt</td>
                    <td>BPKK-01</td>
                    <td class="text-left font-sans">Beli Kertas HVS & Map</td>
                    <td>-</td>
                    <td class="text-rose-700">250.000</td>
                    <td>250.000</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>${method === 'imprest' ? '5.000.000*' : '4.750.000'}</td>
                  </tr>
                  <tr>
                    <td>11 Okt</td>
                    <td>BPKK-02</td>
                    <td class="text-left font-sans">Snack Rapat Tamu Direksi</td>
                    <td>-</td>
                    <td class="text-rose-700">350.000</td>
                    <td>-</td>
                    <td>350.000</td>
                    <td>-</td>
                    <td>-</td>
                    <td>${method === 'imprest' ? '5.000.000*' : '4.400.000'}</td>
                  </tr>
                  <tr>
                    <td>19 Okt</td>
                    <td>BPKK-03</td>
                    <td class="text-left font-sans">Ongkos Kurir Dokumen Kilat</td>
                    <td>-</td>
                    <td class="text-rose-700">150.000</td>
                    <td>-</td>
                    <td>-</td>
                    <td>150.000</td>
                    <td>-</td>
                    <td>${method === 'imprest' ? '5.000.000*' : '4.250.000'}</td>
                  </tr>
                  <tr>
                    <td>27 Okt</td>
                    <td>BPKK-04</td>
                    <td class="text-left font-sans">Beli Pengharum & Pembersih</td>
                    <td>-</td>
                    <td class="text-rose-700">400.000</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>400.000</td>
                    <td>${method === 'imprest' ? '5.000.000*' : '3.850.000'}</td>
                  </tr>
                  <tr class="bg-slate-100 font-bold border-t-2 border-slate-400">
                    <td colspan="3" class="text-right font-sans">Total Mutasi Pengeluaran</td>
                    <td class="text-emerald-700">5.000.000</td>
                    <td class="text-rose-700">1.150.000</td>
                    <td>250.000</td>
                    <td>350.000</td>
                    <td>150.000</td>
                    <td>400.000</td>
                    <td class="text-blue-800">${method === 'imprest' ? '5.000.000' : '3.850.000'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex items-center justify-between pt-2">
              <span class="text-xs text-slate-500 italic">*Pada sistem Imprest, saldo buku besar tetap Rp 5.000.000 (sisa fisik kas Rp 3.850.000 + bukti nota Rp 1.150.000).</span>
              <button onclick="PettyCashApp.closeModal()" class="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md">
                Tutup Buku Pembantu
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // 3. Official Certificate of Competency Modal
    openCertificateModal: function () {
      if (window.SoundFX) window.SoundFX.playFanfare();
      this.triggerConfetti();
      const s = this.state.activeStudent;
      const modal = document.getElementById('modal-container');
      modal.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn max-h-[95vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-black text-lg text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-award text-amber-500"></i> Sertifikat Kelulusan Resmi Kas Kecil
              </h3>
              <button onclick="PettyCashApp.closeModal()" class="text-slate-400 hover:text-slate-700 text-lg">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <!-- Formal Certificate Frame -->
            <div id="printable-cert" class="cert-border p-8 rounded-2xl text-center space-y-4 shadow-inner">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center text-3xl mx-auto shadow-md">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>

              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-purple-700">SERTIFIKAT KOMPETENSI PEMBELAJARAN</p>
                <p class="text-[11px] text-slate-500 mt-0.5">No. Reg: 2024/AKL/LMS-PKC/${s.nis}</p>
              </div>

              <p class="text-xs text-slate-600">Diberikan dengan hormat kepada:</p>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-900 border-b-2 border-slate-300 pb-2 max-w-md mx-auto">${s.name}</h2>
              <p class="text-xs font-bold text-slate-700">NIS: ${s.nis} • Kelas: ${s.kelas}</p>

              <p class="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed pt-2">
                Dinyatakan <strong>KOMPETEN</strong> dalam penguasaan materi, simulasi jurnal, dan evaluasi akuntansi pada modul:
              </p>

              <div class="p-3 bg-purple-50 rounded-xl border border-purple-200 inline-block px-6">
                <p class="text-sm font-extrabold text-purple-900">PENGELOLAAN & PENJURNALAN KAS KECIL (PETTY CASH)</p>
                <p class="text-xs font-bold text-emerald-700 mt-0.5">Predikat: SANGAT MEMUASKAN (Nilai: ${s.lastQuizScore || 95}/100)</p>
              </div>

              <!-- Signatures & Seal -->
              <div class="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200 text-xs">
                <div class="text-left space-y-1">
                  <p class="text-[11px] text-slate-500">Verifikasi Digital:</p>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200 text-[10px]">
                    <i class="fa-solid fa-shield-check"></i> TERVERIFIKASI SAH
                  </span>
                  <p class="text-[10px] text-slate-400 mt-1">Dicetak otomatis dari Platform LMS</p>
                </div>
                <div class="text-right space-y-1">
                  <p class="text-[11px] text-slate-600">Jakarta, ${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  <p class="text-[11px] font-bold text-slate-700">Guru Pembina Akuntansi,</p>
                  <p class="pt-6 font-bold text-slate-900 underline">Dra. Hj. Nurjanah, M.Pd.</p>
                  <p class="text-[10px] text-slate-500">NIP. 198204152008012015</p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-3 pt-2">
              <button onclick="window.print()" class="btn-bounce px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/30 flex items-center gap-2">
                <i class="fa-solid fa-print"></i> Cetak / Simpan Sertifikat (PDF)
              </button>
              <button onclick="PettyCashApp.closeModal()" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                Tutup
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // 4. Petty Cash Audit & Replenishment Calculator
    calculatePettyCashAudit: function (event) {
      event.preventDefault();
      const plafon = Number(document.getElementById('calc-plafon').value || 0);
      const expenses = Number(document.getElementById('calc-expenses').value || 0);
      const physicalCash = Number(document.getElementById('calc-physical').value || 0);

      const expectedPhysical = plafon - expenses;
      const difference = physicalCash - expectedPhysical;

      const resultBox = document.getElementById('calc-result-box');
      if (!resultBox) return;

      let diffText = '';
      let diffClass = '';
      let journalDebit = '';
      let journalCredit = '';

      if (difference === 0) {
        diffText = 'Fisik Uang Sesuai Persis (Tidak Ada Selisih)';
        diffClass = 'bg-emerald-50 text-emerald-900 border-emerald-300';
        journalDebit = '[D] Macam-macam Beban ..... Rp ' + expenses.toLocaleString('id-ID');
        journalCredit = '[K] Kas di Bank ............. Rp ' + expenses.toLocaleString('id-ID');
      } else if (difference < 0) {
        const shortage = Math.abs(difference);
        diffText = 'SELISIH KAS KURANG (Cash Shortage) Sebesar Rp ' + shortage.toLocaleString('id-ID');
        diffClass = 'bg-rose-50 text-rose-900 border-rose-300';
        journalDebit = '[D] Macam-macam Beban ..... Rp ' + expenses.toLocaleString('id-ID') + '<br>[D] Beban Selisih Kas ....... Rp ' + shortage.toLocaleString('id-ID');
        journalCredit = '[K] Kas di Bank ............. Rp ' + (expenses + shortage).toLocaleString('id-ID');
      } else {
        diffText = 'SELISIH KAS LEBIH (Cash Overage) Sebesar Rp ' + difference.toLocaleString('id-ID');
        diffClass = 'bg-amber-50 text-amber-900 border-amber-300';
        journalDebit = '[D] Macam-macam Beban ..... Rp ' + expenses.toLocaleString('id-ID');
        journalCredit = '[K] Pendapatan Selisih Kas .. Rp ' + difference.toLocaleString('id-ID') + '<br>[K] Kas di Bank ............. Rp ' + (expenses - difference).toLocaleString('id-ID');
      }

      resultBox.innerHTML = `
        <div class="p-4 rounded-xl border ${diffClass} space-y-2 animate-fadeIn">
          <div class="flex items-center justify-between font-bold text-xs">
            <span>Hasil Analisis Audit Kas Opname:</span>
            <span class="font-mono">${diffText}</span>
          </div>
          <div class="p-3 bg-white rounded-lg border text-xs font-mono space-y-1">
            <p class="font-sans font-bold text-slate-800">Draf Jurnal Pengisian Kembali Imprest:</p>
            <div class="text-blue-700">${journalDebit}</div>
            <div class="text-purple-700 pl-6">${journalCredit}</div>
          </div>
        </div>
      `;

      if (window.SoundFX) window.SoundFX.playSuccess();
    },

    closeModal: function () {
      const modal = document.getElementById('modal-container');
      if (modal) modal.innerHTML = '';
    },

    showToast: function (message, type = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast-item px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-bold ${type === 'success' ? 'bg-emerald-600 text-white border-emerald-500' :
          type === 'error' ? 'bg-rose-600 text-white border-rose-500' :
            'bg-slate-900 text-white border-slate-700'
        }`;

      const icon = type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info';
      toast.innerHTML = `<i class="fa-solid ${icon} text-base"></i><span>${message}</span>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = 'slide-out 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    },

    triggerConfetti: function () {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  window.PettyCashApp = PettyCashApp;

  // Auto init when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    PettyCashApp.init();
  });
})();