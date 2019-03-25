import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services';
import { PagerService } from 'src/app/services/pager.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css'],

})
export class ListuserComponent implements OnInit {
  results: Object;
  searchTerm$ = new Subject<string>();
  id;
  searchText = null;
  public error = null;
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  submit = false;
  constructor(private httpService: HttpService, private http: HttpClient, private router: Router, private pagerService: PagerService) { }
  ngOnInit() {
    this.httpService.get(config.userUrl).subscribe(
      data => this.handleResponse(data),
    );
  }
  handleResponse(data) {
    this.results = data['data'];
    this.allItems = data['data'];
    this.setPage(1);
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  handleError(error) {
    this.error = error.message;
    this.router.navigateByUrl('/zzz');
  }
  deleteUser(id) {
    if (confirm('Are you sure delete id =  ' + id)) {
      return this.httpService.delete(config.userUrl + id).subscribe(
        data => this.handleDelete(data),
      );
    }
  }
  handleDelete(data) {
    console.log(data);
    this.httpService.get(config.userUrl).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleSearch() {
    console.log(this.searchText);
    const formData = new FormData();
    formData.append('searchText', this.searchText);
    return this.httpService.search(config.url + 'search', formData).subscribe(data => this.handleResponse(data));
  }
  sortName() {
    this.submit = !this.submit;
    // this.pagedItems = this.allItems;
    if (this.submit) {
      this.allItems.sort(function(a, b) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      this.allItems.sort(function(a, b) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }
    this.pager = this.pagerService.getPager(this.allItems.length, 1);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
