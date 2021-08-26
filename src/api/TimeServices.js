import http from "./http-common.js";

export async function getAllTimes() {
    return http.get(`pickupTimes/`).then((rsp) => {
        return rsp.data.pickupTimesList.map((time) => {
            return time;
        });
    });
}

export function addTime(timeObj) {


    return http.post(`pickupTimes/`, timeObj);
}

export function deleteTimeByID(id) {
    return http.delete(`pickupTimes/`, {data: {ID: id}});
}