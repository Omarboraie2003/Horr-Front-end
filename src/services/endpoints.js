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
  },
  
  CATEGORIES: '/Categories',
  SKILLS: '/Skills',

  CONVERSATIONS: {
    SEND_MESSAGE: '/chat/{conversationId}/messages/text',
  },

  TALENT: {
    searchFreelancers: '/client/freelancers/search',
    saveFreelancer: '/client/freelancers/{freelancerId}/save',
    unsaveFreelancer: '/client/freelancers/{freelancerId}/unsave',
     recommendedFreelancers: '/Recommendations/freelancers',
  },

  PROPOSALS: {
  REJECT: '/Proposals/{id}/reject',
  CREATE_OFFER: '/Contracts/create-offer',
},

  JOB_INVITATIONS: {
    BASE: '/jobinvitations',
    WITHDRAW: '/jobinvitations/{id}/withdraw',
    ACCEPT: '/jobinvitations/{id}/accept',
    DECLINE: '/jobinvitations/{id}/decline',
    DETAIL: '/jobinvitations/{id}',
    CLIENT: '/jobinvitations/client',
    FREELANCER: '/jobinvitations/freelancer',
  CONTRACTS: {
    MY_CONTRACTS: '/api/contracts/my-contracts',
    GET_CONTRACT: (id) => `/api/contracts/${id}`,
    SUBMIT_REVIEW: (id) => `/api/contracts/${id}/reviews`,
  },
  DELIVERIES: {
    GET_BY_CONTRACT: '/api/deliveries',
    APPROVE: (id) => `/api/deliveries/${id}/approve`,
    REVISION: (id) => `/api/deliveries/${id}/revision`,
    DISPUTE: (id) => `/api/deliveries/${id}/dispute`,
    DOWNLOAD: (id) => `/api/deliveries/attachments/${id}/download`,
  },
  CHAT: {
    LIST: '/api/chat',
    MESSAGES: (chatId) => `/api/chat/${chatId}/messages`,
    SEND_TEXT: (chatId) => `/api/chat/${chatId}/messages/text`,
    SEND_FILE: (chatId) => `/api/chat/${chatId}/messages/file`,
    BY_CONTRACT: (contractId) => `/api/chat/by-contract/${contractId}`,
  },
};
