import {IContestQuestion} from './contest-question.interface';


export interface IContestEditionEvent {
  id: number;
  name: string;
  description?: string;
  contestName?: string;
  contestDescription?: string;
  contestEditionName?: string;
  contestEditionDescription?: string;
  contestEditionId?: string;
  contestId?: string;
  contestEventDateTime?: string;
  eventPeriodInMinutes: number;
  questions?: IContestQuestion[];
}
