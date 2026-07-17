export const NOTIFICATIONS_ACTIONS = {
  HYDRATE: 'HYDRATE_NOTIFICATIONS',
  ADD: 'ADD_NOTIFICATION',
  MARK_READ: 'MARK_READ',
  MARK_ALL_READ: 'MARK_ALL_READ',
  CLEAR: 'CLEAR_NOTIFICATIONS',
};

export const initialNotificationsState = []; // array of { id, title, message, isRead, createdAt }

export function notificationsReducer(state, action) {
  switch (action.type) {
    case NOTIFICATIONS_ACTIONS.HYDRATE:
      return action.payload;

    case NOTIFICATIONS_ACTIONS.ADD:
      return [
        {
          id: crypto.randomUUID(),
          title: action.payload.title,
          message: action.payload.message,
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        ...state,
      ];

    case NOTIFICATIONS_ACTIONS.MARK_READ:
      return state.map((n) =>
        n.id === action.payload.id ? { ...n, isRead: true } : n
      );

    case NOTIFICATIONS_ACTIONS.MARK_ALL_READ:
      return state.map((n) => ({ ...n, isRead: true }));

    case NOTIFICATIONS_ACTIONS.CLEAR:
      return [];

    default:
      return state;
  }
}
