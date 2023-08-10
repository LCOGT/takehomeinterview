// Downtime class
export class Downtime {
  constructor(
    downtime_id,
    time_start,
    time_end,
    telescope_id,
    telescope_site,
    reason
  ) {
    this.downtime_id = downtime_id;
    this.time_start = time_start;
    this.time_end = time_end;
    this.telescope_id = telescope_id;
    this.telescope_site = telescope_site;
    this.reason = reason;
  }
}
