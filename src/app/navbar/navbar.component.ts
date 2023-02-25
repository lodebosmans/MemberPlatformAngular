import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {



  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  openNav() {
    const span_id = this.renderer.selectRootElement('#mySidebar');
    console.log(span_id)
    this.renderer.addClass(span_id, 'showSideBar'); // 
  }

}
