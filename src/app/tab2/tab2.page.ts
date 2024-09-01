import { Component, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../user';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router  = inject(Router);
  email! : string;
  password! : string;
  nombre! : string;
  
  async register(){    
    let flag : boolean = false;
    const loading = await this.utilsSvc.loading();
    if (this.nombre == undefined || this.nombre.length < 4) {
      return this.utilsSvc.presentToast({
        message: "Nombre inválido.",
        duration : 3000,
        color: "primary",
        position: "middle",
        icon: "alert-circle-outline"
      })
    }
    await loading.present();
    let user = new User(this.email, this.password);
    this.firebaseSvc.register(user).then(async res =>{
      
      await this.firebaseSvc.updateUser(this.nombre);
      console.log(res);
      flag = true;
    }).catch(error =>{
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration : 3000,
        color: "primary",
        position: "middle",
        icon: "alert-circle-outline"
      });

    }).finally(()=>{
      loading.dismiss();
      if (flag == true) {
        this.router.navigate(['/tabs/tab3']);
      }
    })
  }
}
