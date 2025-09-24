import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../services/user';
import { UserAuthService } from '../services/user-auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  //Não possui token no localstorage
  const HAS_TOKEN = _userAuthService.getUserToken();
  if (!HAS_TOKEN) {
    return _router.navigate(['login']);
  }

  try {
    //Tenta validar o token no backend
    await firstValueFrom(_userService.validateUser());

    // Se o token é válido e a rota não é a de login, permite o acesso para a rota desejada.
    return true;
  } catch (error) {
    // Se o token é inválido, redireciona para a página de login
    return _router.navigate(['login']);
  }
};
