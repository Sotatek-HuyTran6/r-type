import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './auth/reducers';
import categoryList from './category/category-list/reducers';
import cateogryDetail from './category/category-detail/reducers';
import createCategory from './category/create-category/reducers';
import editCategory from './category/edit-category/reducers';
import userList from './user/user-list/reducers';
import userDetail from './user/user-detail/reducers';
import adminList from './sub-admin/admin-list/reducers';
import adminDetail from './sub-admin/admin-detail/reducers';
import createAdmin from './sub-admin/create-admin/reducers';
import editAdmin from './sub-admin/edit-admin/reducers';
import paymentList from './payment/payment-list/reducers';
import verifyPayment from './payment/verify-payment/reducers';
import topPurchaseStatistics from './statistics/top-purchase/reducers';
import purchaseStatistics from './statistics/purchase/reducers';
import houseStatistics from './statistics/houses/reducers';
import postList from './post/post-list/reducers';
import editPost from './post/edit-post/reducers';

const reducer = combineReducers({
  auth,
  categoryList,
  cateogryDetail,
  createCategory,
  editCategory,
  userList,
  userDetail,
  adminList,
  adminDetail,
  createAdmin,
  editAdmin,
  paymentList,
  verifyPayment,
  topPurchaseStatistics,
  purchaseStatistics,
  houseStatistics,
  postList,
  editPost,
});

const store = configureStore({
  reducer,
});

export default store;
