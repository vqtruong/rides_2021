export default class User {
    constructor(user) {
        user.ID == undefined ? this.ID = user._id : this.ID = user.ID;
        this.name = user.name;
        this.phone = user.phone;
        this.email = user.email;
        this.pickupLocation = user.pickupLocation;
        this.assigned === undefined ? this.assigned = false : this.assigned = user.assigned;
        this.canDrive = user.canDrive;
        user.isTemporaryUser === undefined ? this.isTemporaryUser = false : this.isTemporaryUser = true;
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

