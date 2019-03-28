import { Injectable } from '@angular/core';
import { system } from '../config/system';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = system.pageSize) {
    const totalPages = Math.ceil(totalItems / pageSize);
    console.log('tong so page: ' + totalPages);
    if (currentPage < 1) {
              currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    let startPage: number;
    let endPage: number;
    if (totalPages <= system.totalPages) {
        // total page < 10 show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // total page > 10 caculate start-end page
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
    // calculate start-end index
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;

    // create an array of pages
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
   // console.log(pages);
    return {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages
    };
}
}
