import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private LinkedTheme = document.querySelector('#theme');

  constructor() {
    const tema =
      localStorage.getItem('Theme') || './assets/css/colors/default-dark.css';
    this.LinkedTheme?.setAttribute('href', tema);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.LinkedTheme?.setAttribute('href', url);
    localStorage.setItem('Theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    links.forEach((element) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.LinkedTheme?.getAttribute('href');
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
