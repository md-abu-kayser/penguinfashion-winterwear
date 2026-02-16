// Shopping Cart JS
// --------------------------------------------------->
class Cart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.loadCart();
  }

  loadCart() {
    const savedCart = localStorage.getItem("penguinCart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      this.items = cartData.items || [];
      this.total = cartData.total || 0;
    }
    this.updateCartDisplay();
  }

  saveCart() {
    const cartData = {
      items: this.items,
      total: this.total,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("penguinCart", JSON.stringify(cartData));
    this.updateCartDisplay();

    window.dispatchEvent(
      new CustomEvent("cartUpdate", {
        detail: { items: this.items, total: this.total },
      }),
    );
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        ...product,
        quantity: quantity,
      });
    }

    this.calculateTotal();
    this.saveCart();
    this.showAddToCartNotification(product);
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.calculateTotal();
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.items.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.calculateTotal();
      this.saveCart();
    }
  }

  clearCart() {
    this.items = [];
    this.total = 0;
    this.saveCart();
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }

  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  showAddToCartNotification(product) {
    const notification = document.querySelector(".cart-notification");
    if (notification) {
      notification.querySelector("span").textContent =
        `${product.name} added to cart!`;
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 3000);
    }
  }

  updateCartDisplay() {
    const cartCounts = document.querySelectorAll(".cart-count");
    cartCounts.forEach((element) => {
      element.textContent = this.getTotalItems();
    });

    this.updateCartDropdown();
    this.updateCartPage();
  }

  updateCartDropdown() {
    const cartDropdown = document.querySelector(".cart-dropdown-content");
    if (!cartDropdown) return;

    if (this.items.length === 0) {
      cartDropdown.innerHTML = `
                <div class="p-4 text-center">
                    <i class="fas fa-shopping-cart text-3xl text-base-300 mb-2"></i>
                    <p class="text-base-content/70">Your cart is empty</p>
                </div>
            `;
      return;
    }

    cartDropdown.innerHTML = `
            <div class="p-4">
                <h3 class="font-bold text-lg mb-4">Cart Items (${this.getTotalItems()})</h3>
                <div class="space-y-3 max-h-60 overflow-y-auto">
                    ${this.items
                      .map(
                        (item) => `
                        <div class="flex items-center space-x-3 p-2 bg-base-200 rounded-lg">
                            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                            <div class="flex-1">
                                <h4 class="font-semibold text-sm">${item.name}</h4>
                                <p class="text-primary font-bold">$${item.price} x ${item.quantity}</p>
                            </div>
                            <button class="btn btn-ghost btn-xs remove-item" data-id="${item.id}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                <div class="border-t mt-4 pt-4">
                    <div class="flex justify-between items-center mb-3">
                        <span class="font-semibold">Subtotal:</span>
                        <span class="font-bold text-lg">$${this.total.toFixed(
                          2,
                        )}</span>
                    </div>
                    <div class="space-y-2">
                        <button class="btn btn-primary btn-block btn-sm" onclick="window.location.href='#'">
                            View Cart
                        </button>
                        <button class="btn btn-secondary btn-block btn-sm">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        `;

    cartDropdown.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.id;
        this.removeItem(productId);
      });
    });
  }

  updateCartPage() {
    const cartPage = document.getElementById("cart-page");
    if (!cartPage) return;

    if (this.items.length === 0) {
      cartPage.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-shopping-cart text-6xl text-base-300 mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p class="text-base-content/70 mb-6">Start shopping to add items to your cart</p>
                    <button class="btn btn-primary" onclick="window.location.href='#shop'">
                        Start Shopping
                    </button>
                </div>
            `;
      return;
    }

    cartPage.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                    <div class="bg-base-100 rounded-lg shadow-sm border border-base-300">
                        <div class="p-6 border-b border-base-300">
                            <h2 class="text-2xl font-bold">Shopping Cart (${this.getTotalItems()} items)</h2>
                        </div>
                        <div class="divide-y divide-base-300">
                            ${this.items
                              .map(
                                (item) => `
                                <div class="p-6 flex items-center space-x-4">
                                    <img src="${item.image}" alt="${
                                      item.name
                                    }" class="w-20 h-20 object-cover rounded-lg">
                                    <div class="flex-1">
                                        <h3 class="font-semibold text-lg">${
                                          item.name
                                        }</h3>
                                        <p class="text-primary font-bold text-xl">$${
                                          item.price
                                        }</p>
                                        <div class="flex items-center space-x-2 mt-2">
                                            <button class="btn btn-ghost btn-sm quantity-btn decrease" data-id="${
                                              item.id
                                            }">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                            <span class="px-3 py-1 border rounded">${
                                              item.quantity
                                            }</span>
                                            <button class="btn btn-ghost btn-sm quantity-btn increase" data-id="${
                                              item.id
                                            }">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-bold text-lg">$${(
                                          item.price * item.quantity
                                        ).toFixed(2)}</p>
                                        <button class="btn btn-ghost btn-sm text-error remove-item mt-2" data-id="${
                                          item.id
                                        }">
                                            <i class="fas fa-trash"></i> Remove
                                        </button>
                                    </div>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-1">
                    <div class="bg-base-100 rounded-lg shadow-sm border border-base-300 p-6 sticky top-4">
                        <h3 class="text-xl font-bold mb-4">Order Summary</h3>
                        <div class="space-y-3 mb-6">
                            <div class="flex justify-between">
                                <span>Subtotal (${this.getTotalItems()} items)</span>
                                <span>$${this.total.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Tax</span>
                                <span>$${(this.total * 0.1).toFixed(2)}</span>
                            </div>
                            <div class="border-t pt-3 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>$${(this.total * 1.1).toFixed(2)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-block mb-3">
                            Proceed to Checkout
                        </button>
                        <button class="btn btn-ghost btn-block" onclick="window.location.href='#shop'">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        `;

    // Add event listeners
    cartPage.querySelectorAll(".quantity-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.id;
        const isIncrease = e.currentTarget.classList.contains("increase");
        const item = this.items.find((item) => item.id == productId);

        if (item) {
          if (isIncrease) {
            this.updateQuantity(productId, item.quantity + 1);
          } else {
            this.updateQuantity(productId, item.quantity - 1);
          }
        }
      });
    });

    cartPage.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.dataset.id;
        this.removeItem(productId);
      });
    });
  }

  async processCheckout() {
    if (this.items.length === 0) {
      this.showToast("Your cart is empty", "warning");
      return false;
    }

    try {
      this.showToast("Processing your order...", "info");
      await this.simulateAPICall(2000);

      this.clearCart();
      this.showToast("Order placed successfully!", "success");

      return true;
    } catch (error) {
      this.showToast("Checkout failed. Please try again.", "error");
      return false;
    }
  }

  simulateAPICall(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }

  showToast(message, type = "info") {
    if (window.penguinApp && window.penguinApp.showToast) {
      window.penguinApp.showToast(message, type);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.cart = new Cart();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = Cart;
}
// Shopping Cart JS End
