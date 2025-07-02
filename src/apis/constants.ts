const API_DOMAIN = import.meta.env.REACT_APP_DOMAIN || "http://localhost:8080"; 

const API_BASE = `${API_DOMAIN}/api/v2`;
const AUTH_API = `${API_BASE}/auth`;
const USER_API = `${API_BASE}/users`;
const MEMBER_API = `${API_BASE}/members`
const TRAINER_API = `${API_BASE}/trainers`;
const COMMON_API = `${API_BASE}/common`;
const ADMIN_API = `${API_BASE}/admins`;
const FILE_API = `${API_BASE}/files`;
const TRAINER_ONE_DAY_TICKET_API = `${TRAINER_API}/me/one-day-tickets`;
const MEMBER_ONE_DAY_TICKET_API = `${MEMBER_API}/me/one-day-tickets`;
const MEMBER_COUPON_API = `${MEMBER_API}/me/coupons`;
const TRAINER_COUPON_API = `${TRAINER_API}/me/coupons`;
const NOTE_API = `${API_BASE}/notes`;
const MEMBER_FORM_API = `${MEMBER_API}/me/form`;
const MATCH_WAITING_LIST_API = (trainerId: number) => `${MEMBER_API}/me/match_waiting-list/${trainerId}`;
const MEMBER_MATCH_WAITING_LIST_API = `${MEMBER_API}/me/match-waiting-list`;
const TRAINER_MATCH_WAITING_LIST_API = `${TRAINER_API}/me/match-waiting-list`;
const MEMBER_MATCH_API = `${MEMBER_API}/me/match-list`;
const TRAINER_MATCH_API = `${TRAINER_API}/me/match-list`;
const MEMBER_SUBSCRIPTION_API = `${MEMBER_API}/me/subscription`;
const PAYMENT_API = `${MEMBER_API}/me/payment`;
const BOARD_API = `${API_BASE}/boards`;
const BOARD_COMMENT_API = (boardId: number) => `${BOARD_API}/${boardId}/comments`;

