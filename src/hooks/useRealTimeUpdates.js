import { useState, useEffect, useCallback, useRef } from 'react';

const useRealTimeUpdates = (endpoint, options = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [connectionQuality, setConnectionQuality] = useState('disconnected');
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const messageQueue = useRef([]);
  const listenersRef = useRef([]);

  const {
    reconnectInterval = 5000,
    maxReconnectAttempts = 5,
    reconnectDelay = 10000,
    heartbeatInterval = 30000,
  } = options;

  const connect = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${protocol}${window.location.host}${endpoint}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected:', endpoint);
        setIsConnected(true);
        setConnectionQuality('connected');
        reconnectTimeoutRef.current && clearTimeout(reconnectTimeoutRef.current);

        // Process queued messages
        while (messageQueue.current.length > 0) {
          const message = messageQueue.current.shift();
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
          }
        }

        // Send ping to keep connection alive
        if (heartbeatInterval) {
          setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'ping' }));
            }
          }, heartbeatInterval);
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket closed:', event);
        setIsConnected(false);
        setConnectionQuality('disconnected');
        scheduleReconnect();
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setIsConnected(false);
        setConnectionQuality('error');
        scheduleReconnect();
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('WebSocket message:', message);

          switch (message.type) {
            case 'pong':
              return;

            case 'data_update':
              setLastUpdate(new Date());
              listenersRef.current.forEach(listener => {
                if (listener.onDataUpdate) {
                  listener.onDataUpdate(message.payload);
                }
              });
              break;

            case 'notification':
              listenersRef.current.forEach(listener => {
                if (listener.onNotification) {
                  listener.onNotification(message.payload);
                }
              });
              break;

            case 'progress':
              listenersRef.current.forEach(listener => {
                if (listener.onProgress) {
                  listener.onProgress(message.payload);
                }
              });
              break;

            case 'error':
              console.error('Server error:', message.payload);
              listenersRef.current.forEach(listener => {
                if (listener.onError) {
                  listener.onError(message.payload);
                }
              });
              break;

            default:
              console.warn('Unknown message type:', message.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setIsConnected(false);
      setConnectionQuality('error');
    }
  }, [endpoint, heartbeatInterval, reconnectInterval, maxReconnectAttempts, reconnectDelay]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      reconnectTimeoutRef.current && clearTimeout(reconnectTimeoutRef.current);
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
      setConnectionQuality('disconnected');
    }
  }, []);

  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      if (!isConnected) {
        let attempt = 0;
        const reconnect = () => {
          if (attempt < maxReconnectAttempts) {
            attempt++;
            console.log(`Reconnect attempt ${attempt}/${maxReconnectAttempts}`);
            connect();
          } else {
            console.log('Max reconnect attempts reached');
          }
        };

        reconnect();
      } else {
        console.log('Reconnect already scheduled');
      }
    }, reconnectDelay);
  }, [isConnected, maxReconnectAttempts, reconnectDelay, connect]);

  const send = useCallback((data) => {
    const message = JSON.stringify(data);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
      return true;
    }

    // Queue message if not connected
    if (messageQueue.current.length < 100) {
      messageQueue.current.push(message);
    }

    return false;
  }, []);

  const addListener = useCallback((listener) => {
    listenersRef.current.push(listener);
    return () => {
      listenersRef.current = listenersRef.current.filter(l => l !== listener);
    };
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    connectionQuality,
    lastUpdate,
    connect,
    disconnect,
    send,
    addListener,
  };
};

export { useRealTimeUpdates };
