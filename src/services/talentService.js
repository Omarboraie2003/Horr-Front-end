import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

/**
 * talentService.js
 * API calls for freelancer/talent search and management
 */

/**
 * Search freelancers with optional filters and pagination
 * @param {Object} params
 * @param {string} params.searchQuery - Search query (optional)
 * @param {string[]} params.skillIds - Array of skill IDs (optional)
 * @param {number} params.minHourlyRate - Minimum hourly rate (optional)
 * @param {number} params.maxHourlyRate - Maximum hourly rate (optional)
 * @param {number} params.minYearsExperience - Minimum years of experience (optional)
 * @param {number} params.minTrustScore - Minimum trust score (optional)
 * @param {boolean} params.isVerified - Filter by verified status (optional)
 * @param {string} params.sortBy - Sort field (default: "TrustScore")
 * @param {boolean} params.sortDescending - Sort direction (default: true)
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.pageSize - Page size (default: 10)
 * @returns {Promise} Response with items, pagination info
 */
export const searchFreelancers = async (params = {}) => {
  const defaults = {
    sortBy: "TrustScore",
    sortDescending: true,
    page: 1,
    pageSize: 10,
  };

  const queryParams = { ...defaults, ...params };

  try {
    const response = await apiClient.get(ENDPOINTS.TALENT.searchFreelancers, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching freelancers:", error);
    throw error;
  }
};

/**
 * Get a single freelancer's profile by ID
 * @param {string} freelancerId
 * @returns {Promise} Freelancer profile data
 */
export const getFreelancerById = async (freelancerId) => {
  try {
    const response = await apiClient.get(
      ENDPOINTS.TALENT.getFreelancerById.replace("{id}", freelancerId)
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching freelancer ${freelancerId}:`, error);
    throw error;
  }
};

/**
 * Save/bookmark a freelancer
 * @param {string} freelancerId
 * @returns {Promise}
 */
export const saveFreelancer = async (freelancerId) => {
  try {
    const response = await apiClient.post(
      `/client/freelancers/${freelancerId}/save`
    );
    return response.data;
  } catch (error) {
    console.error(`Error saving freelancer ${freelancerId}:`, error);
    throw error;
  }
};

/**
 * Unsave/unbookmark a freelancer
 * @param {string} freelancerId
 * @returns {Promise}
 */
export const unsaveFreelancer = async (freelancerId) => {
  try {
    const response = await apiClient.delete(
      `/client/freelancers/${freelancerId}/save`
    );
    return response.data;
  } catch (error) {
    console.error(`Error unsaving freelancer ${freelancerId}:`, error);
    throw error;
  }
};
