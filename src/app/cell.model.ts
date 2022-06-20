import {BoxModel} from "./box.model";

export interface ICellModel{
  center: number,
  top?: number;
  bot?: number;
  left?:number;
  right?: number;
  top_left?: number;
  top_right?:number;
  bot_left?:number;
  bot_right?: number;
}

export class CellModel implements ICellModel{
  constructor(
    public center: number,
    public top?: number,
    public bot?: number,
    public left?:number,
    public right?: number,
    public top_left?: number,
    public top_right?:number,
    public bot_left?:number,
    public bot_right?: number,
  ) {}
}
