import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

// Mock notifications - will be replaced with API calls
const mockNotifications = [
  {
    id: 1,
    type: 'session',
    title: 'Upcoming Session',
    message: 'Session with Alex Thompson scheduled for tomorrow at 2:00 PM',
    timestamp: '2025-04-15T14:00:00',
    priority: 'high',
    read: false,
  },
  {
    id: 2,
    type: 'progress',
    title: 'Progress Milestone',
    message: 'Emma Davis has achieved 3 therapy goals this month',
    timestamp: '2025-04-14T09:30:00',
    priority: 'medium',
    read: false,
  },
  {
    id: 3,
    type: 'report',
    title: 'Monthly Report Available',
    message: 'March 2025 therapy progress report is ready for review',
    timestamp: '2025-04-13T16:45:00',
    priority: 'low',
    read: true,
  },
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulating API call to fetch notifications
    setNotifications(mockNotifications);
    updateUnreadCount(mockNotifications);
  }, []);

  const updateUnreadCount = (notifs) => {
    setUnreadCount(notifs.filter(n => !n.read).length);
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };
    setNotifications(prev => [newNotification, ...prev]);
    updateUnreadCount([newNotification, ...notifications]);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    updateUnreadCount(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== id)
    );
    updateUnreadCount(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
