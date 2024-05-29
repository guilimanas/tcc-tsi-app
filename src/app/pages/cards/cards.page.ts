import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { ActionSheetController } from '@ionic/angular';
import { Cards } from 'src/app/models/cards';
import { PhotoService } from 'src/app/services/photo.service';
import { listDrinks} from 'src/app/models/consts'
import { listFoods } from 'src/app/models/consts'
import { listActivities } from 'src/app/models/consts'
import { listDaily } from 'src/app/models/consts'
import { listNeeds } from 'src/app/models/consts'
import { listFamily } from 'src/app/models/consts'
import { listEmotions } from 'src/app/models/consts'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  // VARIÁVEIS, LISTAS E OBJETOS
  public text = ""; // legenda do cartão a ser vacalizada
  public valueSelected: number = 1; // identificação das abas de cartões
  public voice: Cards[] = []; // recebe cartão escolhido

  // contadores de ID
  private countID_drinks = 1;
  private countID_foods = 1;
  private countID_activities = 1;
  private countID_daily = 1;
  private countID_needs = 1;
  private countID_family = 1;
  private countID_emotions = 1;
  private countID_myCards = 1;
  
  // listas apresentadas no html
  public drinks: Cards[] = [];
  public activities: Cards[] = [];
  public foods: Cards[] = [];
  public needs: Cards[] = [];
  public daily : Cards[] = [];
  public family : Cards[] = [];
  public emotions : Cards[] = [];
  public myCards: Cards[] = [];

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController) {}
  
  // atribuindo os cartões recuperados de listDrinks padrões à drinks
  loadDrinks() {
    for (let i = 0; i < listDrinks.length; i++) {
      let obj = {id: this.countID_drinks++, webviewPath: listDrinks[i].webviewPath, subtitle: listDrinks[i].subtitle};
      this.drinks[i] = obj;
    }
    return this.drinks;
  }

  // atribuindo os cartões recuperados de listFoods padrões à foods
  loadFoods() {
    for (let i = 0; i < listFoods.length; i++) {
      let obj = {id: this.countID_foods++, webviewPath: listFoods[i].webviewPath, subtitle: listFoods[i].subtitle};
      this.foods[i] = obj;
    }
    return this.foods;
  }

  // atribuindo os cartões recuperados de listActivities padrões à activities
  loadActivities() {
    for (let i = 0; i < listActivities.length; i++) {
      let obj = {id: this.countID_activities++, webviewPath: listActivities[i].webviewPath, subtitle: listActivities[i].subtitle};
      this.activities[i] = obj;
    }
    return this.activities;
  }

  // atribuindo os cartões recuperados de listDaily padrões à daily
  loadDaily() {
    for (let i = 0; i < listDaily.length; i++) {
      let obj = {id: this.countID_daily++, webviewPath: listDaily[i].webviewPath, subtitle: listDaily[i].subtitle};
      this.daily[i] = obj;
    }
    return this.daily;
  }
  
  // atribuindo os cartões recuperados de listNeeds padrões à needs
  loadNeeds() {
    for (let i = 0; i < listNeeds.length; i++) {
      let obj = {id: this.countID_needs++, webviewPath: listNeeds[i].webviewPath, subtitle: listNeeds[i].subtitle};
      this.needs[i] = obj;
    }
    return this.needs;
  }

  // atribuindo as fotos recuperadas de PHOTO_STORAGE no serviço photo.service para family
  loadFamily() {
    for (let i = 0; i < listFamily.length; i++) {
      let obj = {id: this.countID_family++, webviewPath: listFamily[i].webviewPath, subtitle: listFamily[i].subtitle};
      this.family[i] = obj;
    }
    return this.family;
  }

  // atribuindo as fotos recuperadas de PHOTO_STORAGE no serviço photo.service para emotions
  loadEmotions(){
    for (let i = 0; i < listEmotions.length; i++) {
      let obj = {id: this.countID_emotions++, webviewPath: listEmotions[i].webviewPath, subtitle: listEmotions[i].subtitle};
      this.emotions[i] = obj;
    }
    return this.emotions;
  }

  // atribuindo as fotos recuperadas de PHOTO_STORAGE no serviço photo.service para myCards
  loadMyCards() {
    for (let i = 0; i < this.photoService.photos.length; i++) {
      let obj = {id: this.countID_myCards++, webviewPath: this.photoService.photos[i].webviewPath, subtitle: this.photoService.photos[i].subtitle};
      this.myCards[i] = obj;
    }
    return this.myCards;
  }

  // método de definição dos atributos do método speak
  private speakText() {
    TextToSpeech.speak({
      text: this.text,
      lang: 'pt-BR',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
    });
  }

  // avalia qual a seção e o cartão escolhido pelo usuário
  // executa o método de vocalização
  public async chooseCard(id: number, valueList: number) {
    if (valueList == 1) {
      for (let i = 0; i < this.daily.length; i++) {
        if (this.daily[i].id == id) {
          let card = {id: this.daily[i].id, webviewPath: this.daily[i].webviewPath, subtitle: this.daily[i].subtitle};
          this.voice.push(card);
          this.addText(this.daily[i].subtitle);
          this.speakText();
          this.clearVoice();
        }
      }
    } else if (valueList == 2) {
      for (let i = 0; i < this.needs.length; i++) {
        if (this.needs[i].id == id) {
          let card = {id: this.needs[i].id, webviewPath: this.needs[i].webviewPath, subtitle: this.needs[i].subtitle};
          this.voice.push(card);
          this.addText(this.needs[i].subtitle);
          this.speakText();
          this.clearVoice();
        }
      }
    } else if (valueList == 3) {
      for (let i = 0; i < this.family.length; i++) {
        if (this.family[i].id == id) {
          let card = {id: this.family[i].id, webviewPat: this.family[i].webviewPath, subtitle: this.family[i].subtitle};
          this.voice.push(card);
          this.addText(this.family[i].subtitle);
          this.speakText();
          this.clearVoice();
        }
      }
    } else if (valueList == 4) {
      for (let i = 0; i < this.emotions.length; i++) {
        if (this.drinks[i].id == id) {
          let card = {id: this.emotions[i].id, webviewPat: this.emotions[i].webviewPath, subtitle: this.emotions[i].subtitle};
          this.voice.push(card);
          this.addText(this.emotions[i].subtitle);
          this.speakText();
          this.clearVoice();
        }
      }
    } else if (valueList == 5) {
      for (let i = 0; i < this.drinks.length; i++) {
        if (this.drinks[i].id == id) {
          let card = {id: this.drinks[i].id, webviewPat: this.drinks[i].webviewPath, subtitle: this.drinks[i].subtitle};
          this.voice.push(card);
          this.addText(this.drinks[i].subtitle);
          this.speakText();
          this.clearVoice();
        }
      }
    } else if (valueList == 6) {
      for (let i = 0; i < this.foods.length; i++) {
        if (this.foods[i].id == id) {
          let card = {id: this.foods[i].id, webviewPath: this.foods[i].webviewPath, subtitle: this.foods[i].subtitle};
          this.voice.push(card);
          this.addText(this.foods[i].subtitle);
          this.speakText();
          this.clearVoice();
        }
      }
    } else if (valueList == 7) {
      for (let i = 0; i < this.activities.length; i++) {
        if (this.activities[i].id == id) {
          let card = {id: this.activities[i].id, webviewPath: this.activities[i].webviewPath, subtitle: this.activities[i].subtitle};
          this.voice.push(card);
          this.addText(this.activities[i].subtitle);
          this.speakText();
          this.clearVoice();
        }  
      }
    } else if (valueList == 8) {
      for (let i = 0; i < this.myCards.length; i++) {
        if (this.myCards[i].id == id) {
          let card = {id: this.myCards[i].id, webviewpath: this.myCards[i].webviewPath, subtitle: this.myCards[i].subtitle};
          this.voice.push(card);
          this.addText(this.myCards[i].subtitle);
          this.speakText();
          this.clearVoice();
        }  
      }
    }
  }

  private async clearVoice() {
    this.voice = [];
    this.text = "";
  }

  private async addText(textAdd?: string){
    this.text = this.text+" "+textAdd;
  }

  // método de inicialização do serviço loadSave e métodos necessários à página cards
  async ngOnInit() {
    await this.photoService.loadSaved();
    this.loadDaily();
    this.loadNeeds();
    this.loadFoods();
    this.loadDrinks();
    this.loadActivities();
    this.loadFamily();
    this.loadEmotions();
    this.loadMyCards();
  }

  // evento responsável pela escolha da seção dos diferentes tipos de cartões
  segmentChanged(event: any) {
    this.valueSelected = event.detail.value;
  }
}
