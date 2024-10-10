export default interface ActivityAndEvent {
  type: "activity" | "event";
  title: string;
  summary: string;
  date: Date;
  fullDescription: string;
  objectifs: string;
  place: "online" | string;
  coverImage: string
}
