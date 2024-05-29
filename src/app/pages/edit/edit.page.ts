import { Component, OnInit } from '@angular/core';
import { UserPhoto } from 'src/app/models/userphoto';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  router: Router;

  // habilitar e desabilitar captura de imagem
  disableButton: boolean = true;
  formData: FormGroup;

  constructor(public photoService: PhotoService, router: Router) {
    this.formData = new FormGroup({
      t_subtitle_edit: new FormControl()
    });
    this.router = router;
  }

  updateSubtitle(photo: UserPhoto, position: number) {
    this.photoService.card = {id:position, filepath:photo.filepath, subtitle:photo.subtitle, webviewPath:photo.webviewPath}
    this.router.navigate(['/', 'edit']);
  }

  getPosition() {
    return this.photoService.card.id;
  }

  // passa a legenda do cartão informada 
  updatePhoto(photo: UserPhoto, position: number, subtitle: string) {
    this.photoService.updatePhoto(photo, position, subtitle);
  }

  // recebimento dos dados do formulário
  onSubmit() {
    this.updatePhoto(this.photoService.photos[this.getPosition()], this.getPosition(), this.formData.value['t_subtitle_edit']);
  }

  // método que habilita o botão de captura da imagem 
  enableButton(){
    var str = this.formData.value.t_subtitle_edit.replace(/( )+/g, ' ');
    this.disableButton = str.length <= 1;
  }

  // evento responsável por habilitar e desabilitar o botão de captura de imagens
  eventButton(event: any){
    this.enableButton();
  }

  // método de inicialização do serviço photoService para a função loadSave
  async ngOnInit() {
    await this.photoService.loadSaved();
    this.formData.value['t_subtitle_edit'] = this.photoService.card.subtitle;
  }
}