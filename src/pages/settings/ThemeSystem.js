class ThemeSystem {
  constructor() {
    this.theme = localStorage.getItem("theme-system") || "light";
    this.applyTheme();
  }

  setTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    this.applyTheme();
  }

  applyTheme() {
    document.documentElement.setAttribute("theme-system", this.theme);
    localStorage.setItem("theme-system", this.theme);
  }

  changeTheme(mainContainer) {
    mainContainer.querySelector("#toggleTheme").addEventListener("click", () => {
      this.setTheme();
    });
  }
}

export default new ThemeSystem();