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
    
    // 전역 토글 함수 바인딩
    window.toggleTheme = () => this.toggle();
  }

  toggle() {
    this.theme = this.theme === 'dark' ? 'sepia' : 'dark';
    localStorage.setItem('app-theme', this.theme);
    this.applyTheme();
    
    // 오디오 매니저가 있다면 클릭 효과음 재생 (필요 시 외부에서 호출)
    if (window.audio) {
      window.audio.play('click');
    }
  }

  applyTheme() {
    if (this.theme === 'sepia') {
      document.body.classList.add('theme-sepia');
    } else {
      document.body.classList.remove('theme-sepia');
    }
    
    this.updateToggleButtons();
  }

  updateToggleButtons() {
    const btns = document.querySelectorAll('.btn-theme-toggle');
    const icon = this.theme === 'sepia' ? '🌙' : '☀️';
    const text = this.theme === 'sepia' ? ' 다크 모드로' : ' 세피아 모드로';
    
    btns.forEach(btn => {
      btn.innerHTML = `<span>${icon}</span>${text}`;
    });
  }
}
