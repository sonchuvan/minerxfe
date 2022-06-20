export interface IBoxModel{
  value?: number,
  color?: string,
  text?: string
  clicked?: boolean,
  flag?: boolean
}

export class BoxModel implements IBoxModel{
  constructor(
    public value: number,
    public color: string,
    public text: string,
    public clicked: boolean,
    public flag: boolean,
  ) {}
}
