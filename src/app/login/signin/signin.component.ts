import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-service/auth.service';

// https://www.youtube.com/watch?v=G4BBNq1tgwE
// https://www.youtube.com/watch?v=semPMqxziTQ&list=PLPT-em3BBa7uL4Vk2L_Dlcql9QQPlyUxz

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  private clientId = environment.clientId;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _ngZone: NgZone) { }

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


}