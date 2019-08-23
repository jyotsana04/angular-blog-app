import { Component, OnInit } from '@angular/core';

import {BlogHttpService} from '../blog-http.service'
import {ActivatedRoute, Router} from '@angular/router'

import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  public currentBlog;
  public possibleCategories = ["Comedy", "Drama", "Action", "Technology"]

  constructor(private blogHttpService:BlogHttpService, private _route:ActivatedRoute, private router:Router,
    private toastr:ToastrService) { }

  ngOnInit() {

    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId)
    this.blogHttpService.getSingleBlog(myBlogId).subscribe(

      data=>{
        console.log(data);
        this.currentBlog = data["data"]
        console.log("current blog is")
        console.log(this.currentBlog)
      },
      error=>{
        console.log("error occured while fetching blog for edit");
        console.log(error.errorMessage);
      }
    )
  }

  public editThisBlog():any {
    this.blogHttpService.editBlog(this.currentBlog.blogId, this.currentBlog).subscribe(

      data=>{
        console.log("blog edited successfullly");
        this.toastr.success('blog edited successfully')
        setTimeout(()=>{
          this.router.navigate(['/blog', this.currentBlog.blogId])
        }, 1000)
      }, 
      error=>{
        console.log("some error occcured in editing")
        console.log(error.errorMessage);

      }
    )
  }

}
