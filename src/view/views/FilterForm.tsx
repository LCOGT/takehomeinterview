import {
  sectionContainer,
  entryContainer,
  entryKeyStyle,
  entryValueStyle,
  sectionHeader,
} from "../forms/Styles";

export const FilterForm = (props: {
  siteFilter: string;
  telescopeFilter: string;
  siteFilterHandler: (event: any) => void;
  telescopeFilterHandler: (event: any) => void;
}) => {
  return (
    <div style={sectionContainer}>
      <div style={sectionHeader}>Filters</div>
      <div style={{ width: "50%", margin: 5 }}>
        <div style={entryContainer}>
          <div style={entryKeyStyle}>Filter by site name: </div>
          <label style={entryValueStyle}>
            <input
              type="text"
              value={props.siteFilter}
              onChange={props.siteFilterHandler}
            />
          </label>
        </div>
        <div style={entryContainer}>
          <div style={entryKeyStyle}>Filter by telescope name: </div>

          <label style={entryValueStyle}>
            <input
              type="text"
              value={props.telescopeFilter}
              onChange={props.telescopeFilterHandler}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
