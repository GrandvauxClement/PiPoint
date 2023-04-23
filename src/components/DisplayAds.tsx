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
    const adsRef = React.useRef<AdType[]>([]);
    const [indexAdActive, setIndexAdActive] = React.useState<number>(0)
    const apiUrl = import.meta.env.VITE_API_URL;

    React.useEffect(() => {
        getAdsAPI()
            .then((adsReceived) => {
                adsRef.current = adsReceived;
                setAds(adsReceived)
            })
    }, [])

    React.useEffect(() => {

        const intervalId = setInterval( () => {
            setIndexAdActive((prevIndex) => {
                // Vérifier si l'index actuel est égal à la longueur des annonces ou à zéro
                // Si c'est le cas, revenir à l'index zéro, sinon incrémenter l'index
                if (prevIndex + 1 === adsRef.current.length || adsRef.current.length === 0) {
                    return 0;
                } else {
                    return prevIndex + 1;
                }
            });
        }, 15000);

        return () => {
            clearInterval(intervalId);
        };
    }, [indexAdActive]);


    React.useEffect(() => {

        const intervalId = setInterval(() => {
            const date = new Date();
            const hour = date.getHours();
            // Mettre à jour l'élément à chaque changement d'heure
            if (date.getMinutes() === 0 && hour < 20 && hour > 5) {
                getAdsAPI()
                    .then((adsReceived) => {
                        adsRef.current = adsReceived;
                        setAds(adsReceived)
                    })
            }
        }, 60000); // Vérifie l'heure toutes les minutes

        return () => clearInterval(intervalId);
    }, [ads]);

    return (
        <div style={{
            height: "85vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            }}
        >
            {ads.length > 0 ?
                ads[indexAdActive].image === null ?
                    <p>{ads[indexAdActive].title} --- {ads[indexAdActive].text}</p>:
                    <img
                        src={`${apiUrl}/assets/${ads[indexAdActive].image}`}
                        alt={ads[indexAdActive].title}
                        style={{height: "100%", objectFit:"contain"}}
                    /> :
                <h1>ON LOAD !! :)</h1>
            }
        </div>
    )

}

export default DisplayAds;
