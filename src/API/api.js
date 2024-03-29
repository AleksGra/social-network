import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '9cdcc3dd-4d88-43f1-ac10-42258dd98608',
  },
});

export const usersAPI = {
  fetchUsers(currentPage = 1, pageSize = 5) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
      return response.data;
    });
  },
  followUser(userId) {
    return instance.post(`follow/${userId}`).then(response => {
      return response.data;
    });
  },
  unfollowUser(userId) {
    return instance.delete(`follow/${userId}`).then(response => {
      return response.data;
    });
  },
};
export const authAPI = {
  fetchAuthUser(userId) {
    return instance.get(`profile/${userId}`).then(response => {
      return response.data;
    });
  },
  getMe() {
    return instance.get(`auth/me`).then(response => {
      return response.data;
    });
  },
  login(email, password, rememberMe,captcha) {
    return instance.post(`auth/login`, { email, password, rememberMe,captcha }).then(response => {
      return response.data;
    });
  },
  logout() {
    return instance.delete(`auth/login`).then(response => {
      return response.data;
    });
  },
};
export const profileAPI = {
  getProfileStatus(userId) {
    return instance.get(`profile/status/${userId}`).then(response => {
      return response.data;
    });
  },
  updateProfileStatus(status) {
    return instance.put(`profile/status`, { status: status }).then(response => {
      return response.data;
    });
  },
  updateProfilePhoto(file) {
    const formData = new FormData();
    formData.append('image', file);
    return instance
      .put(`profile/photo`, formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
      .then(response => {
        return response.data;
      });
  },
  saveProfile(profile) {
    return instance.put(`profile`,  profile ).then(response => {
      return response.data;
    });
  },
};
export const securityAPI = {
  getCaptchaUrl(userId) {
    return instance.get(`security/get-captcha-url`).then(response => {
      return response;
    });
  },
}
