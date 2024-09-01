import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { IUser } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);


  signIn(user: IUser){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  register(user: IUser){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  updateUser(displayName : string){
    return updateProfile(getAuth().currentUser, {displayName})
  }
}
