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
                    'Content-Type': 'application/json',
                  //  'Access-Control-Allow-Origin': '**', // Spécifier l'origine autorisée (ou remplacer par l'origine appropriée)
                  //  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', // Spécifier les en-têtes autorisés
                  //  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
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
