// User authentication and management module
const userAuth = {
    user: null,
    token: localStorage.getItem("auth_token"),

    init() {
        if (this.token) {
            this.validateToken();
        }
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.getElementById("login-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            this.login(username, password);
        });
    },

    async login(username, password) {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Invalid credentials");

            const data = await response.json();
            this.token = data.token;
            localStorage.setItem("auth_token", this.token);
            this.user = data.user;

            document.getElementById("user-profile").innerHTML = `Welcome ${this.user.name}`;
            document.getElementById("login-section").style.display = "none";
        } catch (error) {
            document.getElementById("error-message").innerHTML = error.message;
        }
    },

    async validateToken() {
        try {
            const response = await fetch("/api/validate", {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            if (!response.ok) {
                this.logout();
                return;
            }

            const data = await response.json();
            this.user = data.user;
        } catch (error) {
            this.logout();
        }
    },

    logout() {
        this.user = null;
        this.token = null;
        localStorage.removeItem("auth_token");
        document.getElementById("login-section").style.display = "block";
        document.getElementById("user-profile").innerHTML = "";
    },
};
