import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage < 1) {
              currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    let startPage: number;
    let endPage: number;
    if (totalPages <= 10) {
        // total page < 10 show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // total page > 10 caculate start-end page
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else {
            startPage = totalPages - 9;
            endPage = totalPages;
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
