// Data management utility functions
const DataManager = {
  cache: {},
  subscribers: new Map(),
  debounceTimers: {},

  async fetchData(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const cacheKey = `${endpoint}?${queryString}`;
    
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    try {
      const response = await fetch(`/api/${endpoint}?${queryString}`);
      const data = await response.json();
      
      this.cache[cacheKey] = data;
      this.notifySubscribers(endpoint, data);
      
      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },

  subscribe(endpoint, callback) {
    if (!this.subscribers.has(endpoint)) {
      this.subscribers.set(endpoint, new Set());
    }
    this.subscribers.get(endpoint).add(callback);

    return () => {
      this.subscribers.get(endpoint).delete(callback);
    };
  },

  notifySubscribers(endpoint, data) {
    if (!this.subscribers.has(endpoint)) return;
    
    this.subscribers.get(endpoint).forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in subscriber callback:', error);
      }
    });
  },

  debounce(func, wait) {
    const key = func.toString();
    
    return (...args) => {
      clearTimeout(this.debounceTimers[key]);
      
      this.debounceTimers[key] = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  },

  clearCache(endpoint) {
    if (endpoint) {
      Object.keys(this.cache).forEach(key => {
        if (key.startsWith(endpoint)) {
          delete this.cache[key];
        }
      });
    } else {
      this.cache = {};
    }
  }
};