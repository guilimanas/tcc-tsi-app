import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Cartões', url: '/cards', icon: 'images' },
    { title: 'Criar cartões', url: '/create', icon: 'create' },
    { title: 'Galeria de cartões', url: '/gallery', icon: 'grid' },
    { title: 'Instruções', url: '/instructions', icon: 'information-circle' },
    /*{ title: 'Sobre nós', url: '/about', icon: 'person-circle' },*/
  ];
  constructor() {}
}
