import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../person/person';
import { PersonService } from '../person/person.service';

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

  constructor(private router: Router, private personService: PersonService) {
    // this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.emailAddressEncoded = this.router.getCurrentNavigation()?.extras.state?.['emailAddressEncoded'];
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
          if (member.emailAddress != null) {
            this.parentId = member.id
          }
        }
      }
      // debugger
    })
  };

  ngOnInit(): void { }

  edit(personId: number) {
    this.router.navigate(['profile'], { state: { id: personId, mode: 'edit' } });
  }

  new(parentId: number) {
    this.router.navigate(['profile/edit'], { state: { parentId: parentId, mode: 'add' } });
  }
}
