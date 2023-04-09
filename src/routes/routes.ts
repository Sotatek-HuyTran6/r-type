import LoginPage from '../pages/signin/';
import { RouteObject } from 'types/route';
import HomePage from '../pages/home';
import UserList from 'pages/user/list';
import AdminList from 'pages/admin/list';
import CreateAdmin from 'pages/admin/create';
import PaymentList from 'pages/payment/list';
import PostList from 'pages/post/list';

export const paths = {
  home: '/',
  signin: '/signin',

  // category
  categoryList: '/category',
  createCateogry: '/category/create',
  editCategory: 'category/:_id/edit',
  test: 'category/test',

  // user
  userList: '/user',

  // admin
  adminList: '/sub-admin',
  createAdmin: '/sub-admin/create',

  // payment
  paymentList: '/payment',

  // post
  post: '/post',
};

export const mainRoutes: RouteObject[] = [
  { path: paths.signin, component: LoginPage, isPublic: true },
  { path: paths.home, component: HomePage },
  { path: paths.userList, component: UserList },
  { path: paths.adminList, component: AdminList },
  { path: paths.createAdmin, component: CreateAdmin },
  { path: paths.paymentList, component: PaymentList },
  { path: paths.post, component: PostList },
];
