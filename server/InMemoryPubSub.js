class InMemoryPubSub {
    constructor() {
        this.subscribers = {};
    }

    // Subscribe to an event
    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }

        this.subscribers[event].push(callback);

        // Return an unsubscribe function
        return () => {
            this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
        };
    }

    // Publish an event with optional data
    publish(event, data) {
        try {
            if (this.subscribers[event]) {
                console.log("check list subscribers", this.subscribers);
                this.subscribers[event].forEach(callback => callback(data));
            }
        } catch (error) {
            console.log("Error publishing messages: ", error);
        }
    }
    
}

module.exports = InMemoryPubSub;
  