import * as React from "react";
import getStopInfo, {Stop} from "../services/getStopInfo";

const Navbar = (): JSX.Element => {

    const [stop, setStop] = React.useState<Stop>()

    React.useEffect(() => {
        getStopInfo()
            .then((data) => {
                setStop(data);
            })
    }, []);


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
                {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}
            </p>
        </div>
    )
}

export default Navbar
