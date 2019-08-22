import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-high-risk',
  templateUrl: './high-risk.component.html',
  styleUrls: ['./high-risk.component.css']
})
export class HighRiskComponent implements OnInit {
  accountId: any;
  data5: any;
  creditSummary: any;
  cardSummary: any;
  constructor() { }

  ngOnInit() {
   
  }

}
