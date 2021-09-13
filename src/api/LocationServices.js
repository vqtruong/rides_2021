import http from "./http-common.js";

export async function getAllLocations() {
    return http.get(`pickupLocations/`).then((rsp) => {
        return rsp.data.pickupLocationsList;
    });
}

export function addLocation(locationObj) {
    return http.post(`pickupLocations/`, locationObj);
}

export function deleteLocationByID(id) {
    return http.delete(`pickupLocations/`, {data: {ID: id}});
}