export interface IContestEdition {
  id: number;
  name: string;
  contestId?: number;
  status?: 'upcoming' | 'in-progress' | 'completed';
  description?: string;
  edition?: number;
  contestName?: string;
  contestDescription?: string;
  createdAt?: string
}
