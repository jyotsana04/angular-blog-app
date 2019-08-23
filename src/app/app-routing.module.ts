import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path:'home', component:HomeComponent},
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'about', component:AboutComponent},
    {path:'blog/:blogId', component:BlogViewComponent},
    {path:'edit/:blogId', component:BlogEditComponent},
    {path:'create', component:BlogCreateComponent},
    {path:'**', component:NotfoundComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
