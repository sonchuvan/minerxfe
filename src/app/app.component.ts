import {Component, OnInit, ViewChild, AfterViewInit, HostListener} from '@angular/core';
import {BoxModel} from "./box.model";
import {CountdownComponent, CountdownConfig, CountdownEvent} from "ngx-countdown";
import {Fireworks} from "fireworks-js";
import {HttpClient} from "@angular/common/http";
import {RankModel} from "./rank.model";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {InputNameComponent} from "./input-name.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{

  @ViewChild('countdown', { static: false })
  private countdown!: CountdownComponent;
  title = 'minerX';
  boxs!: number[];
  src = 'assets/images/smile.png';
  boom = '';
  countOpenCell = 0;
  disableClick= '';
  firstClick = true;
  winTitle = '';
  fireworksHidden = false;
  fireworks: any;
  gifBilateral = '';

  myBox!: BoxModel[];
  ranks!: RankModel[];

  constructor(private http: HttpClient,public modal: NgbModal) {

  }

  ngOnInit(): void {
    this.generateBox(140);
    this.getRanks();
  }

  disableRightClick(event: any){
    event.preventDefault();
  }
  rightClickBox(item:  any){
    if (this.firstClick){
      this.countdown.begin();
      this.gifBilateral = '';
    }
    if (this.myBox[item].flag){
      this.myBox[item].flag = false;
      this.myBox[item].color = 'boxDefault';
    }else {
      this.myBox[item].flag = true;
      this.myBox[item].color = 'flag';
    }
    this.boom = 'assets/images/boom.png'
  }
  countBoomNearCell(boxList: number[], length: number):number[]{
    for (let i = 0; i < length; i++){
      if (boxList[i] !== 0){
        let count = 0;
        if (boxList[i+1] === 0){
          count++;
        }
        if (boxList[i-1] === 0){
          count++;
        }
        if (boxList[i+14] === 0){
          count++;
        }
        if (boxList[i-14] === 0){
          count++;
        }
        if (boxList[i+15] === 0){
          count++;
        }
        if (boxList[i-15] === 0){
          count++;
        }
        if (boxList[i+13] === 0){
          count++;
        }
        if (boxList[i-13] === 0){
          count++;
        }
        if(count !== 0){
          boxList[i] = count;
        }
        else{
          boxList[i] = -1;
        }
      }
    }
    return boxList;
  }
  countBoomTopCell(boxList: number[]):number[]{
    for (let i = 1; i < 14; i++){
      if (boxList[i] !== 0){
        let count = 0;
        if (boxList[i+1] === 0){
          count++;
        }
        if (boxList[i-1] === 0){
          count++;
        }
        if (boxList[i+14] === 0){
          count++;
        }
        if (boxList[i+15] === 0){
          count++;
        }
        if (boxList[i+13] === 0){
          count++;
        }
        if(count !== 0){
          boxList[i] = count;
        }
        else{
          boxList[i] = -1;
        }
      }
    }
    return boxList;
  }
  countBoomBotCell(boxList: number[]):number[]{
    for (let i = 127; i < 140; i++){
      if (boxList[i] !== 0){
        let count = 0;
        if (boxList[i+1] === 0){
          count++;
        }
        if (boxList[i-1] === 0){
          count++;
        }
        if (boxList[i-14] === 0){
          count++;
        }
        if (boxList[i-15] === 0){
          count++;
        }
        if (boxList[i-13] === 0){
          count++;
        }
        if(count !== 0){
          boxList[i] = count;
        }
        else{
          boxList[i] = -1;
        }
      }
    }
    return boxList;
  }
  countBoomLeftCell(boxList: number[]):number[]{
    for (let i = 0; i < 140; i+=14){
      if (boxList[i] !== 0){
        let count = 0;
        if (boxList[i+1] === 0){
          count++;
        }
        if (boxList[i+14] === 0){
          count++;
        }
        if (boxList[i-14] === 0){
          count++;
        }
        if (boxList[i+15] === 0){
          count++;
        }
        if (boxList[i-13] === 0){
          count++;
        }
        if(count !== 0){
          boxList[i] = count;
        }
        else{
          boxList[i] = -1;
        }
      }
    }
    return boxList;
  }
  countBoomRightCell(boxList: number[]):number[]{
    for (let i = 13; i < 140; i+=14){
      if (boxList[i] !== 0){
        let count = 0;
        if (boxList[i-1] === 0){
          count++;
        }
        if (boxList[i+14] === 0){
          count++;
        }
        if (boxList[i-14] === 0){
          count++;
        }
        if (boxList[i-15] === 0){
          count++;
        }
        if (boxList[i+13] === 0){
          count++;
        }
        if(count !== 0){
          boxList[i] = count;
        }
        else{
          boxList[i] = -1;
        }
      }
    }
    return boxList;
  }

  generateBox(length: number){
    this.boxs = new Array(length);
    this.myBox = new Array<BoxModel>(length);
    for (let i = 0; i < length; i++) {
      if (i < length/5){
        this.boxs[i] = 0;
      }
      else {
        this.boxs[i] = 1;
      }
    }
    this.boxs = this.boxs.sort(()=>Math.random()-0.5);

    this.boxs = this.countBoomNearCell(this.boxs,140);
    this.boxs = this.countBoomTopCell(this.boxs);
    this.boxs = this.countBoomBotCell(this.boxs);
    this.boxs = this.countBoomLeftCell(this.boxs);
    this.boxs = this.countBoomRightCell(this.boxs);

    for (let i = 0; i < length; i++){
      this.myBox[i] = new BoxModel(
        this.boxs[i],
        'boxDefault',
        '',
        false,
        false,
      );
    }
  }

  boxClick(box: number){
    if(this.countOpenCell == 0){
    }
    if (this.firstClick){
      this.countdown.begin();
      this.gifBilateral = '';
    }
    if (this.myBox[box].value == -1 && this.myBox[box].color !== 'clicked'){
      this.myBox[box].color = 'clicked';
      this.countOpenCell++;
    }
    if (this.myBox[box].value == 0){
      this.src = 'assets/images/x.png'
      this.myBox[box].color = 'boom';
      this.gifBilateral = 'assets/images/vBLJzh.gif'
      this.disableClick = 'disableClick';
      this.countdown.stop();
      this.myBox.forEach(boxs => {
        if (boxs.value == 0){
          boxs.color = 'boom';
          boxs.clicked = true;
          this.boom = 'assets/images/boom.png'
        }
      })
    }
    else if(this.myBox[box].value > 0 && this.myBox[box].color !== 'clicked'){
      this.myBox[box].color = 'clicked';
      this.countOpenCell++;
    }
    if (this.boomCount()+this.countOpenCell  == 140){
      this.disableClick = 'disableClick';
      this.winTitle = 'YOU WON'
      this.countdown.stop();
      this.gifBilateral = 'assets/images/giphy.gif';
      this.fireworksHidden = false;
      this.fireworks.start();
      this.openInputName();
    }
    this.myBox[box].clicked = true;
  }

  boomCount(): number{
    let countB = 0;
    this.myBox.forEach(box => {
      if (box.value == 0){
        countB++;
      }
    })
    return countB;
  }

  reset(){
    if (this.src == 'assets/images/x.png' || this.winTitle == 'YOU WON'){
      this.fireworks.stop();
      this.gifBilateral = '';
      this.fireworksHidden = true;
      this.generateBox(140);
      this.src = 'assets/images/smile.png';
      this.countOpenCell = 0;
      this.disableClick = '';
      this.countdown.restart();
      this.winTitle = '';
    }
  }

  config: CountdownConfig = {
    leftTime: 60,
    format: 'HH:mm:ss',
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  countdownTime: any = 0;
  handleEvent(e: CountdownEvent) {
    this.countdownTime = e.left;
    if (e.left === 0) {
      for (let i = 0; i < 140; i++){
        if (this.myBox[i].value == 0){
          this.src = 'assets/images/x.png'
          this.myBox[i].color = 'boom';
          this.disableClick = 'disableClick';
          this.myBox.forEach(boxs => {
            if (boxs.value == 0){
              boxs.color = 'boom';
              boxs.clicked = true;
              this.boom = 'assets/images/boom.png'
            }
          })
        }
      }
    }
  }
  startFirework(){
    let container = document.querySelector('.fireworks-container')
    // @ts-ignore
    this.fireworks = new Fireworks(container);
    // @ts-ignore
    this.fireworks.setOptions({
      delay: { min: 1, max: 15 },
      boundaries:{ visible: false, x: 10, y: 0, width:600, height: 440 },
      mouse: {click: false, move: false, max: 3},
      rocketsPoint: { min: 0, max: 100 },
      traceSpeed:0.1,
      intensity: 10,
    });
  }
  ngAfterViewInit(): void {
    this.startFirework();
    this.fireworksHidden  = true;
  }

  getRanks(){
    this.http.get<RankModel[]>('http://localhost:9090/allRank').subscribe(data =>{
      this.ranks = data;
    })
  }
  openInputName(){
    let options: NgbModalOptions = {
      size: 'lg',
      backdrop: false
    };
    const modalRef = this.modal.open(InputNameComponent, options);
    modalRef.componentInstance.rank = new RankModel('',(600000 - this.countdown.left).toString(),'');
    modalRef.componentInstance.isUpdate = true;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.getRanks();
      if (reason == 'update click') {

      }
    });
  }
}
