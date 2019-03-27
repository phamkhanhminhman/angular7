import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services';
import { PagerService } from 'src/app/services/pager.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config/config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css'],

})
export class ListuserComponent implements OnInit {
  queryUrl = '?query=';
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
  constructor(private httpService: HttpService, private router: Router, private pagerService: PagerService) { }
  ngOnInit() {
    this.httpService.get(config.userUrl + this.queryUrl).subscribe(
      data => this.handleResponse(data),
    );
  }
  handleResponse(data) {
    this.allItems = data['data'];
    this.setPage(1);
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    console.log('pager ' + this.pager.pages);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  handleError(error) {
    this.error = error.message;
    this.router.navigateByUrl('/err');
  }
  deleteUser(id) {
    if (confirm('Are you sure delete id =  ' + id)) {
      return this.httpService.delete(config.userUrl + id).subscribe(
        data => this.handleDelete(data),
      );
    }
  }
  handleDelete(data) {
    this.httpService.get(config.userUrl + this.queryUrl).subscribe(
      x => this.handleResponse(x)
    );
  }
  handleSearch() {
    return this.httpService.get(config.userUrl + this.queryUrl + this.searchText).subscribe(data => this.handleResponse(data));
  }
  sortName() {
    this.submit = !this.submit;
    // this.pagedItems = this.allItems;
    if (this.submit) {
      this.allItems.sort((a, b) => {
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
      this.allItems.sort((a, b) => {
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
