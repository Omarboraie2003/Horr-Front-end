export const ENDPOINTS = {
  USER: {
    PROFILE: '/user/profile',
  },
  CLIENT: {
    ME: '/client/me',
    ONBOARDING: '/client/onboarding',
    JOBS: '/client/jobs',
  },
  USER_PROFILE: {
    BASE: '/UserProfile',
    UPDATE_NAME: '/UserProfile/name',
    UPDATE_EMAIL: '/UserProfile/email',
    UPDATE_LOCATION: '/UserProfile/location',
    PAYMENT_METHOD: '/UserProfile/payment-method',
  },
  BILLING: {
    WALLET_BALANCE: '/Billing/wallet-balance',
  },
  AUTH: {
    LOGIN: '/Auth/login',
    REGISTER: '/Auth/register',
    CHANGE_PASSWORD: '/Auth/change-password',
    REFRESH_TOKEN: '/Auth/refresh-token',
    LOGOUT: '/Auth/logout',
  },
  JOBS: {
    CREATE: '/Jobs/create-job',
    LIST: '/Jobs/jobs',
  },
  CATEGORIES: '/Categories',
  SKILLS: '/Skills',
};
