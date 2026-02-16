// Theme Management
// --------------------------------->
class ThemeManager {
  constructor() {
    this.themes = [
      { id: "light", name: "Light", primary: "#3d8361", secondary: "#1c6758" },
      { id: "dark", name: "Dark", primary: "#4caf87", secondary: "#2d8e72" },
      { id: "blue", name: "Blue", primary: "#3182ce", secondary: "#2c5aa0" },
      {
        id: "purple",
        name: "Purple",
        primary: "#805ad5",
        secondary: "#6b46c1",
      },
      { id: "red", name: "Red", primary: "#e53e3e", secondary: "#c53030" },
      {
        id: "orange",
        name: "Orange",
        primary: "#ed8936",
        secondary: "#dd6b20",
      },
    ];

    this.currentTheme = "light";
    this.init();
  }

  init() {
    this.loadTheme();
    this.setupEventListeners();
    this.renderThemeDropdown();
    this.applyTheme(this.currentTheme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem("penguinTheme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else if (systemPrefersDark) {
      this.currentTheme = "dark";
    }
  }

  setupEventListeners() {
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
      this.toggleTheme();
    });

    // Theme dropdown
    document
      .getElementById("theme-dropdown-toggle")
      ?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleThemeDropdown();
      });

    document.addEventListener("click", () => {
      this.hideThemeDropdown();
    });

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("penguinTheme")) {
          this.applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  renderThemeDropdown() {
    const dropdown = document.getElementById("theme-dropdown");
    if (!dropdown) return;

    dropdown.innerHTML = `
            <div class="p-4">
                <h3 class="font-semibold mb-3">Choose Theme</h3>
                <div class="space-y-2">
                    ${this.themes
                      .map(
                        (theme) => `
                        <div class="theme-option ${
                          theme.id === this.currentTheme ? "active" : ""
                        }" 
                             data-theme="${theme.id}">
                            <div class="theme-color" style="background-color: ${
                              theme.primary
                            };"></div>
                            <span>${theme.name}</span>
                            ${
                              theme.id === this.currentTheme
                                ? '<i class="fas fa-check ml-auto"></i>'
                                : ""
                            }
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `;

    dropdown.querySelectorAll(".theme-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        const theme = e.currentTarget.dataset.theme;
        this.applyTheme(theme);
        this.hideThemeDropdown();
      });
    });
  }

  applyTheme(themeId) {
    if (!this.themes.find((t) => t.id === themeId)) return;

    this.currentTheme = themeId;
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("penguinTheme", themeId);

    this.updateThemeIcon();
    this.updateThemeDropdown();
    this.dispatchThemeChangeEvent();
  }

  toggleTheme() {
    const currentIndex = this.themes.findIndex(
      (t) => t.id === this.currentTheme,
    );
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.applyTheme(this.themes[nextIndex].id);
  }

  toggleThemeDropdown() {
    const dropdown = document.getElementById("theme-dropdown");
    if (dropdown) {
      dropdown.classList.toggle("show");
    }
  }

  hideThemeDropdown() {
    const dropdown = document.getElementById("theme-dropdown");
    if (dropdown) {
      dropdown.classList.remove("show");
    }
  }

  updateThemeIcon() {
    const themeIcon = document.getElementById("theme-icon");
    if (!themeIcon) return;

    if (this.currentTheme === "dark") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }
  }

  updateThemeDropdown() {
    const options = document.querySelectorAll(".theme-option");
    options.forEach((option) => {
      option.classList.remove("active");
      if (option.dataset.theme === this.currentTheme) {
        option.classList.add("active");

        let checkIcon = option.querySelector(".fa-check");
        if (!checkIcon) {
          checkIcon = document.createElement("i");
          checkIcon.className = "fas fa-check ml-auto";
          option.appendChild(checkIcon);
        }
      } else {
        const checkIcon = option.querySelector(".fa-check");
        if (checkIcon) {
          checkIcon.remove();
        }
      }
    });
  }

  dispatchThemeChangeEvent() {
    window.dispatchEvent(
      new CustomEvent("themeChange", {
        detail: { theme: this.currentTheme },
      }),
    );
  }

  // Public methods:
  // ------------------------>
  getCurrentTheme() {
    return this.currentTheme;
  }

  getThemes() {
    return this.themes;
  }

  updateCSSVariables(primary, secondary) {
    document.documentElement.style.setProperty("--theme-primary", primary);
    document.documentElement.style.setProperty("--theme-secondary", secondary);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.themeManager = new ThemeManager();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = ThemeManager;
}

// Theme End
