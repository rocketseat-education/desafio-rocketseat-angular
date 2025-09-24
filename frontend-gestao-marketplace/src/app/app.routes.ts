import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Layout } from './pages/layout/layout';
import { Login } from './pages/login/login';
import { NewProduct } from './pages/new-product/new-product';
import { Products } from './pages/products/products';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'products',
        component: Products,
      },
      {
        path: 'new-product',
        component: NewProduct,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
