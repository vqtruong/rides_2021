export default class Car {
    constructor(id, pickupLocations, pickupTime, driver, passengers) {
        this.id = id;
        this.pickupLocations = pickupLocations;
        this.pickupTime = pickupTime;
        this.driver = driver;
        this.passengers = passengers;
        this.count = 0;
        this.capacity = 4;
    }

    getPickupLocations() {
        let str = "";
        if (this.pickupLocations.length === 0) {
            return "None";
        }
        for (let i = 0; i < this.pickupLocations.length; i++) {
            if (i !== this.pickupLocations.length - 1) {
                str += this.pickupLocations[i] + ", ";
            }
            else {
                str += this.pickupLocations[i];
            }
        }
        return str;
    }

    addPickupLocations(location) {
        if (location === undefined || location === null) {
            return;
        }

        for (let i = 0; i < this.pickupLocations.length; i++) {
            // If the location already exists, don't add it
            if (this.pickupLocations[i] === location) {
                return;
            }
        }
        this.pickupLocations.push(location);
    }

    removePassenger(passengerIndex) {
        this.passengers[passengerIndex].reset();
        this.pickupLocations = [];
        for (let i = 0; i < this.passengers.length; i++) {
            this.addPickupLocations(this.passengers[i].pickupLocation);
        }
    }

    setPassengers(p0, p1, p2, p3) {
        this.count = 0;
        this.passengers[0] = p0;
        this.passengers[1] = p1;
        this.passengers[2] = p2;
        this.passengers[3] = p3;
        if (p0 != null) {
            this.addPickupLocations(p0.pickupLocation);
            this.count++;
        }
        if (p1 != null) {
            this.addPickupLocations(p1.pickupLocation);
            this.count++;
        }
        if (p2 != null) {
            this.addPickupLocations(p2.pickupLocation);
            this.count++;
        }
        if (p3 != null) {
            this.addPickupLocations(p3.pickupLocation);
            this.count++;
        }
    }

    isFull() {
        return (this.count === this.capacity);
    }

    addPassenger(p) {
        for (var i = 0; i < 4; i++) {
            if (this.passengers[i] == null) {
                this.passengers[i] = p;
                this.count++;
                this.addPickupLocations(p.pickupLocation);
                return true;
            }
        }
        return false;
    }
}