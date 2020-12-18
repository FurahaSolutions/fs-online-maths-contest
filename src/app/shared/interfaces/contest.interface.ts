export interface IContest {
  id: number;
  name: string;
  contestId?: number;
  status?: 'upcoming' | 'in-progress' | 'completed';
  description?: string;
  edition?: number;
  shortDescription?: string;
}
