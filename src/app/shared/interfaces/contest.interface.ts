import {IContestEdition} from './contest-edition.interface';

export interface IContest {
  id: number;
  name: string;
  description?: string;
  editions?: IContestEdition[]
}
