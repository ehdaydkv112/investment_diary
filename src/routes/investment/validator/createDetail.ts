import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

class CreateInvestmentDetail {
  constructor(diaryIdx: number, ticker: string, diaryEventName: string, price: number) {
    this.diaryIdx = diaryIdx;
    this.ticker = ticker;
    this.diaryEventName = diaryEventName;
    this.price = price;
  }

  @IsNumber()
  @IsNotEmpty()
  diaryIdx: number;

  @IsString()
  @IsNotEmpty()
  ticker: string;

  @IsString()
  @IsNotEmpty()
  diaryEventName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export = CreateInvestmentDetail;
