import { useState } from "react";
import EntryPoint from "../../controller/EntryPoint";
import { Downtime } from "../../model/Downtime";
import { ReadAndDeleteDowntimeForm } from "../forms/ReadAndDeleteDowntimeForm";
import { CreateDowntimeForm } from "../forms/CreateDowntimeForm";
import { FilterForm } from "./FilterForm";
import { substringMatch } from "../../Utils";

export const TableView = (props: { context: EntryPoint }) => {
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
          siteFilter.length == 0 ? true : substringMatch(siteFilter.toUpperCase(), downtime.props.siteId) 
        )
        .filter((downtime: Downtime) =>
          telescopeFilter.length == 0
            ? true
            : substringMatch(telescopeFilter.toUpperCase(), downtime.props.telescopeId) 
        )
        .sort(
          (a: Downtime, b: Downtime) =>
            (new Date(b.props.startDate)).getTime() - (new Date(a.props.startDate)).getTime()
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
