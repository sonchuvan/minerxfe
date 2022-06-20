export interface IRankModel{
  useName?: string,
  time?: string,
  playTime?: string
}

export class RankModel implements IRankModel{
  constructor(
    public userName: string,
    public time: string,
    public playTime: string,
  ) {}
}
