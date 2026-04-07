/**
 * ThemeManager.js
 * 시간의 도서관 — 테마(다크/세피아) 전환 및 상태 관리
 */

export class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('app-theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme();
    // Expose explicit setter
    window.setTheme = (name) => this.setTheme(name);
  }

  setTheme(name) {
    this.theme = name;
    localStorage.setItem('app-theme', this.theme);
    this.applyTheme();
    if (window.audio) window.audio.play('click');
  }

  applyTheme() {
    document.body.classList.remove('theme-sepia', 'theme-joseon');
    
    if (this.theme === 'sepia') {
      document.body.classList.add('theme-sepia');
    } else if (this.theme === 'joseon') {
      document.body.classList.add('theme-joseon');
    }
    
    this.updateToggleButtons();
  }

  updateToggleButtons() {
    // Update explicit buttons if present
    document.querySelectorAll('.theme-controls .font-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tbtn-' + this.theme).forEach(btn => btn.classList.add('active'));
  }
}
