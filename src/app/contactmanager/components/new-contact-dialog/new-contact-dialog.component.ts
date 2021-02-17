import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  user: User;
  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService
    ) { }

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ]

  ngOnInit(): void {
    this.user = new User();
  }

  save(){
    this.user.name = this.name.value;
    if(this.name.hasError('required')){
      this.dialogRef.close(null);
    }else{
      this.userService.addUser(this.user).then(
        user => this.dialogRef.close(this.user));
      }
    
  }

  dismiss(){
    this.dialogRef.close(null);
  }
}
