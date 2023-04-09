export const API = {
  // auth
  signin: '/realms/nhatrotot/protocol/openid-connect/token',

  categoryList: 'category',
  createCategory: 'category',
  categoryDetail: 'category',
  editCategory: 'category',

  // user
  userList: 'api/users',
  createUser: 'api/users',
  userDetail: 'api/users',
  editUser: 'api/users',
  banUser: 'api/auth/users',
  me: '/api/users/me/my-info',

  // subadmin:
  adminList: 'api/users/admin/users',
  createAdmin: 'api/auth/sub-admin',
  adminDetail: 'api/admin',
  editAdmin: 'api/admin',

  // payment
  paymentList: 'api/payment/admin/payments',
  verifyPayment: 'api/payment/manual/verify',

  // statitic
  topPurchase: 'api/statistics/top-purchase',
  purchase: '/api/statistics/purchase',
  houses: 'api/statistics/houses',

  post: 'api/houses',
  editPost: 'api/houses',
};
