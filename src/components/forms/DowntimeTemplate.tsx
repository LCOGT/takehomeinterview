export const COL1_WIDTH = 350;
export const COL2_WIDTH = 250;
export const TOTAL_WIDTH = 800;

export const sectionHeader = {
    fontWeight: 600,
    fontSize: 20,
    margin: 10,
    paddingBottom: 10,

}

export const sectionContainer = {
    margin: 10,
    padding: 10,
    maxWidth: TOTAL_WIDTH,
    textAlign: "left" as "left",
    backgroundColor: "#efefff",
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

}

export const entryValueStyle = {

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