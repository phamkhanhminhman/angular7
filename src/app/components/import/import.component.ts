import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { config } from 'src/app/config';
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  fileData = null;
  data;
  constructor(private http: HttpClient, private httpService: HttpService) { }

  ngOnInit() {
  }
  handleFile(fileInput: any) {
    this.fileData = fileInput.target.files[0] ;
  }
  onSubmit() {
    console.log(this.fileData);
    const formData = new FormData();
    formData.append('excel', this.fileData);
    
    this.http.post(config.url + 'import', formData, this.httpService.handleHeader())
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      });
  }

}
