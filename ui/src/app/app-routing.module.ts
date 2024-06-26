import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageComponent } from './layout/page/page.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { MissionsComponent } from './pages/missions/missions.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: PageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'missions',
        component: MissionsComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
