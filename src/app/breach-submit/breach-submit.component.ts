import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-breach-submit',
  templateUrl: './breach-submit.component.html',
  styleUrls: ['./breach-submit.component.css']
})
export class BreachSubmitComponent implements OnInit {
  order: any;
  foods: any;
  types: any;
  currTab: any;
  who: any;
  breachForm: FormGroup;
  submitted = false;
  supplier: any; aware: any; faxed: any;
  colleague: any; categorise: any; franchise: any;
  busarea: any; customdata: any;
  breachCategory: any;
  breachState: any;
  businessArea: any;
  data: any; raiseBy: any;
  franchise_dp:any;
  reportedDate: Date; status: String;franchiseList: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: Router,
    private http: HttpClient) {
    this.currTab = 'credit';
    this.types = ['Credit Card', 'Debit Card', 'Others'];
    this.order = {
      type: 'Credit Card'
    };

    this.breachForm = new FormGroup({
      franchise: new FormControl(),
      businessArea: new FormControl(),
      identbreach: new FormControl(),
      bankparty: new FormControl(),
      aware: new FormControl(),
      breachCategory: new FormControl(),
      faxed: new FormControl(),
      colleague: new FormControl(),

   });
  }

  ngOnInit() {
    this.franchise_dp = [];
    this.getDropList();
    this.customdata = [
      { value: '1', viewValue: 'Jersey' },
      { value: '2', viewValue: 'Guernsey' },
      { value: '3', viewValue: 'Isle of Man' },
      { value: '4', viewValue: 'Gibraltar' },
      { value: '5', viewValue: 'Luxembourg' },
      { value: '6', viewValue: 'United Kingdom' },
      { value: '7', viewValue: 'Don’t know where the account is held ' },
      { value: '8', viewValue: 'Not applicable' },
    ];
    
    this.franchise_dp = [{

    }];

    this.busarea = [
      { value: '1', viewValue: 'Drpdown Menu' },
      { value: '2', viewValue: 'Populate franchises/functions from supplied organisational model' }
    ];
    
    this.franchise = [
      { value: '1', viewValue: 'Drpdown Menu' },
      { value: '2', viewValue: 'Populate franchises/functions from supplied organisational model' }
    ];
    
    this.foods = [
      { value: 'steak-0', viewValue: 'Steak' },
      { value: 'pizza-1', viewValue: 'Pizza' },
      { value: 'tacos-2', viewValue: 'Tacos' }
    ];
    this.who = [
      { value: '1', viewValue: 'I identified the breach' },
      { value: '2', viewValue: 'A colleague identified the breach' },
      { value: '3', viewValue: 'A company reported it ' }
    ];
    this.supplier = [
      { value: '1', viewValue: 'Supplier ' },
      { value: '2', viewValue: 'Another third party' },
      { value: '3', viewValue: 'Dont know type of company that reported it' }
    ];
    this.aware = [
      { value: '1', viewValue: 'Yes' },
      { value: '2', viewValue: 'No' }
    ];
    this.faxed = [
      { value: '1', viewValue: 'Yes' },
      { value: '2', viewValue: 'No' }
    ];
    this.colleague = [
      { value: '1', viewValue: 'Yes' },
      { value: '2', viewValue: 'No' }
    ];
    this.categorise = [
      { value: '1', viewValue: 'Compromised details' },
      { value: '2', viewValue: 'Mail/Statement issues' },
      { value: '3', viewValue: 'Loss of device/physical files' },
      { value: '4', viewValue: 'PIN/Card Issues' },
      { value: '5', viewValue: 'Colleague breached the banks Code of Conduct e.g. viewing/amending/deleting accounts without authorisation ' },
      { value: '6', viewValue: 'Fax sent to an incorrect number' },
      { value: '7', viewValue: 'Information found by a third party / member of public because it was left in an insecure place' }
    ];
  }
  callType(value) {
    switch (value){
      case '1':{
          this.businessArea = this.franchiseList[0].businessArea;
      }break;
      case '2':{
        this.businessArea = this.franchiseList[1].businessArea;
      }break;
      case '3':{
        this.businessArea = this.franchiseList[2].businessArea;
      }break;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.breachForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.breachForm);
    // stop here if form is invalid
    if (this.breachForm.invalid) {
      return;
    }

    var reqObj = {
      "breachCategory": this.breachForm.value.breachCategory,
      "breachState": this.breachForm.value.breachState,
      "businessArea": this.breachForm.value.businessArea,
      "franchise": this.breachForm.value.franchise,
      "raiseBy": this.breachForm.value.raiseBy,
      "reportedDate": this.breachForm.value.reportedDate,
      "status": this.breachForm.value.status
    };

    this.http.post(environment.baseUrl+'/maggieBreach/api/create', reqObj).subscribe((response) => {
      if (response) {
        this.data = response;
        alert(response['message'])
        this.breachCategory = this.data.breachCategory;
        this.breachState = this.data.breachState;
        this.businessArea = this.data.businessArea;
        this.franchise = this.data.franchise;
        this.raiseBy = this.data.raiseBy;
        this.reportedDate = this.data.reportedDate;
        this.status = this.data.status;
        this.route.navigate(['/login']);
      }

      console.log(this.breachForm);


    }, err => {
      console.log(err);
      alert(err)
    });

  }
getDropList(){
    this.http.get(environment.baseUrl+'/maggieBreach/api/franchiseList').subscribe((response) => {
      if (response) {
        this.franchiseList = response; 

        this.franchise_dp = this.franchiseList.franchiseName;


        console.log("SET1",this.franchiseList[0].franchiseName,response, this.franchiseList); // debugger;
      }
    });
}
}
