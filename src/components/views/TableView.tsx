import { useState } from "react";
import Downtimes from "../../database/Downtimes";
import { Downtime } from "../../model/Downtime";
import { ReadAndDeleteDowntimeForm } from "../forms/ReadAndDeleteDowntimeForm";
import { CreateDowntimeForm } from "../forms/CreateDowntimeForm";
import { FilterForm } from "./FilterForm";

export const TableView = (props: { context: Downtimes }) => {
  const [downtimes, setDowntimes] = useState<Downtime[]>(
    props.context.getDowntimes()
  );
  const [siteFilter, setSiteFilter] = useState<string>("");
  const [telescopeFilter, setTelescopeFilter] = useState<string>("");

  const forceUpdate = () => {
    setDowntimes(props.context.getDowntimes());
  };

  const siteFilterHandler = (event: any) => {
    setSiteFilter(event.target.value);
  };

  const telescopeFilterHandler = (event: any) => {
    setTelescopeFilter(event.target.value);
  };

  return (
    <div>
      {<CreateDowntimeForm context={props.context} redux={forceUpdate} />}
      <FilterForm
        siteFilter={siteFilter}
        telescopeFilter={telescopeFilter}
        siteFilterHandler={siteFilterHandler}
        telescopeFilterHandler={telescopeFilterHandler}
      />
      <div style={{ minHeight: 50 }}></div>
      {downtimes
        .filter((downtime: Downtime) =>
          siteFilter.length == 0 ? true : downtime.props.siteId == siteFilter
        )
        .filter((downtime: Downtime) =>
          telescopeFilter.length == 0
            ? true
            : downtime.props.telescopeId == telescopeFilter
        )
        .sort(
          (a: Downtime, b: Downtime) =>
            b.props.startDate.getTime() - a.props.startDate.getTime()
        )
        .map((downtime: Downtime) => (
          <ReadAndDeleteDowntimeForm
            context={props.context}
            redux={forceUpdate}
            downtime={downtime}
          />
        ))}
    </div>
  );
};
