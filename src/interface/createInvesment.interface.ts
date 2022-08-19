import EventArray from './eventArray.interface';

interface CreateInvesmentInterface {
  userIdx?: number;
  diaryName?: string;
  content?: string;
  eventArray?: Array<EventArray>;
}

export = CreateInvesmentInterface;
