/**
 * Get Ads
 * @returns
 */

export type Stop = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    adressIp: string;
}

const getStopInfo = (): Promise<Stop> => {
    const stopAddressIp = import.meta.env.VITE_STOP_ADDRESS_IP;
    const apiUrl = import.meta.env.VITE_API_URL;
    return new Promise((resolve, reject) => {
        const request = new Request(
            `${apiUrl}/pi-point/stop?addressIp=${stopAddressIp}`,
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

export default getStopInfo;
