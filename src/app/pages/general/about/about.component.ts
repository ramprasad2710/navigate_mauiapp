import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
// import { TabsComponent } from '../tabs/tabs.component';
import { AppModule } from "../../../app.modules";
import { TabsComponent } from '../tabs/tabs.component';
import { FormControl, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


// export interface PeriodicElement {
 
// }
 
let ELEMENT_DATA= [
  {cname: "HME Client", cno: 1001, patientname: "Jame", providername: "Rubella, Jennifer", status: 'Unassigned', allowedamt: 2000, paidamt: 0, comment: "Test comment", assignedto: "",viewmore : ""},
  {cname: "HME Client", cno: 1002, patientname: "Peter", providername: "Rubella, Jennifer", status: 'Unassigned', allowedamt: 1500, paidamt: 0, comment: "Test comment", assignedto: "",viewmore : ""},
  {cname: "BT Client" , cno: 1003, patientname: "Jack", providername: "Rubella, Jennifer", status: 'Assigned'  , allowedamt: 1750, paidamt: 0, comment: "Test comment", assignedto: "Agent",viewmore : ""},
  {cname: "BT Client", cno: 1004, patientname: "Abbate", providername: "Rubella, Jennifer", status: 'Assigned', allowedamt: 2450, paidamt: 0, comment: "Test comment", assignedto: "Agent",viewmore : ""},
  {cname: "ABC Client", cno: 1005, patientname: "Paul", providername: "Rubella, Jennifer", status: 'Unassigned', allowedamt: 2000, paidamt: 0, comment: "Test comment", assignedto: "",viewmore : ""},
  {cname: "DEF Client", cno: 1006, patientname: "Stephen", providername: "Rubella, Jennifer", status: 'Unassigned', allowedamt: 2000, paidamt: 0, comment: "Test comment", assignedto: "",viewmore : ""},
  {cname: "ABC Client", cno: 1007, patientname: "Warner", providername: "Rubella, Jennifer", status: 'Unassigned', allowedamt: 2000, paidamt: 0, comment: "Test comment", assignedto: "",viewmore : ""},
  {cname: "DEF Client", cno: 1008, patientname: "David", providername: "Rubella, Jennifer", status: 'Unassigned', allowedamt: 2000, paidamt: 0, comment: "Test comment", assignedto: "",viewmore : ""},
  {cname: "XYZ Client", cno: 1009, patientname: "Mark", providername: "Rubella, Jennifer", status: 'Assigned', allowedamt: 2000, paidamt: 0, comment: "Test comment", assignedto: "Agent",viewmore : ""},
  {cname: "XYZ Client", cno: 1010, patientname: "Micheal", providername: "Rubella, Jennifer", status: 'Assigned', allowedamt: 2000, paidamt: 0, comment: "Test comment", assignedto: "Agent",viewmore : ""}
];

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    standalone: true,
    imports: [MatFormFieldModule, MatTableModule, AppModule, FormsModule]
})
export class AboutComponent {
  // @ViewChild('personEdit') editPersonTemplate: any;
  // @ViewChild('about') aboutTemplate : any;
  // @ViewChild(TabsComponent) tabsComponent: any;
  result: any;
  ClaimAllocation:any;
  displayedColumns: string[] = ['cname', 'cno', 'patientname', 'providername', 'status', 'allowedamt', 'paidamt', 'comment','assignedto', 'viewmore'];
  dataSource = ELEMENT_DATA;
  Unassigned_Claim: any; 
  WIP: any;
  Completed_Claim: any;
  role: any;
  managerRole: any;
  agentRole: any;
  @ViewChild('personEdit') editPersonTemplate;
  @ViewChild('about') aboutTemplate;
  @ViewChild(TabsComponent) tabsComponent;

  people = [
    {
      id: 1,
      name: 'Juri',
      surname: 'Strumpflohner',
      twitter: '@juristr'
    }
  ];

  onEditPerson(person) {
    this.tabsComponent.openTab(
      `Editing ${person.name}`,
      this.editPersonTemplate,
      person,
      true
    );
  }

  onAddPerson() {
    this.tabsComponent.openTab('New Person', this.editPersonTemplate, {}, true);
  }

  onPersonFormSubmit(dataModel) {
    if (dataModel.id > 0) {
      this.people = this.people.map(person => {
        if (person.id === dataModel.id) {
          return dataModel;
        } else {
          return person;
        }
      });
    } else {
      // create a new one
      dataModel.id = Math.round(Math.random() * 100);
      this.people.push(dataModel);
    }

    // close the tab
    this.tabsComponent.closeActiveTab();
  }

  onOpenAbout() {
    this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
  }
constructor(public route: ActivatedRoute, public router: Router, private changeDetectorRef: ChangeDetectorRef ){}

  ngOnInit() {
    this.ClaimAllocation = localStorage.getItem("claimallocation");
    this.ClaimAllocation = JSON.parse(this.ClaimAllocation)
    this.route.queryParams.subscribe((params) => { 
      this.result = params;
    }
    );
    this.role = this.result.value;
    this.Unassigned_Claim = this.ClaimAllocation.Unassigned_Claim;
    this.WIP = this.ClaimAllocation.WIP;
    this.Completed_Claim = this.ClaimAllocation.Completed_Claim;
    if(this.role === "User_Agent"){
     this.agentRole = this.ClaimAllocation.data;
     this.agentRole = this.agentRole.filter((t: { assignedto: string; })=>t.assignedto === "Agent");
     this.changeDetectorRef.detectChanges();
     this.dataSource = this.agentRole;
    }else if(this.role === "Manager"){
      this.changeDetectorRef.detectChanges();
      this.dataSource = this.ClaimAllocation.data;
   
    }
  }
  
  signOut(){
    this.router.navigateByUrl('/')
    localStorage.clear();
  }
  
  // people = [
  //   {
  //     id: 1,
  //     name: 'Juri',
  //     surname: 'Strumpflohner',
  //     twitter: '@juristr'
  //   }
  // ];

  // onEditPerson(person: any) {
  //   this.tabsComponent.openTab(
  //     `Editing ${person.name}`,
  //     this.editPersonTemplate,
  //     person,
  //     true
  //   );
  // }

  // onAddPerson() {
  //   this.tabsComponent.openTab('New Person', this.editPersonTemplate, {}, true);
  // }

  // onPersonFormSubmit(dataModel: any) {
  //   if (dataModel.id > 0) {
  //     this.people = this.people.map(person => {
  //       if (person.id === dataModel.id) {
  //         return dataModel;
  //       } else {
  //         return person;
  //       }
  //     });
  //   } else {
  //     // create a new one
  //     dataModel.id = Math.round(Math.random() * 100);
  //     this.people.push(dataModel);
  //   }

  //   // close the tab
  //   this.tabsComponent.closeActiveTab();
  // }

  // onOpenAbout() {
  //   this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
  // }
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}