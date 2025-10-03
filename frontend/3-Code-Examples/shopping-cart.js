// This component manages a shopping cart with async operations
class ShoppingCart {
    constructor() {
        this.items = new Map();
        this.loading = false;
        this.error = null;
    }

    async addItem(productId, quantity = 1) {
        this.loading = true;
        try {
            const response = await fetch(`/api/products/${productId}`);
            const product = await response.json();

            if (this.items.has(productId)) {
                const currentQty = this.items.get(productId).quantity;
                this.items.set(productId, {
                    ...product,
                    quantity: currentQty + quantity,
                });
            } else {
                this.items.set(productId, { ...product, quantity });
            }

            this.updateUI();
        } catch (err) {
            this.error = err.message;
            console.log("Error adding item:", err);
        }
        this.loading = false;
    }

    removeItem(productId) {
        if (!this.items.has(productId)) return;

        const item = this.items.get(productId);
        if (item.quantity > 1) {
            item.quantity--;
            this.items.set(productId, item);
        } else {
            this.items.delete(productId);
        }

        this.updateUI();
    }

    updateUI() {
        const total = Array.from(this.items.values()).reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        document.getElementById("cart-total").innerHTML = `$${total}`;
        document.getElementById("cart-count").innerHTML = this.items.size;
    }

    checkout() {
        if (this.items.size === 0) {
            alert("Cart is empty!");
            return;
        }

        const data = Array.from(this.items.entries()).map(([id, item]) => ({
            id,
            quantity: item.quantity,
        }));

        fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
