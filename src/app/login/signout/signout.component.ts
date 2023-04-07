import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '..//auth-service/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private router: Router,
    private service: AuthService,
    private _ngZone: NgZone) { }

  client: any = null

  ngOnInit(): void {
  }

  public logout() {
    //this.service.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }

  // public logout(){
  //   //this.service.signOutExternal();
  //   this._ngZone.run(() => {
  //     this.service.revokeToken().subscribe({
  //       next: (x:any) => {
  //         this.router.navigate(['/']).then(() => window.location.reload());
  //       }
  //     })
  //   })
  // }

  // public getRefreshed(){
  //   this.service.refreshToken().subscribe((res:any) => {
  //     console.log("tokens were refreshed")
  //   });

  // }
  // public getList(){
  //   this.service.getClient().subscribe({
  //     next: (personObject:any) => {
  //       this.client = personObject

  //     },
  //     error: (err:any) =>{
  //       console.log(err)
  //     }
  //   });

  // }

}
