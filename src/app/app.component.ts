import { Component, OnInit } from '@angular/core';
import { SampleUser, SampleUserService } from "./cache/sample-user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-cache-service-sample';

  public users!: SampleUser[];

  constructor(private service: SampleUserService) { }

  ngOnInit(): void {
    this.getRanDomSampleUsers();
  }

  onButtonClick(): void {
    this.getRanDomSampleUsers();
  }

  getRanDomSampleUsers(): void {
    this.service.get().subscribe((x) => this.users = x.filter(u => u.id > Math.floor( Math.random() * 10)));
  }
}
