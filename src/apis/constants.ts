const API_DOMAIN = import.meta.env.REACT_APP_DOMAIN || "http://localhost:8080"; 

const API_BASE = `${API_DOMAIN}/api/v2`
const AUTH_API = `${API_BASE}/auth`;
const USER_API = `${API_BASE}/users`;
const ADMIN_API = `${API_BASE}/admins`;
const FILE_API = `${API_BASE}/files`;
const MEMBER_ONE_DAY_TICKET_API = `${MEMBER_API}/me/one-day-tickets`;
const BOARD_COMMENT_API = (boardId: number) => `${BOARD_API}/${boardId}/comments`;