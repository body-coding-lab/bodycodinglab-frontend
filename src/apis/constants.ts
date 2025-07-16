const API_DOMAIN = import.meta.env.REACT_APP_DOMAIN || "http://localhost:8080"; 

const API_BASE = `${API_DOMAIN}/api/v2`;
const AUTH_API = `${API_BASE}/auth`;
const USER_API = `${API_BASE}/users`;
const MY_INFO_API = `${USER_API}/me`;
const MEMBER_MY_INFO_API = `${USER_API}/members/me`;
const TRAINER_MY_INFO_API = `${USER_API}/trainers/me`;
const PROFILE_IMAGE_API = `${MY_INFO_API}/profile-image`;
const MEMBER_API = `${API_BASE}/members`
const TRAINER_API = `${API_BASE}/trainers`;
const TRAINER_INFO_MODULE = `${TRAINER_API}/me`;
const COMMON_API = `${API_BASE}/common`;
const ADMIN_API = `${API_BASE}/admins`;
const FILE_API = `${API_BASE}/files`;
const MEMBER_ONE_DAY_TICKET_API = `${MEMBER_API}/me/one-day-tickets`;
const TRAINER_ONE_DAY_TICKET_API = `${TRAINER_API}/me/one-day-tickets`;
const BOARD_API = `${API_BASE}/boards`;

export const SIGNUP_MEMBER_API = `${AUTH_API}/signup/member`;
export const SIGNUP_TRAINER_API = `${AUTH_API}/signup/trainer`;
export const LOGIN_API = `${AUTH_API}/login`;
export const USERNAME_RECOVERY_API = `${AUTH_API}/username/recovery`;
export const PASSWORD_RESET_USER_API = `${AUTH_API}/password/reset-user`;
export const PASSWORD_RESET_API = (token: string) => `${AUTH_API}/password/reset?token=${token}`;
export const PASSWORD_RESET_EMAIL_API = `${AUTH_API}/password/reset-email`;
export const EMAIL_VERIFY_API = (token: string) => `${AUTH_API}/email/verify?token=${token}`;
export const GET_ALL_TRAINERS_API = `${ADMIN_API}/trainers`;
export const GET_TRAINER_DETAIL_API = (trainerId: number) => `${GET_ALL_TRAINERS_API}/${trainerId}`;
export const UPDATE_TRAINER_STATUS_API = (trainerId: number) => `${GET_ALL_TRAINERS_API}/${trainerId}/status`;
export const GET_USER_INFO_API = MY_INFO_API;
export const GET_MEMBER_INFO_API = MEMBER_MY_INFO_API;
export const UPDATE_MEMBER_INFO_API = MEMBER_MY_INFO_API;
export const GET_TRAINER_INFO_API = TRAINER_MY_INFO_API;
export const UPDATE_TRAINER_INFO_API = TRAINER_MY_INFO_API;
export const DELETE_USER_API = MY_INFO_API;
export const UPDATE_PROFILE_IMAGE_API = PROFILE_IMAGE_API;
export const DELETE_PROFILE_IMAGE_API = PROFILE_IMAGE_API;

export const PUT_TRAINER_INFO = `${TRAINER_INFO_MODULE}`;
export const REAPPLY_TRAINER_API = `${TRAINER_INFO_MODULE}/reapply`;

export const POST_TRAINER_CAREER = `${TRAINER_INFO_MODULE}/careers`;
export const UPDATE_TRAINER_CAREER = (careerId: number) => `${TRAINER_INFO_MODULE}/careers/${careerId}`;
export const DELETE_TRAINER_CAREER = (careerId: number) => `${TRAINER_INFO_MODULE}/careers/${careerId}`;
export const DELETE_ALL_TRAINER_CAREER = `${TRAINER_INFO_MODULE}/careers`;
export const GET_TRAINER_ALL_CAREER = `${TRAINER_INFO_MODULE}/careers`;
export const GET_TRAINER_CAREER_RECENT = `${TRAINER_INFO_MODULE}/careers/recent`;

export const POST_TRAINER_LICENSE = `${TRAINER_INFO_MODULE}/licenses`;
export const UPDATE_TRAINER_LICENSE = (licenseId: number) => `${TRAINER_INFO_MODULE}/licenses/${licenseId}`;
export const DELETE_TRAINER_LICENSE = (licenseId: number) => `${TRAINER_INFO_MODULE}/licenses/${licenseId}`;
export const DELETE_ALL_TRAINER_LICENSE = `${TRAINER_INFO_MODULE}/licenses`;
export const GET_TRAINER_ALL_LICENSE = `${TRAINER_INFO_MODULE}/licenses`;
export const GET_TRAINER_LICENSE_RECENT = `${TRAINER_INFO_MODULE}/licenses`;

