import { ApplicantService } from './../../../services/applicant/applicant.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApplicationService } from './../../../services/application/application.service';
import { IGetAllBootcampResponse } from './../../../models/response/bootcamp/getAllBootcampResponse';
import { BootcampService } from './../../../services/bootcamp/bootcamp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-bootcamp',
  templateUrl: './applicant-bootcamp.component.html',
  styleUrls: ['./applicant-bootcamp.component.css'],
})
export class ApplicantBootcampComponent implements OnInit {
  bootcamps: IGetAllBootcampResponse[] = [];
  setBootcmap: IGetAllBootcampResponse;
  constructor(
    private bootcampService: BootcampService,
    private applicationService: ApplicationService,
    private applicantService: ApplicantService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBootcamps();
  }

  getBootcamps() {
    this.bootcampService
      .getAllBootcamp()
      .subscribe((data) => (this.bootcamps = data));
  }

  add(bootcamp: any) {
    this.setBootcmap = bootcamp;
    this.sendBootcamp();
    this.toastrService.success('Başvuru Yapıldı', 'Başarılı');
    this.router.navigate(['applicant/applicant-notification']);
  }
  sendBootcamp() {
    let bootcampData = Object.assign({});
    bootcampData.bootcampId = this.setBootcmap.id;
    bootcampData.bootcampName = this.setBootcmap.name;
    bootcampData.userName = this.setBootcmap.instructorName;
    bootcampData.state = 1;
    bootcampData.userId = localStorage.getItem('userId');

    this.applicationService.addApplication(bootcampData).subscribe();
  }
}
