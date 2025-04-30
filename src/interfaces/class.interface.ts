export interface IAddClassRequestBody {
  subjectId: string;
  name: string;
  quota: number;
  day: string;
  startAt: string;
  endAt: string;
  room: string;
  created_by: string;
}

export interface IGetClassResponseBody {
  id: string;
  subjectId: string;
  name: string;
  quota: number;
  isFull : boolean;
  day: string;
  startAt: string;
  endAt: string;
  room: string;
}
