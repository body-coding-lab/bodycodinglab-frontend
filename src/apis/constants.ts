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
export const MEMBER_COUPON_API = `${MEMBER_API}/me/coupons`;
export const TRAINER_COUPON_API = `${TRAINER_API}/me/coupons`;
export const GET_MEMBER_COUPON_API = (status: string) => `${MEMBER_COUPON_API}?status=${status}`;
export const GET_TRAINER_COUPON_API = (status: string) => `${TRAINER_COUPON_API}?status=${status}`;
export const PUT_MEMBER_COUPON_API = (couponId: number) => `${MEMBER_COUPON_API}/${couponId}`;
export const PUT_TRAINER_COUPON_API = (couponId: number) => `${TRAINER_COUPON_API}/${couponId}`
export const NOTE_API = `${API_BASE}/notes`;
export const MEMBER_FORM_API = `${MEMBER_API}/me/form`;
export const MATCH_WAITING_LIST_API = (trainerId: number) => `${MEMBER_API}/me/match_waiting-list/${trainerId}`;
export const MEMBER_MATCH_WAITING_LIST_API = `${MEMBER_API}/me/match-waiting-list`;
export const TRAINER_MATCH_WAITING_LIST_API = `${TRAINER_API}/me/match-waiting-list`;
export const PUT_APPROVE_TRAINER_MATCH_WAITING_LIST_API = (matchWaitingListId: number) => `${TRAINER_MATCH_WAITING_LIST_API}/${matchWaitingListId}/approves`;
export const PUT_REJECT_TRAINER_MATCH_WAITING_LIST_API = (matchWaitingListId: number) => `${TRAINER_MATCH_WAITING_LIST_API}/${matchWaitingListId}/rejects`
export const DELETE_CANCEL_MEMBER_MATCH_WAITING_LIST_API = (matchWaitingListId: number) => `${MEMBER_MATCH_WAITING_LIST_API}/${matchWaitingListId}`;
export const MEMBER_MATCH_API = `${MEMBER_API}/me/match-list`;
export const TRAINER_MATCH_API = `${TRAINER_API}/me/match-list`;
export const TRAINER_FIND_MEMBER_MATCH_API = (matchId: number) => `${TRAINER_MATCH_API}/${matchId}`;
export const DELETE_MEMBER_MATCH_API = (matchId: number) => `${MEMBER_MATCH_API}/${matchId}`;
export const MEMBER_SUBSCRIPTION_API = `${MEMBER_API}/me/subscription`;
export const PAYMENT_API = `${MEMBER_API}/me/payment`;
const BOARD_API = `${API_BASE}/boards`;
const BOARD_COMMENT_API = (boardId: number) => `${BOARD_API}/${boardId}/comments`;

