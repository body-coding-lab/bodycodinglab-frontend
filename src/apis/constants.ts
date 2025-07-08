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
const BOARD_API = `${API_BASE}/boards`;
const BOARD_COMMENT_API = (boardId: number) => `${BOARD_API}/${boardId}/comments`;

const TRAINER_INFO_MODULE = `${TRAINER_API}/me`;

export const PUT_TRIANER_INFO = `${TRAINER_INFO_MODULE}`;

export const POST_TRIANER_CAREER = `${TRAINER_INFO_MODULE}/careers`;
export const UPDATE_TRIANER_CAREER = (careerId: number) => `${TRAINER_INFO_MODULE}/careers/${careerId}`;
export const DELETE_TRIANER_CAREER = (careerId: number) => `${TRAINER_INFO_MODULE}/careers/${careerId}`;
export const DELETE_ALL_TRIANER_CAREER = `${TRAINER_INFO_MODULE}/careers`;
export const GET_TRIANER_ALL_CAREER = `${TRAINER_INFO_MODULE}/careers`;
export const GET_TRIANER_CAREER_RECENT = `${TRAINER_INFO_MODULE}/careers/recent`;

export const POST_TRIANER_LICENSE = `${TRAINER_INFO_MODULE}/licenses`;
export const UPDATE_TRIANER_LICENSE = (licenseId: number) => `${TRAINER_INFO_MODULE}/licenses/${licenseId}`;
export const DELETE_TRIANER_LICENSE = (licenseId: number) => `${TRAINER_INFO_MODULE}/licenses/${licenseId}`;
export const DELETE_ALL_TRIANER_LICENSE = `${TRAINER_INFO_MODULE}/licenses`;
export const GET_TRIANER_ALL_LICENSE = `${TRAINER_INFO_MODULE}/licenses`;
export const GET_TRIANER_LICENSE_RECENT = `${TRAINER_INFO_MODULE}/licenses`;

export const GET_TRIANER_CAREER = `${COMMON_API}/careers`;
export const GET_TRIANER_LICENSE = `${COMMON_API}/licenses`;
export const GET_ALL_TRIANER_INFO = `${COMMON_API}/trainers`;
export const GET_TRAINER_INFO = (trainerId: number) => `${COMMON_API}/${trainerId}`;
export const GET_TRAINER_BY_NAME = `${COMMON_API}/search-name`;
export const GET_TRAINER_BY_ADDRESS = `${COMMON_API}/search-address`;

export const UPLOAD_MULTI_FILES = `${FILE_API}/multi`;
export const GET_MULTI_FILES = `${FILE_API}/multi`;
export const GET_SINGLE_MULTI_FILES = (fileId: number) => `${FILE_API}/multi/${fileId}`;
export const DELETE_MULTI_FILES = (fileId: number) => `${FILE_API}/multi/${fileId}`;

export const POST_POST = (matchId: number) => `${BOARD_API}/${matchId}`;
export const UPDATE_POST = (matchId: number) => `${BOARD_API}/${matchId}`;
export const DELETE_POST = (matchId: number, postId: number) => `${BOARD_API}/${matchId}/posts/${postId}`;
export const GET_POST_DETAIL = (matchId: number, postId: number) => `${BOARD_API}/${matchId}/posts/${postId}`;
export const GET_POST_LIST = (matchId: number) => `${BOARD_API}/${matchId}`;
export const SEARCH_POST = (matchId: number) => `${BOARD_API}/${matchId}`;

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


