// PETTY CASH LEARNING - Interactive Web Audio API Sound Effects
(function () {
  let audioCtx = null;
  let isMuted = localStorage.getItem('pcl_muted') === 'true';

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  const SoundFX = {
    isMuted: function () {
      return isMuted;
    },
    toggleMute: function () {
      isMuted = !isMuted;
      localStorage.setItem('pcl_muted', isMuted);
      return isMuted;
    },
    playClick: function () {
      if (isMuted) return;
      try {
        initAudio();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } catch (e) {
        // audio context blocked or unsupported
      }
    },
    playSuccess: function () {
      if (isMuted) return;
      try {
        initAudio();
        if (!audioCtx) return;
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0.15, audioCtx.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.07 + 0.25);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(audioCtx.currentTime + idx * 0.07);
          osc.stop(audioCtx.currentTime + idx * 0.07 + 0.25);
        });
      } catch (e) {}
    },
    playError: function () {
      if (isMuted) return;
      try {
        initAudio();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.setValueAtTime(180, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } catch (e) {}
    },
    playFanfare: function () {
      if (isMuted) return;
      try {
        initAudio();
        if (!audioCtx) return;
        const arpeggio = [
          { f: 523.25, t: 0.0, d: 0.12 },
          { f: 659.25, t: 0.1, d: 0.12 },
          { f: 783.99, t: 0.2, d: 0.12 },
          { f: 1046.5, t: 0.3, d: 0.35 }
        ];
        arpeggio.forEach(item => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(item.f, audioCtx.currentTime + item.t);
          gain.gain.setValueAtTime(0.2, audioCtx.currentTime + item.t);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + item.t + item.d);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(audioCtx.currentTime + item.t);
          osc.stop(audioCtx.currentTime + item.t + item.d);
        });
      } catch (e) {}
    }
  };

  window.SoundFX = SoundFX;
})();

