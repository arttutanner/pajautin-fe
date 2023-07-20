export type ScheduleEvent = {
    startTime : string;
    endTime : string;
    title : string;
    description : string | null;
    type : string ;
    location : string | null;
    workshopId : number | null;
    base: boolean;
    slot : number | undefined;
}