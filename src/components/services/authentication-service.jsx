import axios from 'axios';

const signin_service = {
  checkAuthentication: async () => {
    try {
      const response = await axios.get('/api/check-authentication');
      return response.data.isAuthenticated;
    } catch (error) {
      console.error('Failed to check authentication:', error);
      throw error;
    }
  },
};

export default signin_service;