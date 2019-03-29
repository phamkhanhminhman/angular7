import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services';
import { PagerService } from 'src/app/services/pager.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/config/config';
import { Router } from '@angular/router';
import { system } from 'src/app/config/system';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css'],

})
export class ListuserComponent implements OnInit {
  orderBy = '';
  id;
  length;
  currentPage = 1;
  searchText = '';
  pageSize = 5;
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
      config.pageSizeUrl + this.pageSize + config.sortUrl).subscribe(
        data => this.handleResponse(data),
      );
  }
  ngOnInit() {
    this.get();
  }
  showList() {
    console.log(this.pageSize);
    this.pagerService.pSize(this.pageSize);
    this.setPage(this.currentPage);
  }
  handleResponse(data) {
    this.allItems = data['data'.toString()];
    console.log(this.allItems);
    this.length = data['length'.toString()];
    this.pager = this.pagerService.getPager(this.length, 1, this.pageSize);
    // this.setPage(1);
  }
  setPage(page: number) {
    this.currentPage = page;
    if (this.currentPage > 0) {
      this.httpService.get(config.userUrl + config.queryUrl + this.searchText + config.pageUrl + page +
        config.pageSizeUrl + this.pageSize + config.sortUrl + this.orderBy).subscribe(
          data => this.handlePagination(data, this.currentPage),
        );
    }
  }
  handlePagination(data, page) {
    this.allItems = data['data'.toString()];
    console.log('Text Serach nhan dc = ' + this.searchText);
    console.log('Length nhan dc = ' + this.allItems.length);
    if (this.allItems.length === 0) {
      this.setPage(this.currentPage - 1);
    } else {
      this.length = data['length'.toString()];
      this.pager = this.pagerService.getPager(this.length, page, this.pageSize);
    }
  }
  handleError(error) {
    this.error = error.message;
    this.router.navigateByUrl('/err');
  }
  deleteUser(id) {

    if (confirm('Are you sure delete id =  ' + id + 'current page = ' + this.currentPage)) {
      return this.httpService.delete(config.userUrl + id).subscribe(
        data => this.handleDelete(data, this.currentPage),
      );
    }
  }
  handleDelete(data, currentPage) {
    this.setPage(currentPage);
  }
  handleSearch() {
    if (this.searchText === '') {
      this.get();
    } else {
      return this.httpService.get(config.userUrl + config.queryUrl + this.searchText +
        config.pageUrl + config.pageSizeUrl + system.pageSize + config.sortUrl + this.orderBy).subscribe(
          data => this.searchPagination(data, this.currentPage));
    }
  }
  searchPagination(data, currentPage) {
    this.allItems = data['data'.toString()];
    console.log('so KQ retrun khi search = ' + this.allItems.length);
    this.pager = this.pagerService.getPager(this.allItems.length, this.currentPage, this.pageSize);
    this.setPage(currentPage);
  }
  sortGroup() {
    this.submit = !this.submit;
    if (this.submit) {
      this.orderBy = config.asc;
      this.httpService.get(config.userUrl + config.queryUrl + this.searchText +
        config.pageUrl + config.pageSizeUrl + system.pageSize + config.sortUrl + this.orderBy).subscribe(
          data => this.handleSort(data));
    } else {
      this.orderBy = config.desc;
      this.httpService.get(config.userUrl + config.queryUrl + this.searchText +
        config.pageUrl + config.pageSizeUrl + system.pageSize + config.sortUrl + this.orderBy).subscribe(
          data => this.handleSort(data));
    }
  }
  handleSort(data) {
    this.allItems = data['data'.toString()];
    this.pager = this.pagerService.getPager(this.length, this.currentPage, this.pageSize);
    this.setPage(this.currentPage);
  }
}
