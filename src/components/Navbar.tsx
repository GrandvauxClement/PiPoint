import * as React from "react";
import getStopInfo, {Stop} from "../services/getStopInfo";

const Navbar = (): JSX.Element => {

    const [stop, setStop] = React.useState<Stop>();
    const [time, setTime] = React.useState<Date>(new Date());

    React.useEffect(() => {
        getStopInfo()
            .then((data) => {
                setStop(data);
            })
    }, []);

    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()),1000);
        return () => clearInterval(timer);
    })


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

                height: "5vh"
            }}
        >
            <p>
                {stop?.name}
            </p>
            <p>
                {time.toLocaleTimeString()} - {new Date().toLocaleDateString()}
            </p>
        </div>
    )
}

export default Navbar
