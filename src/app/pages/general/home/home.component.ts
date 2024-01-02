import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as claimallocation from './../../../../assets/claimallocation_new.json';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ClaimAllocation: any;
constructor(private router: Router){}

  selectedValue = '';
  ngOnInit(){
    console.log(claimallocation.ClaimAllocation)
    this.ClaimAllocation = claimallocation.ClaimAllocation;
    localStorage.setItem("claimallocation",JSON.stringify(this.ClaimAllocation));
  }
	onSelected(value:string): void {
		this.selectedValue = value;
    console.log(this.selectedValue)
	}

  login() {
    console.log("Open MAUI");
    window.open('example://www.myapp.com');
    if(this.selectedValue == "Manager" || this.selectedValue == "User_Agent"){
    console.log("Navigate to " + this.selectedValue + " landing page")
    this.router.navigate(['/about'], { queryParams:  {"value": this.selectedValue} });
    }
    }
}
