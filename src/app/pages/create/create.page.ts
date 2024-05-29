import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {
  formData: FormGroup;
  router: Router;

  // habilitar e desabilitar captura de imagem
  disableButton: boolean = true;

  constructor(public photoService: PhotoService, router: Router) {
    this.formData = new FormGroup({
      t_subtitle: new FormControl()
    });
    this.router = router;
  }
  
  // passa a legenda do cartão informada 
  addPhotoToGallery(subtitle: string) {
    this.photoService.addNewToGallery(subtitle.toLowerCase());
    this.formData.reset();
    this.disableButton= true;
  }

  // recebimento dos dados do formulário
  onSubmit() {
    this.addPhotoToGallery(this.formData.value['t_subtitle']);
  }

  // método que habilita o botão de captura da imagem 
  enableButton(){
    var str = this.formData.value.t_subtitle.replace(/( )+/g, ' ');
    this.disableButton = str.length <= 1;
  }

  // evento responsável por habilitar e desabilitar o botão de captura de imagens
  eventButton(event: any){
    this.enableButton();
  }

  // método de inicialização do serviço photoService para a função loadSave
  async ngOnInit() {
    await this.photoService.loadSaved();
  }
}
