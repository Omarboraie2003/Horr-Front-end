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
    PUBLIC: '/UserProfile/public/{userIdHash}',
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
    UPDATE: '/Jobs/update-job',
    DELETE: '/Jobs/delete-job',
    CLIENT_PROPOSALS: '/client/proposals',
    DETAILS: '/Jobs/jobs/{id}',
  },

  CATEGORIES: '/Categories',
  SKILLS: '/Skills',

  CONVERSATIONS: {
    SEND_MESSAGE: '/Conversations/{conversationId}/messages',
  },

  TALENT: {
    searchFreelancers: '/client/freelancers/search',
    saveFreelancer: '/client/freelancers/{freelancerId}/save',
    unsaveFreelancer: '/client/freelancers/{freelancerId}/unsave',
    getSavedFreelancers: '/client/freelancers/saved',
    recommendedFreelancers: '/Recommendations/freelancers',
  },

  PROPOSALS: {
    REJECT: '/Proposals/{id}/reject',
    CREATE_OFFER: '/Contracts/create-offer',
  },


};
