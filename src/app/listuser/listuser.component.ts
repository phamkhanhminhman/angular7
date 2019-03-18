import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  results;
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': 'CKGjaYdbOk5LYgM8UR6FoArEcyUSlw6UYQDaz170mcxRxoJ3yQA2cUApTj1S'
      })
    };
    this.http.get("http://127.0.0.1:8000/api/users",
    {headers: {'token':'CKGjaYdbOk5LYgM8UR6FoArEcyUSlw6UYQDaz170mcxRxoJ3yQA2cUApTj1S'}
   }).subscribe((data_user) => {
             console.log(data_user);
            this.results = data_user;
        });
    
  }

}
