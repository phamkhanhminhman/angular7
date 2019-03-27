import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { config } from 'src/app/config/config';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id;
  results;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private httpService: HttpService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id nhan dc: ' + this.id);
    this.httpService.get(config.userUrl + this.id).subscribe(
      data => this.handleResponse(data),
    );
  }
  handleResponse(data) {
    console.log(data);
    this.results = data['data'];
    console.log(this.results);
  }

}
