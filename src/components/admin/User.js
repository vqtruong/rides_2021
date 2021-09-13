export default class User {
    constructor(user) {
        user.ID === undefined ? this.ID = user._id : this.ID = user.ID;
        this.name = user.name;
        this.phone = user.phone;
        this.email = user.email;
        this.pickupLocation = user.pickupLocation;
        user.assigned === undefined ? this.assigned = false : this.assigned = user.assigned;
        this.canDrive = user.canDrive;
        user.isTemporaryUser === undefined ? this.isTemporaryUser = false : this.isTemporaryUser = true;
        user.capacity === undefined ? this.capacity = 0 : this.capacity = user.capacity;
    }

    reset() {
        this.name = "None";
        this.phone = "-";
        this.email = "None";
        this.ID = null;
        this.assigned = false;
        this.pickupLocation = undefined;
    }
}

