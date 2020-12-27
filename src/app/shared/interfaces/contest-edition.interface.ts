import {IContestEditionEvent} from './contest-edition-event.interface';
import {IContestQuestion} from './contest-question.interface';

export interface IContestEdition {
  events?: IContestEditionEvent[];
  eventDateTime?: string;
  id: number;
  name: string;
  contestId?: number;
  status?: 'upcoming' | 'in-progress' | 'completed';
  description?: string;
  edition?: number;
  contestName?: string;
  contestDescription?: string;
  createdAt?: string;
}
