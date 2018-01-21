import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'chat-login-dialog',
  templateUrl: './chat-login-dialog.component.html',
  styleUrls: ['./chat-login-dialog.component.styl']
})
export class ChatLoginDialogComponent implements OnInit {
  dialogForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChatLoginDialogComponent>
  ) {}

  ngOnInit() {
    this.dialogForm = new FormGroup({
      'userName': new FormControl(null, Validators.required)
    });
  }

  save() {
    if (this.dialogForm.valid) {
      const userName = this.dialogForm.value['userName'];
      this.dialogRef.close(userName);
    }
  }
}
