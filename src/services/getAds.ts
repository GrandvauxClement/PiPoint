/**
 * Get Ads
 * @returns
 */
import {AdType} from "../components/DisplayAds";

const getAdsAPI = (): Promise<AdType[]> => {
    const stopAddressIp = import.meta.env.VITE_STOP_ADDRESS_IP;
    const apiUrl = import.meta.env.VITE_API_URL;
    return new Promise((resolve, reject) => {
        const request = new Request(
            `${apiUrl}/test`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        fetch(request)
            .then((res) => {
                res.json().then((json) => {
                    resolve(json)
                });
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

export default getAdsAPI;
