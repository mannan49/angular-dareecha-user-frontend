import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@shared/guard/auth.guard';

import { ApplicationResolver } from '@shared/resolvers/application.resolver';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    resolve : { user: ApplicationResolver },
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('@features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'notes',
        loadChildren: () => import('@features/notes/notes.module').then(m => m.NotesModule),
      },
      {
        path: 'quiz',
        loadChildren: () => import('@features/quiz/quiz.module').then(m => m.QuizModule),
      }
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    // canActivate: [AuthGuard],
    data: { guestOnly: true },
    loadChildren: () => import('@features/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
