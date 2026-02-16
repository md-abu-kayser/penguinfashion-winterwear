// Main JS Application Controller Is Here----------->
// Note: This page i used many unsplash.com website images.
// ---------------------------------------------------------------->
class PenguinFashionApp {
  constructor() {
    this.currentUser = null;
    this.products = [];
    this.categories = [];
    this.themes = ["light", "dark", "blue", "purple", "red", "orange"];
    this.currentTheme = "light";
    this.init();
  }

  init() {
    this.loadUserData();
    this.loadProducts();
    this.loadCategories();
    this.setupEventListeners();
    this.setupTheme();
    this.setupCountdown();
    this.setupSearch();
    this.setupNavigation();
    this.setupAuth();
    this.setupCart();
    this.setupRatings();
    this.setupNewsletter();

    // Show welcome message
    this.showToast("Welcome to Penguin Fashion!", "success");
  }

  // User Management
  loadUserData() {
    const userData = localStorage.getItem("penguinUser");
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.updateUserUI();
    }
  }

  saveUserData() {
    if (this.currentUser) {
      localStorage.setItem("penguinUser", JSON.stringify(this.currentUser));
    }
  }

  updateUserUI() {
    const userElements = document.querySelectorAll(".user-name, .user-avatar");
    const authButtons = document.querySelectorAll(".auth-btn");

    if (this.currentUser) {
      userElements.forEach((el) => {
        if (el.classList.contains("user-name")) {
          el.textContent = this.currentUser.name;
        }
        if (el.classList.contains("user-avatar")) {
          el.style.backgroundImage = `url(${this.currentUser.avatar})`;
        }
      });

      authButtons.forEach((btn) => {
        if (btn.classList.contains("sign-in-btn")) {
          btn.style.display = "none";
        }
        if (btn.classList.contains("profile-btn")) {
          btn.style.display = "flex";
        }
      });
    } else {
      authButtons.forEach((btn) => {
        if (btn.classList.contains("sign-in-btn")) {
          btn.style.display = "flex";
        }
        if (btn.classList.contains("profile-btn")) {
          btn.style.display = "none";
        }
      });
    }
  }

  // Product Management
  loadProducts() {
    this.products = [
      {
        id: 1,
        name: "Yellow Coat Jacket",
        category: "women",
        price: 234,
        discount: 20,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
        description:
          "Waterproof, windproof and breathable winter coat with premium insulation.",
        features: [
          "Waterproof",
          "Windproof",
          "Breathable",
          "Premium Insulation",
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Yellow", "Black", "Navy"],
        rating: 4.5,
        reviews: 128,
        inStock: true,
      },
      {
        id: 2,
        name: "Ladies Jacket",
        category: "women",
        price: 189,
        discount: 15,
        image:
          "https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
        description:
          "Insulated with premium goose down for maximum warmth in extreme conditions.",
        features: ["Goose Down", "Lightweight", "Packable", "Durable"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Red", "Black", "White"],
        rating: 4.2,
        reviews: 95,
        inStock: true,
      },
      // next time many products will be added here:
      // i can add even more if needed here images:->>>>>>>>>>
      // -------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    ];

    this.renderProducts();
  }

  loadCategories() {
    this.categories = [
      {
        id: "men",
        name: "Men",
        image:
          "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Premium winter wear for men",
      },
      {
        id: "women",
        name: "Women",
        image:
          "https://images.unsplash.com/photo-1536678891919-e0e7d61a4b15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        description: "Stylish winter collection for women",
      },
      // next time many categories will be added here
      // i can add even more if needed here images:---
      // -------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    ];

    this.renderCategories();
  }

  renderProducts() {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.innerHTML = this.products
      .map(
        (product) => `
            <div class="product-card animate-fadeInUp" data-category="${
              product.category
            }">
                <div class="product-image">
                    <img src="${product.image}" alt="${
                      product.name
                    }" loading="lazy">
                    ${
                      product.discount
                        ? `<div class="discount-badge">-${product.discount}%</div>`
                        : ""
                    }
                    <div class="new-badge">New</div>
                    <div class="product-actions">
                        <button class="btn btn-circle btn-primary quick-view" data-product="${
                          product.id
                        }">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-circle btn-primary add-to-wishlist" data-product="${
                          product.id
                        }">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body p-4">
                    <div class="rating mb-2">
                        ${this.generateStarRating(product.rating)}
                        <span class="text-sm ml-2">(${product.reviews})</span>
                    </div>
                    <h3 class="card-title text-lg mb-2">${product.name}</h3>
                    <p class="text-base-content/70 mb-3">${product.description.substring(
                      0,
                      80,
                    )}...</p>
                    <div class="card-actions justify-between items-center">
                        <div class="price">
                            <span class="text-2xl font-bold">$${
                              product.price
                            }</span>
                            ${
                              product.discount
                                ? `<span class="text-sm line-through text-base-content/50 ml-2">$${(
                                    product.price /
                                    (1 - product.discount / 100)
                                  ).toFixed(0)}</span>`
                                : ""
                            }
                        </div>
                        <button class="btn btn-primary add-to-cart" 
                                data-id="${product.id}"
                                data-name="${product.name}"
                                data-price="${product.price}"
                                data-image="${product.image}">
                            <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");

    this.setupProductInteractions();
  }

  renderCategories() {
    const container = document.getElementById("categories-container");
    if (!container) return;

    container.innerHTML = this.categories
      .map(
        (category) => `
            <div class="card image-full shadow-xl before:opacity-60 hover:before:opacity-80 transition-all duration-300 category-card" data-category="${category.id}">
                <figure>
                    <img src="${category.image}" alt="${category.name}" loading="lazy">
                </figure>
                <div class="card-body justify-end text-center">
                    <h3 class="card-title justify-center text-white text-2xl">${category.name}</h3>
                    <p class="text-white/80 mb-4">${category.description}</p>
                    <button class="btn btn-ghost text-white explore-category" data-category="${category.id}">
                        Explore Collection
                    </button>
                </div>
            </div>
        `,
      )
      .join("");

    this.setupCategoryInteractions();
  }

  generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars += '<i class="fas fa-star text-yellow-400"></i>';
      } else if (hasHalfStar && i === fullStars + 1) {
        stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
      } else {
        stars += '<i class="far fa-star text-yellow-400"></i>';
      }
    }

    return stars;
  }

  // Event Listeners
  setupEventListeners() {
    document
      .getElementById("theme-toggle")
      .addEventListener("click", () => this.toggleTheme());

    // Mobile menu
    document
      .getElementById("mobile-menu-btn")
      .addEventListener("click", () => this.toggleMobileMenu());
    document
      .getElementById("mobile-menu-close")
      .addEventListener("click", () => this.toggleMobileMenu());

    // Search
    document
      .getElementById("search-btn")
      .addEventListener("click", () => this.toggleSearch());
    document
      .getElementById("search-close")
      .addEventListener("click", () => this.toggleSearch());

    // Auth
    document
      .getElementById("auth-btn")
      .addEventListener("click", () => this.toggleAuth());
    document
      .getElementById("auth-close")
      .addEventListener("click", () => this.toggleAuth());

    // Close modals on outside click
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("auth-modal")) {
        this.toggleAuth();
      }
      if (e.target.classList.contains("search-modal")) {
        this.toggleSearch();
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        this.toggleSearch();
      }
      if (e.key === "Escape") {
        this.closeAllModals();
      }
    });

    // Scroll animations
    window.addEventListener("scroll", () => this.handleScroll());
  }

  // Add to cart buttons
  setupProductInteractions() {
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const product = {
          id: e.target.dataset.id,
          name: e.target.dataset.name,
          price: parseFloat(e.target.dataset.price),
          image: e.target.dataset.image,
          quantity: 1,
        };
        this.addToCart(product);
      });
    });

    // Quick view
    document.querySelectorAll(".quick-view").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.closest(".quick-view").dataset.product;
        this.showQuickView(productId);
      });
    });

    // Wishlist
    document.querySelectorAll(".add-to-wishlist").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.closest(".add-to-wishlist").dataset.product;
        this.toggleWishlist(productId);
      });
    });
  }

  setupCategoryInteractions() {
    document.querySelectorAll(".explore-category").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const category = e.target.dataset.category;
        this.filterByCategory(category);
      });
    });
  }

  // Theme Management
  setupTheme() {
    const savedTheme = localStorage.getItem("penguinTheme") || "light";
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    if (!this.themes.includes(theme)) return;

    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("penguinTheme", theme);

    // On theme toggle icon
    const themeIcon = document.getElementById("theme-icon");
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }

    this.updateThemeDropdown();
  }

  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.setTheme(this.themes[nextIndex]);
  }

  updateThemeDropdown() {
    const themeOptions = document.querySelectorAll(".theme-option");
    themeOptions.forEach((option) => {
      option.classList.remove("active");
      if (option.dataset.theme === this.currentTheme) {
        option.classList.add("active");
      }
    });
  }

  // Search
  setupSearch() {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        this.performSearch(query);
      });
    }
  }

  performSearch(query) {
    if (query.length < 2) {
      this.hideSearchResults();
      return;
    }

    const results = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    );

    this.displaySearchResults(results);
  }

  displaySearchResults(results) {
    const container = document.getElementById("search-results");
    if (!container) return;

    if (results.length === 0) {
      container.innerHTML =
        '<div class="p-4 text-center">No products found</div>';
    } else {
      container.innerHTML = results
        .map(
          (product) => `
                <div class="search-result-item p-3 border-b border-base-200 cursor-pointer hover:bg-base-200 transition-colors">
                    <div class="flex items-center space-x-3">
                        <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
                        <div>
                            <h4 class="font-semibold">${product.name}</h4>
                            <p class="text-sm text-base-content/70">$${product.price}</p>
                        </div>
                    </div>
                </div>
            `,
        )
        .join("");

      container
        .querySelectorAll(".search-result-item")
        .forEach((item, index) => {
          item.addEventListener("click", () => {
            this.showProductDetail(results[index].id);
            this.toggleSearch();
          });
        });
    }

    container.classList.remove("hidden");
  }

  hideSearchResults() {
    const container = document.getElementById("search-results");
    if (container) {
      container.classList.add("hidden");
    }
  }

  // Navigation
  setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Active navigation
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll(".nav-link");

      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 100) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // Authentication
  setupAuth() {
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const target = e.target.dataset.tab;
        this.switchAuthTab(target);
      });
    });

    // Form switching
    document.getElementById("show-signup").addEventListener("click", (e) => {
      e.preventDefault();
      this.switchAuthTab("signup");
    });

    document.getElementById("show-signin").addEventListener("click", (e) => {
      e.preventDefault();
      this.switchAuthTab("signin");
    });

    // Form submission
    document
      .getElementById("signin-form")
      .addEventListener("submit", (e) => this.handleSignIn(e));
    document
      .getElementById("signup-form")
      .addEventListener("submit", (e) => this.handleSignUp(e));

    // Social login buttons
    document.querySelectorAll(".social-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const provider = e.target.closest(".social-btn").dataset.provider;
        this.handleSocialLogin(provider);
      });
    });

    // Password strength
    const passwordInput = document.getElementById("signup-password");
    if (passwordInput) {
      passwordInput.addEventListener("input", (e) => {
        this.checkPasswordStrength(e.target.value);
      });
    }
  }

  // Update tabs
  switchAuthTab(tab) {
    document
      .querySelectorAll(".auth-tab")
      .forEach((t) => t.classList.remove("active"));
    document.querySelector(`[data-tab="${tab}"]`).classList.add("active");

    // Update forms
    document
      .querySelectorAll(".auth-form")
      .forEach((f) => f.classList.remove("active"));
    document.getElementById(`${tab}-form`).classList.add("active");
  }

  handleSignIn(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const remember = formData.get("remember");

    if (email && password) {
      this.currentUser = {
        id: 1,
        name: "John Doe",
        email: email,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      };

      this.saveUserData();
      this.updateUserUI();
      this.toggleAuth();
      this.showToast("Successfully signed in!", "success");
    } else {
      this.showToast("Please check your credentials", "error");
    }
  }

  handleSignUp(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const terms = formData.get("terms");

    if (name && email && password && terms) {
      this.currentUser = {
        id: Date.now(),
        name: name,
        email: email,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      };

      this.saveUserData();
      this.updateUserUI();
      this.toggleAuth();
      this.showToast("Account created successfully!", "success");
    } else {
      this.showToast("Please fill all fields and accept terms", "error");
    }
  }

  handleSocialLogin(provider) {
    this.currentUser = {
      id: Date.now(),
      name: `User from ${provider}`,
      email: `user@${provider}.com`,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80`,
      provider: provider,
    };

    this.saveUserData();
    this.updateUserUI();
    this.toggleAuth();
    this.showToast(`Signed in with ${provider}`, "success");
  }

  checkPasswordStrength(password) {
    const strengthBar = document.querySelector(".strength-fill");
    const strengthText = document.querySelector(".strength-text");

    let strength = 0;
    let text = "Very Weak";
    let className = "weak";

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    switch (strength) {
      case 1:
        text = "Weak";
        className = "weak";
        break;
      case 2:
        text = "Medium";
        className = "medium";
        break;
      case 3:
      case 4:
        text = "Strong";
        className = "strong";
        break;
    }

    strengthBar.className = `strength-fill ${className}`;
    strengthText.textContent = text;
  }

  // Cart Management
  setupCart() {
    this.updateCartCount();
  }

  addToCart(product) {
    const cart = new Cart();
    cart.addItem(product);
    this.showCartNotification();
    this.updateCartCount();
  }

  showCartNotification() {
    const notification = document.querySelector(".cart-notification");
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  updateCartCount() {
    const cart = new Cart();
    const count = cart.getTotalItems();
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = count;
    });
  }

  // Ratings System
  setupRatings() {}

  // Newsletter
  setupNewsletter() {
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) =>
        this.handleNewsletter(e),
      );
    }

    const footerNewsletter = document.getElementById("footer-newsletter");
    if (footerNewsletter) {
      footerNewsletter.addEventListener("submit", (e) =>
        this.handleNewsletter(e),
      );
    }
  }

  handleNewsletter(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");

    if (email && this.validateEmail(email)) {
      const subscribers = JSON.parse(
        localStorage.getItem("newsletterSubscribers") || "[]",
      );
      subscribers.push({
        email: email,
        subscribedAt: new Date().toISOString(),
      });
      localStorage.setItem(
        "newsletterSubscribers",
        JSON.stringify(subscribers),
      );

      this.showToast("Thank you for subscribing!", "success");
      e.target.reset();
    } else {
      this.showToast("Please enter a valid email address", "error");
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Countdown Timer
  setupCountdown() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const now = new Date();
    const target = new Date();
    target.setHours(23, 59, 59, 999);

    const diff = target - now;

    if (diff <= 0) {
      target.setDate(target.getDate() + 1);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.updateCountdownDisplay(hours, minutes, seconds);
  }

  updateCountdownDisplay(hours, minutes, seconds) {
    const elements = {
      hours: document.getElementById("countdown-hours"),
      minutes: document.getElementById("countdown-minutes"),
      seconds: document.getElementById("countdown-seconds"),
    };

    if (elements.hours)
      elements.hours.textContent = hours.toString().padStart(2, "0");
    if (elements.minutes)
      elements.minutes.textContent = minutes.toString().padStart(2, "0");
    if (elements.seconds)
      elements.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  // Utility Methods is here:--->
  toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("show");
  }

  toggleSearch() {
    const modal = document.getElementById("search-modal");
    modal.classList.toggle("show");

    if (modal.classList.contains("show")) {
      document.getElementById("search-input").focus();
    }
  }

  toggleAuth() {
    const modal = document.getElementById("auth-modal");
    modal.classList.toggle("show");
  }

  closeAllModals() {
    document
      .querySelectorAll(".auth-modal, .search-modal, .mobile-menu")
      .forEach((modal) => {
        modal.classList.remove("show");
      });
  }

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${this.getToastIcon(type)} mr-3"></i>
                <span>${message}</span>
            </div>
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  getToastIcon(type) {
    const icons = {
      success: "check-circle",
      error: "exclamation-circle",
      warning: "exclamation-triangle",
      info: "info-circle",
    };
    return icons[type] || "info-circle";
  }

  handleScroll() {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element) => {
      const position = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (position < screenPosition) {
        element.classList.add("animate-fadeInUp");
      }
    });
  }

  filterByCategory(category) {
    const products = document.querySelectorAll(".product-card");
    products.forEach((product) => {
      if (category === "all" || product.dataset.category === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });

    this.showToast(`Showing ${category} collection`, "info");
  }

  showQuickView(productId) {
    const product = this.products.find((p) => p.id == productId);
    if (product) {
      this.showToast(`Quick view: ${product.name}`, "info");
    }
  }

  toggleWishlist(productId) {
    const product = this.products.find((p) => p.id == productId);
    if (product) {
      this.showToast(`Added ${product.name} to wishlist`, "success");
    }
  }

  showProductDetail(productId) {
    const product = this.products.find((p) => p.id == productId);
    if (product) {
      this.showToast(`Viewing: ${product.name}`, "info");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.penguinApp = new PenguinFashionApp();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = PenguinFashionApp;
}

// End
