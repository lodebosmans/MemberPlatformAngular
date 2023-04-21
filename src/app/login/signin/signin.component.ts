import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


// https://www.youtube.com/watch?v=G4BBNq1tgwE
// https://www.youtube.com/watch?v=semPMqxziTQ&list=PLPT-em3BBa7uL4Vk2L_Dlcql9QQPlyUxz

// declare const FB: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  // form = this.fb.group({
  //   username: ['', Validators.email],
  //   password: ['', Validators.required]
  // });

  private clientId = environment.clientId;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _ngZone: NgZone,
    // private fb: FormBuilder,
    // private _snackBar: MatSnackBar
    ) { }


  ngOnInit(): void {

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    debugger
    await this.authService.LoginWithGoogle(response.credential).subscribe(
      (x: any) => {
        this._ngZone.run(() => {
          debugger
          this.router.navigate(['/']);
        })
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  // async onSubmit() {
  //   // //this.formSubmitAttempt = false;
  //   // if (this.form.valid) {
  //   //   try {
  //   //     this.authService.login(this.form.value).subscribe((x: any) => {
  //   //       this.router.navigate(['/logout']);
  //   //       this._snackBar.open("Login Successful", "Close", {
  //   //         duration: 2000
  //   //       });         
  //   //     },
  //   //       (error: any) => {
  //   //         console.error(error);
  //   //         this.authService.open("Error with Username or Password", "Close", {
  //   //           duration: 5000
  //   //         });
  //   //       });
  //   //   } catch (err) {
  //   //     this._snackBar.open("Error with Username or Password", "Close", {
  //   //       duration: 5000
  //   //     });
  //   //   }
  //   // } else {
  //   //   //this.formSubmitAttempt = true;
  //   // }
  // }


  // async login() {
  //   FB.login(async (result:any) => {
  //       // await this.authService.LoginWithFacebook(result.authResponse.accessToken).subscribe(
  //       //   (x:any) => {
  //       //     this._ngZone.run(() => {
  //       //       this.router.navigate(['/logout']);
  //       //     })},
  //       //   (error:any) => {
  //       //       console.log(error);
  //       //     }
  //       //   );  
  //   }, { scope: 'email' });
  // }


}