import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services';
import { PagerService } from 'src/app/services/pager.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config/config';
import { Router } from '@angular/router';
import { system } from 'src/app/config/system';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css'],

})
export class ListuserComponent implements OnInit {
  orderBy = '';
  id;
  length;
  currentPage;
  searchText = '';
  public error = null;
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  submit = false;
  constructor(private httpService: HttpService, private router: Router, private pagerService: PagerService) { }
  get() {
    this.httpService.get(config.userUrl + config.queryUrl + config.pageUrl +
      config.pageSizeUrl + system.pageSize + config.sortUrl).subscribe(
        data => this.handleResponse(data),
      );
  }
  ngOnInit() {
    this.get();
  }
  handleResponse(data) {
    this.allItems = data['data'];
    console.log(this.allItems);
    this.length = data['length'];
    this.pager = this.pagerService.getPager(this.length, 1);
    // this.setPage(1);
  }
  setPage(page: number) {
    this.currentPage = page;
    this.httpService.get(config.userUrl + config.queryUrl + config.pageUrl + page +
      config.pageSizeUrl + system.pageSize + config.sortUrl + this.orderBy).subscribe(
        data => this.handlePagination(data, this.currentPage),
      );
  }
  handlePagination(data, page) {
    this.allItems = data['data'];
    this.length = data['length'];
    this.pager = this.pagerService.getPager(this.length, page);
  }
  handleError(error) {
    this.error = error.message;
    this.router.navigateByUrl('/err');
  }
  deleteUser(id) {
    if (confirm('Are you sure delete id =  ' + id)) {
      return this.httpService.delete(config.userUrl + id).subscribe(
        data => this.get(),
      );
    }
  }
  handleSearch() {
    if (this.searchText === '') {
      this.get();
    } else {
      return this.httpService.get(config.userUrl + config.queryUrl + this.searchText +
        config.pageUrl + config.pageSizeUrl + config.sortUrl).subscribe(
          data => this.searchPagination(data));
    }
  }
  searchPagination(data) {
    this.allItems = data['data'];
    this.pager = this.pagerService.getPager(this.allItems.length);
  }
  sortGroup() {
    this.submit = !this.submit;
    if (this.submit) {
      this.orderBy = 'asc';
      this.httpService.get(config.userUrl + config.queryUrl + this.searchText +
        config.pageUrl + config.pageSizeUrl + system.pageSize + config.sortUrl + this.orderBy).subscribe(
          data => this.handleSort(data));
    } else {
      this.orderBy = 'desc';
      this.httpService.get(config.userUrl + config.queryUrl + this.searchText +
        config.pageUrl + config.pageSizeUrl + system.pageSize + config.sortUrl + this.orderBy).subscribe(
          data => this.handleSort(data));
    }
  }
  handleSort(data) {
    this.allItems = data['data'];
    this.pager = this.pagerService.getPager(this.length, 1);
  }
}
