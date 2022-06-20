import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RankModel} from "./rank.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-project',
  templateUrl: './input-name.component.html',
  styleUrls: []
})
export class InputNameComponent implements OnInit {

  rank!: RankModel;
  form: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    time: [],
    playTime: []
  });

  constructor(public modal: NgbActiveModal, private fb: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    if (this.rank) {
      this.form.patchValue({
        userName: this.rank.userName,
        time: this.rank.time,
        playTime: this.rank.playTime,
      });
    }
  }

  doSubmit() {
    const rank:RankModel = this.form.value;
    rank.time =this.rank.time;
    rank.playTime = this.rank.playTime;
    this.http.post('http://localhost:9090/saveRank',rank).subscribe(data =>{
      console.log(data);
      this.close('saveClick')
    })
  }

  close(reason: any): void {
    this.modal.dismiss(reason);
  }
}