export const GET_TRAINER_CAREER = `${COMMON_API}/careers`;
export const GET_TRAINER_LICENSE = `${COMMON_API}/licenses`;
export const GET_ALL_TRAINER_INFO = `${COMMON_API}/trainers`;
export const GET_TRAINER_INFO = (trainerId: number) => `${COMMON_API}/${trainerId}`;
export const GET_TRAINER_BY_NAME = `${COMMON_API}/search-name`;
export const GET_TRAINER_BY_ADDRESS = `${COMMON_API}/search-address`;

export const SINGLE_FILE = (fileId: number) => `${FILE_API}/single/${fileId}`
export const UPLOAD_MULTI_FILES = `${FILE_API}/multi`;
export const GET_MULTI_FILES = `${FILE_API}/multi`;
export const GET_SINGLE_MULTI_FILES = (fileId: number) => `${FILE_API}/multi/${fileId}`;
export const DELETE_FILE = (fileId: number) => `${FILE_API}/${fileId}`;

export const CREATE_POST = (matchId: number) => `${BOARD_API}/${matchId}`;
export const UPDATE_POST = (matchId: number) => `${BOARD_API}/${matchId}`;
export const DELETE_POST = (matchId: number, postId: number) => `${BOARD_API}/${matchId}/posts/${postId}`;
export const GET_POST_DETAIL = (matchId: number, postId: number) => `${BOARD_API}/${matchId}/posts/${postId}`;
export const GET_POST_LIST = (matchId: number) => `${BOARD_API}/${matchId}`;

export const SEARCH_POST_BY_NAME = (matchId: number) => `${BOARD_API}/${matchId}/search-name`;
export const SEARCH_POST_BY_TITLE = (matchId: number) => `${BOARD_API}/${matchId}/search-title`;
export const SEARCH_POST_BY_CONTENT = (matchId: number) => `${BOARD_API}/${matchId}/search-content`;
export const GET_COMMENTS_API = (boardId: number) => `${BOARD_API}/${boardId}/comments`;

export const CREATE_COMMENTS_API = (boardId: number) => `${BOARD_API}/${boardId}/comments`;
export const UPDATE_COMMENTS_API = (boardId: number, commentId: number) => `${BOARD_API}/${boardId}/comments/${commentId}`;
export const DELETE_COMMENTS_API = (boardId: number, commentId: number) => `${BOARD_API}/${boardId}/comments/${commentId}`;

export const GET_MEMBER_ALL_TICKETS_API = MEMBER_ONE_DAY_TICKET_API;
export const GET_TRAINER_ALL_TICKETS_API = TRAINER_ONE_DAY_TICKET_API;
export const ISSUE_TICKET_API = `${TRAINER_ONE_DAY_TICKET_API}/issued`;
export const USE_TICKET_API = (ticketId: number) => `${TRAINER_ONE_DAY_TICKET_API}/${ticketId}/used`;
export const CANCEL_TICKET_API = (ticketId: number) => `${TRAINER_ONE_DAY_TICKET_API}/${ticketId}/canceled`;

export const MEMBER_COUPON_API = `${MEMBER_API}/me/coupons`;
export const TRAINER_COUPON_API = `${TRAINER_API}/me/coupons`;
export const GET_MEMBER_COUPON_API = (status: string) => `${MEMBER_COUPON_API}?status=${status}`;
export const GET_TRAINER_COUPON_API = (status: string) => `${TRAINER_COUPON_API}?status=${status}`;
export const PUT_MEMBER_COUPON_API = (couponId: number) => `${MEMBER_COUPON_API}/${couponId}`;
export const PUT_TRAINER_COUPON_API = (couponId: number) => `${TRAINER_COUPON_API}/${couponId}`

export const NOTE_API = `${API_BASE}/notes`;
export const GET_ALL_NOTE_API = (page: number, size: number )=>`${NOTE_API}?page${page}&size=${size}`;
export const FIND_BY_NOTE_ID_API = (noteId: number) => `${NOTE_API}/${noteId}`;
export const GET_RECEIVED_NOTE_API =(page: number, size: number) => `${NOTE_API}/received?page=${page}&size=${size}`;
export const GET_SENT_NOTE_API = (page: number, size: number) => `${NOTE_API}/sent?page=${page}&size=${size}`;


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



