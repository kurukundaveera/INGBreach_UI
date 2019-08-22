import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ticketSummary: any;
  roleId: any;
  Summary: any;
  supplier: any;breachId: any;
  constructor(private http:HttpClient,private route: Router) { }

  ngOnInit() {
   this.getData();
  }

  getData(){
    this.supplier= [
      {value: '1', viewValue: 'Needs Resolution'},
      {value: '2', viewValue: 'Resolved'},
      {value: '3', viewValue: 'Re-Investigate'},
      {value: '4', viewValue: 'False'}
    ];
     this.roleId = sessionStorage.getItem("roleId");
    this.http.get(environment.baseUrl+`/maggieBreach/api/breaches/${this.roleId}`).subscribe((response) => {
      if (response) {
        this.ticketSummary = response; 
        console.log(this.ticketSummary); debugger;
      }
    });
  }
  onSubmit(status, breachid){

    console.log(status, breachid);
    let temp='';
    if(status == 'Closed'){
        temp = 'Reopened';
    }if(status == 'Reopened'){
        temp = 'Closed';
    }else{
      temp = 'Closed';
    }
    this.http.get(environment.baseUrl+`/maggieBreach/api/action/`+breachid ).subscribe((response) => {
      if (response) {
  
        console.log(response);
        alert(response['message']);
        this.getData();
        //this.route.navigate(['/dashboard']);
  
      }
  
    });
  }
}
