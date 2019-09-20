import { Component, OnInit } from '@angular/core';
import {  Article } from '../../models/Article';
import { Router }  from '@angular/router';

import axios from 'axios';
import { AuthoritzationService } from 'src/app/services/authoritzation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ AuthoritzationService ]
})
export class DashboardComponent implements OnInit {

  articles: Article[];
  constructor(private router: Router, private authService: AuthoritzationService) { 
    this.router  = router;
  }

  ngOnInit() {

    // Need to fetch articles from the database.
    axios.get('http://localhost:3000/article/get')
    .then(res => {
      this.articles = res.data;
    })
    .catch(err => console.log(err));

    this.authService.authorizeUser()
    .then(res => console.log(res))
    .catch(err => this.router.navigate(['/guest']))
    
  }

  logout($event)
  {
    $event.preventDefault();
    axios.get('http://localhost:3000/logout', {withCredentials: true})
    .then(res => {
      console.log(res);
      this.router.navigate(['/guest']);
    }).catch(err => console.log(err));
  }
}
