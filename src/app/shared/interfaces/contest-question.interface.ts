import {IQuestionChoice} from './question-choice.interface';

export interface IContestQuestion {
  choices: IQuestionChoice[];
  tags?: string[];
  description: string;
  id: number;
  points: number;

}
