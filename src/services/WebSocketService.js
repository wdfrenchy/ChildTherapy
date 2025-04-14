class WebSocketService {
  constructor() {
    this.ws = null;
    this.subscribers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // Start with 1 second delay
    this.heartbeatInterval = null;
    this.eventHandlers = new Map();
  }

  connect(url = 'ws://localhost:8080/ws') {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          this.notifySubscribers('connection', { status: 'connected' });
          resolve();
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.stopHeartbeat();
          this.notifySubscribers('connection', { status: 'disconnected' });
          this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.notifySubscribers('error', { error });
          reject(error);
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
      } catch (error) {
        console.error('Error creating WebSocket:', error);
        reject(error);
      }
    });
  }

  handleMessage(data) {
    const { type, payload } = data;

    // Handle system messages
    switch (type) {
      case 'ping':
        this.send('pong', { timestamp: Date.now() });
        return;
      case 'reconnect':
        this.reconnect();
        return;
    }

    // Notify subscribers for this event type
    this.notifySubscribers(type, payload);

    // Execute registered handlers for this event type
    const handlers = this.eventHandlers.get(type) || [];
    handlers.forEach(handler => {
      try {
        handler(payload);
      } catch (error) {
        console.error(`Error in handler for ${type}:`, error);
      }
    });
  }

  subscribe(type, callback) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type).add(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(type);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.subscribers.delete(type);
        }
      }
    };
  }

  notifySubscribers(type, payload) {
    const callbacks = this.subscribers.get(type);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(payload);
        } catch (error) {
          console.error(`Error in subscriber for ${type}:`, error);
        }
      });
    }
  }

  send(type, payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', { type, payload });
    }
  }

  startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      this.send('ping', { timestamp: Date.now() });
    }, 30000); // Send heartbeat every 30 seconds
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
      this.reconnectAttempts++;
      this.connect()
        .catch(() => {
          // Exponential backoff
          this.reconnectDelay *= 2;
        });
    }, this.reconnectDelay);
  }

  reconnect() {
    this.disconnect();
    return this.connect();
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.stopHeartbeat();
  }

  // Register event handlers
  on(type, handler) {
    if (!this.eventHandlers.has(type)) {
      this.eventHandlers.set(type, new Set());
    }
    this.eventHandlers.get(type).add(handler);

    // Return function to remove handler
    return () => {
      const handlers = this.eventHandlers.get(type);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.eventHandlers.delete(type);
        }
      }
    };
  }

  // Remove event handler
  off(type, handler) {
    const handlers = this.eventHandlers.get(type);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.eventHandlers.delete(type);
      }
    }
  }
}

// Create singleton instance
const webSocketService = new WebSocketService();
export default webSocketService;
