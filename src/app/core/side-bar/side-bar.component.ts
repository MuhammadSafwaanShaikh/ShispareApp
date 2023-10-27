import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  // isSidebarCollapsed = true;
  // activeSubMenu: string | null = null;
  // toggleSidebar() {
  //   this.isSidebarCollapsed = !this.isSidebarCollapsed;
  // }
  ngOnInit() {}
  loadPage() {
    window.location.reload;
  }
}
