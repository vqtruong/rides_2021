import http from "./http-common.js";

export async function getAllTimes() {
    return http.get(`pickupTimes/`).then((rsp) => {
        return rsp.data.pickupTimesList;
    });
}

export async function addTime(timeObj) {
    return http.post(`pickupTimes/`, timeObj);
}

export async function deleteTimeByID(id) {
    return http.delete(`pickupTimes/`, {data: {ID: id}});
}