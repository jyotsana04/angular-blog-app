import { Component, OnInit } from '@angular/core';
//importing activated route to get the blog id from route
import {ActivatedRoute, Router} from '@angular/router';
import { BlogService } from '../blog.service';
import {BlogHttpService} from '../blog-http.service';

import {ToastrService} from 'ngx-toastr'

import {Location} from '@angular/common'


@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  providers:[Location]
})
export class BlogViewComponent implements OnInit {

  public currentBlog;
  
  constructor(private _route: ActivatedRoute , private router : Router, private blogHttpService:BlogHttpService,
     private location:Location, private toastr:ToastrService) {
    console.log(" blog view constructor is called");
   }

  ngOnInit() {

    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    this.blogHttpService.getSingleBlog(myBlogId).subscribe(

      data=>{
        console.log(data);
        this.currentBlog = (data["data"])
      },
      error =>{
        console.log("some error occured")
        console.log(error.errorMessage)
      }
    )

    
  }

  public deleteThisBlog(){

    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(

      data=>{
        console.log(data);
        console.log("blog deleted successfully");
        this.toastr.warning('blog deleted successfully')
        setTimeout(()=>{
          this.router.navigate(['/home'])
        },1000)
      },
      error=>{
        console.log("could not delete");
        console.log(error.errorMessage);

      }
    )
  }

  public goBackToPreviousPage(): any {
    this.location.back()
  }

}
