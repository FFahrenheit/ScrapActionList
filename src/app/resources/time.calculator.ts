export class TimeCalculator{
    constructor(){};

    public static daysDiff(fromString : string, to : Date = new Date()){
        let from = this.stringToDateOffset(fromString);
        // console.log({ from, to });
        from.setHours(0,0,0,0);
        to.setHours(0,0,0,0);
        let difference = from.getTime() - to.getTime();
        difference = Math.ceil(difference / (1000 * 3600 * 24));
        // console.log({ from, to, difference });
        return difference;
    }

    public static stringToDateOffset(str : string) : Date{
        let date = new Date(str);
        let timeOffset = date.getTimezoneOffset() * 60_000;
        // console.log({str, date, timeOffset});
        return new Date(date.getTime() + timeOffset); //Why works? Should be (-)
    }
}