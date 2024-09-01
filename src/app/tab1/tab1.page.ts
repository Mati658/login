import { Component, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../user';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router  = inject(Router);
  email! : string;
  password! : string;
  
  async checkLogin(){    
    let flag : boolean = false;
    const loading = await this.utilsSvc.loading();
    await loading.present();

    let user = new User(this.email, this.password);
    this.firebaseSvc.signIn(user).then(res =>{
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
