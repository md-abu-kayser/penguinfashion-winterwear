// Product Management
// ------------------------------------------------------->
// Note: This page i used many unsplash.com website images.
// ------------------------------------------>
class ProductManager {
  constructor() {
    this.products = [];
    this.categories = [];
    this.filters = {
      category: "all",
      priceRange: [0, 1000],
      rating: 0,
      sortBy: "name",
    };
    this.init();
  }

  async init() {
    await this.loadProducts();
    await this.loadCategories();
    this.setupEventListeners();
    this.renderProducts();
    this.renderCategories();
  }

  // products data
  async loadProducts() {
    await this.simulateAPICall(1000);

    this.products = [
      {
        id: 1,
        name: "Yellow Coat Jacket",
        category: "women",
        price: 234,
        discount: 20,
        originalPrice: 292,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
        description:
          "Waterproof, windproof and breathable winter coat with premium insulation. Perfect for extreme weather conditions.",
        features: [
          "Waterproof",
          "Windproof",
          "Breathable",
          "Premium Insulation",
          "Multiple Pockets",
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Yellow", "Black", "Navy"],
        rating: 4.5,
        reviews: 128,
        inStock: true,
        tags: ["waterproof", "windproof", "winter", "coat"],
      },
      {
        id: 2,
        name: "Ladies Jacket",
        category: "women",
        price: 189,
        discount: 15,
        originalPrice: 222,
        image:
          "https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
        description:
          "Insulated with premium goose down for maximum warmth in extreme conditions. Lightweight and packable.",
        features: [
          "Goose Down",
          "Lightweight",
          "Packable",
          "Durable",
          "Water Resistant",
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Red", "Black", "White"],
        rating: 4.2,
        reviews: 95,
        inStock: true,
        tags: ["goose down", "lightweight", "packable"],
      },
      {
        id: 3,
        name: "Woman Leather Jacket",
        category: "women",
        price: 299,
        discount: 25,
        originalPrice: 399,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
        description:
          "Genuine leather jacket with faux fur lining. Stylish and warm for winter fashion.",
        features: [
          "Genuine Leather",
          "Faux Fur Lining",
          "Stylish",
          "Warm",
          "Fashionable",
        ],
        sizes: ["S", "M", "L"],
        colors: ["Brown", "Black"],
        rating: 4.7,
        reviews: 203,
        inStock: true,
        tags: ["leather", "faux fur", "fashion"],
      },
      {
        id: 4,
        name: "Snowboard Jacket",
        category: "men",
        price: 279,
        discount: 30,
        originalPrice: 399,
        image:
          "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        description:
          "Perfect for extreme winter conditions. Designed for snowboarding with advanced features.",
        features: [
          "Extreme Weather",
          "Snowboard Design",
          "Advanced Features",
          "Durable",
          "Waterproof",
        ],
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Blue", "Black", "Green"],
        rating: 4.4,
        reviews: 156,
        inStock: true,
        tags: ["snowboard", "extreme", "waterproof"],
      },
      {
        id: 5,
        name: "Leather Biker Jacket",
        category: "men",
        price: 349,
        discount: 0,
        originalPrice: 349,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
        description:
          "Classic biker style with modern comfort. Genuine leather with excellent craftsmanship.",
        features: [
          "Classic Biker Style",
          "Modern Comfort",
          "Genuine Leather",
          "Excellent Craftsmanship",
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Brown"],
        rating: 4.6,
        reviews: 89,
        inStock: true,
        tags: ["biker", "leather", "classic"],
      },
      {
        id: 6,
        name: "Winter Parka",
        category: "men",
        price: 199,
        discount: 10,
        originalPrice: 221,
        image:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        description:
          "Heavy duty protection against extreme cold. Perfect for arctic conditions with maximum warmth.",
        features: [
          "Heavy Duty",
          "Extreme Cold",
          "Arctic Conditions",
          "Maximum Warmth",
        ],
        sizes: ["M", "L", "XL"],
        colors: ["Green", "Black", "Navy"],
        rating: 4.3,
        reviews: 112,
        inStock: true,
        tags: ["parka", "extreme cold", "arctic"],
      },
      {
        id: 7,
        name: "Thermal Scarf",
        category: "accessories",
        price: 45,
        discount: 5,
        originalPrice: 47,
        image: "https://placehold.co/600x400?text=Thermal+Scarf",
        description: "Soft and warm thermal scarf for cold days.",
        features: ["Thermal", "Soft", "Warm", "Durable"],
        sizes: ["One Size"],
        colors: ["Gray", "Black"],
        rating: 4.8,
        reviews: 210,
        inStock: true,
        tags: ["scarf", "thermal", "accessory"],
      },
      {
        id: 8,
        name: "Winter Gloves",
        category: "accessories",
        price: 30,
        discount: 0,
        originalPrice: 30,
        image: "https://placehold.co/600x400?text=Winter+Gloves",
        description: "Insulated gloves for hand protection in winter.",
        features: ["Insulated", "Waterproof", "Grip", "Warm"],
        sizes: ["S", "M", "L"],
        colors: ["Black", "Brown"],
        rating: 4.1,
        reviews: 150,
        inStock: true,
        tags: ["gloves", "winter", "accessory"],
      },
      {
        id: 9,
        name: "Beanies Hat",
        category: "accessories",
        price: 25,
        discount: 10,
        originalPrice: 28,
        image: "https://placehold.co/600x400?text=Beanies+Hat",
        description: "Cozy beanies for head warmth.",
        features: ["Cozy", "Warm", "Stylish", "Soft"],
        sizes: ["One Size"],
        colors: ["Red", "Blue"],
        rating: 4.5,
        reviews: 180,
        inStock: true,
        tags: ["hat", "beanies", "accessory"],
      },
      {
        id: 10,
        name: "Snow Boots",
        category: "footwear",
        price: 150,
        discount: 20,
        originalPrice: 187,
        image: "https://placehold.co/600x400?text=Snow+Boots",
        description: "Durable snow boots for harsh winters.",
        features: ["Durable", "Waterproof", "Grip Sole", "Warm Lining"],
        sizes: ["8", "9", "10", "11"],
        colors: ["Black", "Gray"],
        rating: 4.7,
        reviews: 220,
        inStock: true,
        tags: ["boots", "snow", "footwear"],
      },
      {
        id: 11,
        name: "Hiking Boots",
        category: "footwear",
        price: 120,
        discount: 15,
        originalPrice: 141,
        image: "https://placehold.co/600x400?text=Hiking+Boots",
        description: "Comfortable hiking boots for outdoor adventures.",
        features: ["Comfortable", "Durable", "Grip", "Water Resistant"],
        sizes: ["7", "8", "9", "10"],
        colors: ["Brown", "Black"],
        rating: 4.4,
        reviews: 160,
        inStock: true,
        tags: ["hiking", "boots", "footwear"],
      },
      {
        id: 12,
        name: "Winter Sneakers",
        category: "footwear",
        price: 90,
        discount: 0,
        originalPrice: 90,
        image: "https://placehold.co/600x400?text=Winter+Sneakers",
        description: "Stylish winter sneakers with warm lining.",
        features: ["Stylish", "Warm", "Comfortable", "Lightweight"],
        sizes: ["6", "7", "8", "9"],
        colors: ["White", "Black"],
        rating: 4.2,
        reviews: 140,
        inStock: true,
        tags: ["sneakers", "winter", "footwear"],
      },
      {
        id: 13,
        name: "Faux Fur Coat",
        category: "women",
        price: 250,
        discount: 10,
        originalPrice: 278,
        image: "https://placehold.co/600x400?text=Faux+Fur+Coat",
        description: "Luxurious faux fur coat for elegant winter looks.",
        features: ["Faux Fur", "Luxurious", "Warm", "Elegant"],
        sizes: ["S", "M", "L"],
        colors: ["White", "Gray"],
        rating: 4.6,
        reviews: 170,
        inStock: true,
        tags: ["coat", "faux fur", "women"],
      },
      {
        id: 14,
        name: "Puffer Jacket",
        category: "men",
        price: 180,
        discount: 5,
        originalPrice: 189,
        image: "https://placehold.co/600x400?text=Puffer+Jacket",
        description: "Lightweight puffer jacket for everyday winter use.",
        features: ["Lightweight", "Puffer", "Warm", "Packable"],
        sizes: ["M", "L", "XL"],
        colors: ["Blue", "Red"],
        rating: 4.3,
        reviews: 130,
        inStock: true,
        tags: ["puffer", "jacket", "men"],
      },
      {
        id: 15,
        name: "Knitted Sweater",
        category: "women",
        price: 80,
        discount: 0,
        originalPrice: 80,
        image: "https://placehold.co/600x400?text=Knitted+Sweater",
        description: "Cozy knitted sweater for casual winter days.",
        features: ["Knitted", "Cozy", "Soft", "Stylish"],
        sizes: ["S", "M", "L"],
        colors: ["Pink", "Blue"],
        rating: 4.5,
        reviews: 190,
        inStock: true,
        tags: ["sweater", "knitted", "women"],
      },
      {
        id: 16,
        name: "Hoodie",
        category: "men",
        price: 70,
        discount: 10,
        originalPrice: 78,
        image: "https://placehold.co/600x400?text=Hoodie",
        description: "Comfortable hoodie for casual wear.",
        features: ["Comfortable", "Soft", "Warm", "Casual"],
        sizes: ["M", "L", "XL"],
        colors: ["Gray", "Black"],
        rating: 4.4,
        reviews: 145,
        inStock: true,
        tags: ["hoodie", "casual", "men"],
      },
      {
        id: 17,
        name: "Cardigan",
        category: "women",
        price: 95,
        discount: 5,
        originalPrice: 100,
        image: "https://placehold.co/600x400?text=Cardigan",
        description: "Stylish cardigan for layered looks.",
        features: ["Stylish", "Layered", "Warm", "Soft"],
        sizes: ["S", "M", "L"],
        colors: ["Beige", "Gray"],
        rating: 4.6,
        reviews: 165,
        inStock: true,
        tags: ["cardigan", "layered", "women"],
      },
      {
        id: 18,
        name: "Earmuffs",
        category: "accessories",
        price: 20,
        discount: 0,
        originalPrice: 20,
        image: "https://placehold.co/600x400?text=Earmuffs",
        description: "Warm earmuffs for ear protection.",
        features: ["Warm", "Soft", "Adjustable", "Stylish"],
        sizes: ["One Size"],
        colors: ["Pink", "Black"],
        rating: 4.0,
        reviews: 120,
        inStock: true,
        tags: ["earmuffs", "accessory"],
      },
      {
        id: 19,
        name: "Thermal Socks",
        category: "accessories",
        price: 15,
        discount: 10,
        originalPrice: 17,
        image: "https://placehold.co/600x400?text=Thermal+Socks",
        description: "Thick thermal socks for foot warmth.",
        features: ["Thermal", "Thick", "Warm", "Comfortable"],
        sizes: ["M", "L"],
        colors: ["Black", "Gray"],
        rating: 4.2,
        reviews: 135,
        inStock: true,
        tags: ["socks", "thermal", "accessory"],
      },
      {
        id: 20,
        name: "House Slippers",
        category: "footwear",
        price: 35,
        discount: 5,
        originalPrice: 37,
        image: "https://placehold.co/600x400?text=House+Slippers",
        description: "Cozy house slippers for indoor use.",
        features: ["Cozy", "Soft", "Warm", "Non-Slip"],
        sizes: ["6", "7", "8"],
        colors: ["Blue", "Pink"],
        rating: 4.5,
        reviews: 155,
        inStock: true,
        tags: ["slippers", "house", "footwear"],
      },
      {
        id: 21,
        name: "Warm Insoles",
        category: "footwear",
        price: 25,
        discount: 0,
        originalPrice: 25,
        image: "https://placehold.co/600x400?text=Warm+Insoles",
        description: "Insoles for added warmth in shoes.",
        features: ["Warm", "Comfortable", "Insulating", "Durable"],
        sizes: ["One Size"],
        colors: ["Gray"],
        rating: 4.1,
        reviews: 125,
        inStock: true,
        tags: ["insoles", "warm", "footwear"],
      },
      // i can add even more if needed here images:
      // ------------------------------------------------------------------>>
    ];
  }

  async loadCategories() {
    this.categories = [
      {
        id: "all",
        name: "All Products",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Browse our complete winter collection",
      },
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
      {
        id: "accessories",
        name: "Accessories",
        image:
          "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Winter accessories to complete your look",
      },
      {
        id: "footwear",
        name: "Footwear",
        image:
          "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1479&q=80",
        description: "Warm and comfortable winter footwear",
      },
    ];
  }

  // Category filters
  setupEventListeners() {
    document.querySelectorAll(".category-filter").forEach((button) => {
      button.addEventListener("click", (e) => {
        const category = e.currentTarget.dataset.category;
        this.filterByCategory(category);
      });
    });

    // Price filter
    const priceRange = document.getElementById("price-range");
    if (priceRange) {
      priceRange.addEventListener("input", (e) => {
        this.filters.priceRange[1] = parseInt(e.target.value);
        this.updatePriceDisplay();
        this.applyFilters();
      });
    }

    // Rating filter
    document.querySelectorAll(".rating-filter").forEach((button) => {
      button.addEventListener("click", (e) => {
        const rating = parseInt(e.currentTarget.dataset.rating);
        this.filterByRating(rating);
      });
    });

    // Sort options
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.filters.sortBy = e.target.value;
        this.applyFilters();
      });
    }

    // Search
    const searchInput = document.getElementById("product-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchProducts(e.target.value);
      });
    }
  }

  renderProducts(products = this.products) {
    const container = document.getElementById("products-container");
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-base-300 mb-4"></i>
                    <h3 class="text-xl font-bold mb-2">No products found</h3>
                    <p class="text-base-content/70">Try adjusting your filters or search terms</p>
                </div>
            `;
      return;
    }

    container.innerHTML = products
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
                                ? `<span class="text-sm line-through text-base-content/50 ml-2">$${product.originalPrice}</span>`
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

  setupProductInteractions() {
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.id;
        const product = this.products.find((p) => p.id == productId);

        if (product && window.cart) {
          window.cart.addItem(product);
        }
      });
    });

    // Quick view
    document.querySelectorAll(".quick-view").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.product;
        this.showQuickView(productId);
      });
    });

    // Wishlist
    document.querySelectorAll(".add-to-wishlist").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.product;
        this.toggleWishlist(productId);
      });
    });
  }

  setupCategoryInteractions() {
    document.querySelectorAll(".explore-category").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const category = e.currentTarget.dataset.category;
        this.filterByCategory(category);
      });
    });
  }

  // Filtering and Sorting
  filterByCategory(category) {
    this.filters.category = category;
    this.applyFilters();

    // Update active category
    document.querySelectorAll(".category-filter").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.category === category) {
        btn.classList.add("active");
      }
    });

    this.showToast(
      `Showing ${
        category === "all" ? "all products" : category + " collection"
      }`,
    );
  }

  filterByRating(rating) {
    this.filters.rating = rating;
    this.applyFilters();

    // Active rating
    document.querySelectorAll(".rating-filter").forEach((btn) => {
      btn.classList.remove("active");
      if (parseInt(btn.dataset.rating) === rating) {
        btn.classList.add("active");
      }
    });

    this.showToast(`Showing products with ${rating}+ stars`);
  }

  searchProducts(query) {
    this.filters.searchQuery = query.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    let filteredProducts = [...this.products];

    // Category filter
    if (this.filters.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === this.filters.category,
      );
    }

    // Price filter
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= this.filters.priceRange[0] &&
        product.price <= this.filters.priceRange[1],
    );

    // Rating filter
    if (this.filters.rating > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= this.filters.rating,
      );
    }

    // Search filter
    if (this.filters.searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(this.filters.searchQuery) ||
          product.description
            .toLowerCase()
            .includes(this.filters.searchQuery) ||
          product.tags.some((tag) => tag.includes(this.filters.searchQuery)),
      );
    }

    // Sorting
    filteredProducts = this.sortProducts(filteredProducts, this.filters.sortBy);

    this.renderProducts(filteredProducts);
  }

  sortProducts(products, sortBy) {
    switch (sortBy) {
      case "price-low":
        return products.sort((a, b) => a.price - b.price);
      case "price-high":
        return products.sort((a, b) => b.price - a.price);
      case "rating":
        return products.sort((a, b) => b.rating - a.rating);
      case "name":
      default:
        return products.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  updatePriceDisplay() {
    const priceDisplay = document.getElementById("price-display");
    if (priceDisplay) {
      priceDisplay.textContent = `Up to $${this.filters.priceRange[1]}`;
    }
  }

  // Product Details
  showQuickView(productId) {
    const product = this.products.find((p) => p.id == productId);
    if (!product) return;

    const modal = document.createElement("div");
    modal.className = "modal modal-open";
    modal.innerHTML = `
            <div class="modal-box max-w-4xl">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img src="${product.image}" alt="${
                          product.name
                        }" class="w-full h-80 object-cover rounded-lg">
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold mb-2">${product.name}</h2>
                        <div class="rating mb-4">
                            ${this.generateStarRating(product.rating)}
                            <span class="ml-2">(${
                              product.reviews
                            } reviews)</span>
                        </div>
                        <p class="text-lg font-bold text-primary mb-4">$${
                          product.price
                        } 
                            ${
                              product.discount
                                ? `<span class="text-sm line-through text-base-content/50">$${product.originalPrice}</span>`
                                : ""
                            }
                        </p>
                        <p class="text-base-content/70 mb-6">${
                          product.description
                        }</p>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="font-semibold">Size:</label>
                                <div class="flex space-x-2 mt-2">
                                    ${product.sizes
                                      .map(
                                        (size) => `
                                        <button class="btn btn-outline btn-sm">${size}</button>
                                    `,
                                      )
                                      .join("")}
                                </div>
                            </div>
                            
                            <div>
                                <label class="font-semibold">Color:</label>
                                <div class="flex space-x-2 mt-2">
                                    ${product.colors
                                      .map(
                                        (color) => `
                                        <button class="btn btn-outline btn-sm">${color}</button>
                                    `,
                                      )
                                      .join("")}
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center space-x-2">
                                    <button class="btn btn-ghost btn-sm">-</button>
                                    <span class="px-3">1</span>
                                    <button class="btn btn-ghost btn-sm">+</button>
                                </div>
                                <button class="btn btn-primary flex-1 add-to-cart"
                                        data-id="${product.id}"
                                        data-name="${product.name}"
                                        data-price="${product.price}"
                                        data-image="${product.image}">
                                    <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-action">
                    <button class="btn btn-ghost" onclick="this.closest('.modal').remove()">Close</button>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    modal.querySelector(".add-to-cart").addEventListener("click", () => {
      if (window.cart) {
        window.cart.addItem(product);
        modal.remove();
      }
    });
  }

  toggleWishlist(productId) {
    const product = this.products.find((p) => p.id == productId);
    if (!product) return;

    const wishlist = JSON.parse(
      localStorage.getItem("penguinWishlist") || "[]",
    );
    const existingIndex = wishlist.findIndex((item) => item.id === productId);

    if (existingIndex > -1) {
      wishlist.splice(existingIndex, 1);
      this.showToast("Removed from wishlist");
    } else {
      wishlist.push(product);
      this.showToast("Added to wishlist");
    }

    localStorage.setItem("penguinWishlist", JSON.stringify(wishlist));
    this.updateWishlistButton(productId, existingIndex === -1);
  }

  updateWishlistButton(productId, isInWishlist) {
    const button = document.querySelector(`[data-product="${productId}"]`);
    if (button) {
      const icon = button.querySelector("i");
      if (isInWishlist) {
        icon.className = "fas fa-heart";
        button.classList.add("text-red-500");
      } else {
        icon.className = "far fa-heart";
        button.classList.remove("text-red-500");
      }
    }
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

  showToast(message, type = "info") {
    if (window.penguinApp && window.penguinApp.showToast) {
      window.penguinApp.showToast(message, type);
    }
  }

  simulateAPICall(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }

  // Public methods
  getProduct(id) {
    return this.products.find((product) => product.id == id);
  }

  getProductsByCategory(category) {
    return this.products.filter((product) => product.category === category);
  }

  getFeaturedProducts() {
    return this.products.filter((product) => product.rating >= 4.5).slice(0, 6);
  }

  getDiscountedProducts() {
    return this.products.filter((product) => product.discount > 0);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.productManager = new ProductManager();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = ProductManager;
}
// -------------------END--------------------->
