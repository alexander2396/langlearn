import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: 'west-languages', loadChildren: () => import('./west-languages/west-languages.module').then(m => m.WestLanguagesModule) },
	{ path: 'japanese', loadChildren: () => import('./japanese/japanese.module').then(m => m.JapaneseModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
