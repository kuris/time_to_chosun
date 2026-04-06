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
    if (this.theme === 'dark') this.theme = 'joseon';
    else if (this.theme === 'joseon') this.theme = 'sepia';
    else this.theme = 'dark';

    localStorage.setItem('app-theme', this.theme);
    this.applyTheme();
    
    // 오디오 매니저가 있다면 클릭 효과음 재생
    if (window.audio) {
      window.audio.play('click');
    }
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
    const btns = document.querySelectorAll('.btn-theme-toggle');
    let icon = '🌙';
    let text = ' 다크 모드로';

    if (this.theme === 'dark') {
      icon = '🏮';
      text = ' 조선 테마로';
    } else if (this.theme === 'joseon') {
      icon = '📜';
      text = ' 세피아 모드로';
    }
    
    btns.forEach(btn => {
      btn.innerHTML = `<span>${icon}</span>${text}`;
    });
  }
}
