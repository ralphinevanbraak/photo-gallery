import { Component } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController) {}

  public async ngOnInit() {
    await this.photoService.loadSaved();
  }

  public addPhotoToGallery(): void {
    this.photoService.addNewToGalery();
  }

  public async showActionSheet(photo: UserPhoto, position: number): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: `Foto's`,
      buttons: [{
        text: 'Verwijder',
        role: 'desctructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Annuleer',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, aciton sheet is automatically closed
        }
      }]
    });

    await actionSheet.present();
  }
}
