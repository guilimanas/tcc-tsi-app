import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { UserPhoto } from 'src/app/models/userphoto';
import { Router } from '@angular/router';
import { EditPage } from '../edit/edit.page';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  providers: [EditPage]
})

export class GalleryPage implements OnInit {

  router: Router;

  objtEdit: EditPage;

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController, router: Router, edit: EditPage) {
    this.router = router;
    this.objtEdit = edit;
  }

  // exibir galeria de photos/cartões autorais
  loadGallery() {
    return this.photoService.photos;
  }
  
  // método que define os atributos do elemento responsável por mostrar as opções para os cartões na galeria
  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      buttons: [{
        text: 'Excluir',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePhoto(photo, position);
        }
      },
      {
        text: 'Editar',
        icon: 'create',
        role: 'edit',
        handler: () => {
          this.objtEdit.updateSubtitle(photo, position)
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

  // método de inicialização do serviço photoService para a função loadSave
  async ngOnInit() {
    await this.photoService.loadSaved();

    console.log(this.photoService.photos)
  }
}