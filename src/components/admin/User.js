export default class User {
    constructor(user) {
        this.name = user.name;
        this.phone = user.phone;
        this.email = user.email;
        this.id = user.id;
        this.pickupLocation = user.pickupLocation;
        this.assigned = user.assigned;
        this.canDrive = user.canDrive;
        user.temporaryUser === undefined ? this.temporaryUser = false : this.temporaryUser = true;
    }

    reset() {
        this.name = "None";
        this.phone = "-";
        this.email = "None";
        this.id = null;
        this.assigned = false;
        this.pickupLocation = undefined;
    }
}

