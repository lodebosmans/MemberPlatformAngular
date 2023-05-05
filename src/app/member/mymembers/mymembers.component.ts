import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../person/person';
import { PersonService } from '../person/person.service';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-mymembers',
  templateUrl: './mymembers.component.html',
  styleUrls: ['./mymembers.component.scss']
})
export class MymembersComponent implements OnInit {

  mymembers: Person[] | null = [];
  emailAddressEncoded: string = '';
  isLoading: boolean = true;
  parentId: number | null = null;

  constructor(private router: Router, private personService: PersonService, public authService: AuthService,) {
    this.authService.user$.subscribe((user: User | undefined | null) => {
      // debugger
      let emailAddress = user?.email;
      this.emailAddressEncoded = emailAddress ? encodeURIComponent(emailAddress) : '';
      // debugger
      this.personService.getPersonByEmailAddress(this.emailAddressEncoded).subscribe((mymembers: Person[] | null) => {
        console.log('Repons op email addres in db:')
        console.log(mymembers)
        this.mymembers = mymembers;
        this.isLoading = false;
        // Loop over the members to find the parent (should be the first one)
        if (mymembers != null) {
          for (let i = 0; i < mymembers.length; i++) {
            let member = mymembers[i];
            // console.log('Member: ' + member.id + ' ' + member.firstName + ' ' + member.emailAddress)
            if (member.emailAddress != null && member.emailAddress.length > 2) {
              this.parentId = member.id
              debugger
            }
          }
        }
        // debugger
      })
    })
  };

  ngOnInit(): void { }

  edit(personId: number) {
    this.router.navigate(['profile'], { state: { id: personId, mode: 'edit' } });
  }

  add() {
    debugger
    this.router.navigate(['profile/edit'], { state: { parentId: this.parentId, mode: 'add' } });
  }
}
