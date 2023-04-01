import * as React from "react";
import getAdsAPI from "../services/getAds";

export type AdType = {
    id: number;
    title: string;
    image: string;
    text: string;
    createdAt: Date;
    startAt: Date;
    numDaysOfDiffusion: number;
}
const DisplayAds = (): JSX.Element => {

    const [ads, setAds] = React.useState<AdType[]>([]);
    const [indexAdActive, setIndexAdActive] = React.useState<number>(0)

    React.useEffect(() => {
        getAdsAPI()
            .then((adsReceived) => {
                console.log("ADS RECEIVED --> ", adsReceived)
                setAds(adsReceived)
            })
    }, [])

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("indexAdActive", indexAdActive);
            console.log("Length ads --> ", ads.length)
            if (indexAdActive + 1 === ads.length){
                setIndexAdActive(0)
            }else {
                setIndexAdActive(indexAdActive + 1)
            }
        }, 15000);

        return () => {
            clearInterval(intervalId);
        };
    }, [indexAdActive]);


    return (
        <div>
            {ads.length > 0 ?
                ads[indexAdActive].image === null ?
                    <p>{ads[indexAdActive].title} --- {ads[indexAdActive].text}</p>:
                    <p>{ads[indexAdActive].image}</p> :
                <h1>ON LOAD !! :)</h1>

            }
        </div>
    )

}

export default DisplayAds;
