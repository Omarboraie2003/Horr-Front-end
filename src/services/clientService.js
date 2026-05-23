import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export const getClientProfile = async () => {
  const response = await apiClient.get(ENDPOINTS.CLIENT.ME);
  return response.data;
};

export const getOnboardingStatus = async () => {
  const response = await apiClient.get(ENDPOINTS.CLIENT.ONBOARDING);
  return response.data;
};

export const getClientJobs = async () => {
  const response = await apiClient.get(ENDPOINTS.CLIENT.JOBS);
  return response.data;
};

// Profile & Settings
export const getUserProfile = async () => {
  const response = await apiClient.get(ENDPOINTS.USER_PROFILE.BASE);
  // Extract data wrapper if present (common in .NET responses)
  return response.data?.data || response.data;
};

export const updateName = async (name) => {
  // The API expects a raw string in the body for these patch endpoints
  const response = await apiClient.patch(ENDPOINTS.USER_PROFILE.UPDATE_NAME, JSON.stringify(name), {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};

export const updateEmail = async (email) => {
  const response = await apiClient.patch(ENDPOINTS.USER_PROFILE.UPDATE_EMAIL, JSON.stringify(email), {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};

export const updateLocation = async (locationData) => {
  const response = await apiClient.patch(ENDPOINTS.USER_PROFILE.UPDATE_LOCATION, locationData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  return response.data;
};

export const changePassword = async (passwords) => {
  const response = await apiClient.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, passwords);
  return response.data;
};

// Billing
export const getWalletBalance = async () => {
  const response = await apiClient.get(ENDPOINTS.BILLING.WALLET_BALANCE);
  return response.data;
};

export const addPaymentMethod = async (paymentData) => {
  const response = await apiClient.post(ENDPOINTS.USER_PROFILE.PAYMENT_METHOD, paymentData);
  return response.data;
};

export const updatePaymentMethod = async (methodId, paymentData) => {
  const response = await apiClient.patch(`${ENDPOINTS.USER_PROFILE.PAYMENT_METHOD}/${methodId}`, paymentData);
  return response.data;
};

export const deletePaymentMethod = async (methodId) => {
  const response = await apiClient.delete(`${ENDPOINTS.USER_PROFILE.PAYMENT_METHOD}/${methodId}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await apiClient.post(ENDPOINTS.JOBS.CREATE, jobData);
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get(ENDPOINTS.CATEGORIES);
  return response.data;
};

export const getSkills = async () => {
  const response = await apiClient.get(ENDPOINTS.SKILLS);
  return response.data;
};

export const getUserPaymentMethods = async () => {
  const response = await apiClient.get(ENDPOINTS.USER_PROFILE.BASE);
  return response.data?.data?.paymentMethods || [];
};
