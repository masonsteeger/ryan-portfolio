import { ScheduleBound } from "./ScheduleBound";

export type Day = {
  opening?: ScheduleBound;
  closing?: ScheduleBound;
  day: string;
};
