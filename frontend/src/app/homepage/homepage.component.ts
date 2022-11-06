import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  qualificators: string[] = [];
  memberForm: FormGroup;
  crewMembers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private homepageService: HomepageService
  ) {
    this.memberForm = this.formBuilder.group({
      name: '',
      qualificators: this.qualificators
    })
   }

  ngOnInit(): void {
    this.homepageService.getMembers().subscribe((data: any) =>{
      this.crewMembers = data;
    })
  }


  addMember() {
    this.homepageService.addMember(this.memberForm.value).subscribe((data: any) =>{
      this.crewMembers.push(data)
    })
  }
}
