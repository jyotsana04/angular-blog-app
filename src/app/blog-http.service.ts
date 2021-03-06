import { Injectable } from '@angular/core';

import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http'
import { Observable} from "rxjs";
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {

  public allBlogs;
  public currentBlog;
  public baseUrl = 'https://blogapp.edwisor.com/api/v1/blogs';
  private authToken = 'NTMwODZjYzNjODQ0YjA2NjMzM2VjMDBiMTY4NTJjODI2MDUxODIyMGNjMmIxMGFhZjRjYTA3OWQ0YjMyODEzZDEwNDQ1NTUyYTJlOTljMGYzZGRkNTIxYmYwMzEzYTg4ZmUxYzI4ZGQ3ZTgyNTljNjFmZjNiYTFkOWYyMTVmMTZhNw==';

  constructor(private _http:HttpClient) {
    console.log("blog http service was called")
   }

  private handleError(err:HttpErrorResponse){
    console.log("handles error of http calls");
    console.log(err.message)
    return Observable.throw(err.message)
  }

  public getAllBlogs():any {

    let myResponse = this._http.get(this.baseUrl+'/all?authToken='+ this.authToken);
    console.log("from func get all blogs");
    console.log(myResponse);
    return myResponse;
  }
  
  public getSingleBlog(currentBlogId): any {
  
    let myResponse = this._http.get(this.baseUrl+'/view/'+ currentBlogId + '?authToken=' + this.authToken)
    return myResponse
    
  }

  public createBlog(blogData): any {
    let myResponse = this._http.post(this.baseUrl+ '/create?authToken='+ this.authToken, blogData)
    return myResponse
  }

  public deleteBlog(blogId):any {
    let data ={}
    let myResponse = this._http.post(this.baseUrl + '/'+ blogId + '/delete?authToken=' + this.authToken, data)
    return myResponse
  }

  public editBlog(blogId, blogData):any {
    
    let myResponse = this._http.put(this.baseUrl + '/'+ blogId + '/edit?authToken=' + this.authToken, blogData)
    return myResponse
  }
}
