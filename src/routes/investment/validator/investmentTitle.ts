import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import EventArrayIntrface from '../../../interface/eventArray.interface';

class InvestmentTitle {
  constructor(diaryName: string, content: string, eventArray: Array<EventArrayIntrface>) {
    this.diaryName = diaryName;
    this.content = content;
    this.eventArray = eventArray;
  }

  @IsString()
  @IsNotEmpty()
  diaryName: string;

  @IsString()
  content: string;

  @IsArray()
  @IsNotEmpty()
  eventArray: Array<EventArrayIntrface>;
}

export = InvestmentTitle;
