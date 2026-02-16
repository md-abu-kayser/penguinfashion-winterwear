// JS Auth Start
// ------------------------------------------------>
// Authentication
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.init();
  }

  init() {
    this.loadUser();
    this.setupEventListeners();
  }

  loadUser() {
    const userData = localStorage.getItem("penguinUser");
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.isAuthenticated = true;
      this.updateUI();
    }
  }

  setupEventListeners() {
    document
      .getElementById("signin-form")
      ?.addEventListener("submit", (e) => this.handleSignIn(e));
    document
      .getElementById("signup-form")
      ?.addEventListener("submit", (e) => this.handleSignUp(e));

    document.querySelectorAll(".social-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const provider = e.currentTarget.dataset.provider;
        this.handleSocialLogin(provider);
      });
    });

    // Logout
    document
      .getElementById("logout-btn")
      ?.addEventListener("click", () => this.handleLogout());
  }

  async handleSignIn(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const remember = formData.get("remember");

    try {
      if (!this.validateEmail(email)) {
        this.showError("signin-email", "Please enter a valid email address");
        return;
      }

      if (!password) {
        this.showError("signin-password", "Please enter your password");
        return;
      }

      await this.simulateAPICall(1000);
      const users = JSON.parse(localStorage.getItem("penguinUsers") || "[]");
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        this.currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        };
        this.isAuthenticated = true;

        if (remember) {
          localStorage.setItem("penguinUser", JSON.stringify(this.currentUser));
        } else {
          sessionStorage.setItem(
            "penguinUser",
            JSON.stringify(this.currentUser),
          );
        }

        this.updateUI();
        this.showSuccess("Successfully signed in!");
        this.closeAuthModal();

        window.dispatchEvent(
          new CustomEvent("authChange", {
            detail: { user: this.currentUser, action: "signin" },
          }),
        );
      } else {
        this.showError("signin-password", "Invalid email or password");
      }
    } catch (error) {
      this.showError("signin-email", "An error occurred. Please try again.");
    }
  }

  async handleSignUp(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const terms = formData.get("terms");

    try {
      if (!name) {
        this.showError("signup-name", "Please enter your name");
        return;
      }

      if (!this.validateEmail(email)) {
        this.showError("signup-email", "Please enter a valid email address");
        return;
      }

      if (!this.validatePassword(password)) {
        this.showError(
          "signup-password",
          "Password must be at least 8 characters with letters and numbers",
        );
        return;
      }

      if (password !== confirmPassword) {
        this.showError("signup-confirmPassword", "Passwords do not match");
        return;
      }

      if (!terms) {
        this.showError(
          "signup-terms",
          "Please accept the terms and conditions",
        );
        return;
      }
      const users = JSON.parse(localStorage.getItem("penguinUsers") || "[]");
      if (users.find((u) => u.email === email)) {
        this.showError(
          "signup-email",
          "An account with this email already exists",
        );
        return;
      }

      await this.simulateAPICall(1500);

      const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        avatar: this.generateAvatar(name),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("penguinUsers", JSON.stringify(users));

      // Auto Sign In
      this.currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      };
      this.isAuthenticated = true;

      localStorage.setItem("penguinUser", JSON.stringify(this.currentUser));
      this.updateUI();
      this.showSuccess("Account created successfully!");
      this.closeAuthModal();

      window.dispatchEvent(
        new CustomEvent("authChange", {
          detail: { user: this.currentUser, action: "signup" },
        }),
      );
    } catch (error) {
      this.showError("signup-email", "An error occurred. Please try again.");
    }
  }

  async handleSocialLogin(provider) {
    try {
      await this.simulateAPICall(2000);

      this.currentUser = {
        id: Date.now(),
        name: `User from ${provider}`,
        email: `user@${provider}.com`,
        avatar: this.generateAvatar(`User ${provider}`),
      };
      this.isAuthenticated = true;

      localStorage.setItem("penguinUser", JSON.stringify(this.currentUser));
      this.updateUI();
      this.showSuccess(`Signed in with ${provider}`);
      this.closeAuthModal();

      window.dispatchEvent(
        new CustomEvent("authChange", {
          detail: { user: this.currentUser, action: "socialLogin" },
        }),
      );
    } catch (error) {
      this.showError("auth-modal", `Failed to sign in with ${provider}`);
    }
  }

  handleLogout() {
    this.currentUser = null;
    this.isAuthenticated = false;

    localStorage.removeItem("penguinUser");
    sessionStorage.removeItem("penguinUser");

    this.updateUI();
    this.showSuccess("Successfully signed out!");

    window.dispatchEvent(
      new CustomEvent("authChange", {
        detail: { user: null, action: "logout" },
      }),
    );
  }

  updateUI() {
    const authButtons = document.querySelectorAll(".auth-btn");
    const userElements = document.querySelectorAll(".user-element");
    const guestElements = document.querySelectorAll(".guest-element");

    if (this.isAuthenticated && this.currentUser) {
      document.querySelectorAll(".user-name").forEach((el) => {
        el.textContent = this.currentUser.name;
      });

      document.querySelectorAll(".user-avatar").forEach((el) => {
        el.style.backgroundImage = `url(${this.currentUser.avatar})`;
      });

      authButtons.forEach((btn) => {
        if (btn.classList.contains("sign-in-btn")) {
          btn.style.display = "none";
        }
        if (btn.classList.contains("profile-btn")) {
          btn.style.display = "flex";
        }
      });

      userElements.forEach((el) => (el.style.display = "block"));
      guestElements.forEach((el) => (el.style.display = "none"));
    } else {
      authButtons.forEach((btn) => {
        if (btn.classList.contains("sign-in-btn")) {
          btn.style.display = "flex";
        }
        if (btn.classList.contains("profile-btn")) {
          btn.style.display = "none";
        }
      });

      userElements.forEach((el) => (el.style.display = "none"));
      guestElements.forEach((el) => (el.style.display = "block"));
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePassword(password) {
    return (
      password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
    );
  }

  generateAvatar(name) {
    const colors = [
      "#3d8361",
      "#1c6758",
      "#3182ce",
      "#805ad5",
      "#e53e3e",
      "#ed8936",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=${color.slice(1)}&color=fff&size=100`;
  }

  showError(field, message) {
    this.clearErrors();

    const fieldElement = document.getElementById(field);
    if (fieldElement) {
      fieldElement.classList.add("error");

      let errorElement = fieldElement.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        fieldElement.parentNode.insertBefore(
          errorElement,
          fieldElement.nextSibling,
        );
      }

      errorElement.textContent = message;
      errorElement.classList.add("show");
    } else {
      this.showToast(message, "error");
    }
  }

  clearErrors() {
    document
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
    document
      .querySelectorAll(".error-message")
      .forEach((el) => el.classList.remove("show"));
  }

  showSuccess(message) {
    this.showToast(message, "success");
  }

  showToast(message, type = "info") {
    if (window.penguinApp && window.penguinApp.showToast) {
      window.penguinApp.showToast(message, type);
    } else {
      const toast = document.createElement("div");
      toast.className = `toast ${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);

      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    }
  }

  closeAuthModal() {
    const modal = document.getElementById("auth-modal");
    if (modal) {
      modal.classList.remove("show");
    }
  }

  simulateAPICall(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }

  getUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  requireAuth() {
    if (!this.isAuthenticated) {
      this.showToast("Please sign in to continue", "warning");
      this.openAuthModal();
      return false;
    }
    return true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.authSystem = new AuthSystem();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = AuthSystem;
}

// JS Auth End
