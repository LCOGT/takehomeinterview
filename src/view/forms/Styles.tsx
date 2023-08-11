export const COL1_WIDTH = 350;
export const COL2_WIDTH = 250;
export const TOTAL_WIDTH = 960;

export const sectionHeader = {
    fontWeight: 600,
    fontSize: 24,
    margin: 10,
    paddingBottom: 20,
}

export const sectionContainer = {
    margin: 20,
    padding: 10,
    maxWidth: TOTAL_WIDTH,
    textAlign: "left" as "left",
    backgroundImage: "linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))",
    borderStyle: "solid",
    borderColor: "rgb(230, 230, 230)",
    borderWidth: 1,
    borderRadius: 10,
    filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.05))",
}

export const columnStyle = {
    margin: 5,
    padding: 10,
    textAlign: "left" as "left",
}

export const entryContainer = {
    padding: 5,
    display: "flex", 
    justifyContent: "space-between",
}

export const entryKeyStyle = {
    fontSize: 16,
    fontWeight: 600,
}

export const entryValueStyle = {
    fontSize: 16,
    fontWeight: 400,
}

export const toggleTextStyle = {
    padding: 5,
    fontSize: 15,
}

export const DowntimeTemplate = (props: {
    downtimeId?: any,
    siteId: any,
    telescopeId: any,
    startDate: any,
    endDate: any,
    reason?: any,
    createOrUpdateButton?:any,
    expandButton?: any,
    deleteButton?: any,
}) => {
   return (<div style={sectionContainer}>
    <div>
        <div style={{float: "left" as "left", minWidth: COL1_WIDTH}}>
            <props.downtimeId />
            <props.siteId />
            <props.telescopeId />
        </div>
        <div style={{float: "left" as "left", minWidth: COL2_WIDTH}}>
            <props.startDate />
            <props.endDate />
        </div>
        {props.reason ? (<div style={{float: "right" as "right"}}>
            <props.createOrUpdateButton />
        </div>) : (<></>)}
    </div>
    {props.expandButton ? (<div>
        <props.expandButton />
    </div>) : (<></>)}
    <div>
        {props.createOrUpdateButton ? (<div style={{float: "left" as "left"}}>
            <props.createOrUpdateButton />
        </div>) : (<></>)}
        
        {props.deleteButton ? (<div style={{float: "left" as "left"}}>
            <props.deleteButton />
        </div>) : (<></>)}
    </div>
   </div>);
}