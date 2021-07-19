import Car from "./components/admin/Car";
import User from "./components/admin/User";

export function autogenerate(users, setCars, assign) {
    // Find all the people who need driving
    let usersByPickupLocation = users.sort((a, b) => {
        let nameA = a.pickupLocation.toUpperCase();
        let nameB = b.pickupLocation.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        else if (nameA > nameB) {
            return 1;
        }
        return 0;
    })


    let passengers = usersByPickupLocation.filter((user) => {
        return user.canDrive === false;
    })


    // Put them into their respective pickup locations
    let pickupLocations = [];
    for (let i = 0; i < passengers.length; i++) {
        let passenger = passengers[i];
        if (pickupLocations.length === 0 || pickupLocations[pickupLocations.length-1][0].pickupLocation !== passenger.pickupLocation) {
            pickupLocations.push([]);
        }
        
        // Always push to the same pickup location
        pickupLocations[pickupLocations.length-1].push(passenger);
    }
    
    let finalCars = [];
    let leftovers = [];

    const emptyJSON = {
        "id": null,
        "name": "None",
        "phone": "None",
        "pickupLocation": null,
        "assigned": false,
        "canDrive": false,
    }
    
    // Make the easy cars (pickup locations with more than 4 people)
    for (let pickupLocation of pickupLocations) {
        while (pickupLocation.length >= 4) {
            let newCar = new Car(null, [], "8:20AM", new User(emptyJSON), []);
            newCar.setPassengers(pickupLocation[0], pickupLocation[1], pickupLocation[2], pickupLocation[3]);
            finalCars.push(newCar);
            pickupLocation.splice(0, 4);
        }

        if (pickupLocation.length % 4 !== 0) {
            leftovers.push(pickupLocation);
        }
    }
    

    if (leftovers.length > 0) {
        leftovers.sort(function (a, b) {
              return b.length - a.length;
        });

        
        // Combine 3 passengers with 1 passenger
        if (leftovers[0].length === 3) {
            
            // Go through array in reverse order
            for (let j = leftovers.length-1; j >= 0 && leftovers.length > 0; j--) {
                // Because the array is sorted from largest to smallest
                // Once we hit a number that is not a 1, we know that there are no more 1's left. So break out early.
                if (leftovers[j].length !== 1 || leftovers[0].length !== 3) {
                    break;
                }
                
                // Make a new car and add it to the array.
                let newCar = new Car(null, [], "8:20AM", new User(emptyJSON), []);
                newCar.setPassengers(leftovers[0][0], leftovers[0][1], leftovers[0][2], leftovers[j][0]);
                finalCars.push(newCar);

                // Once we use that pickup spot, remove it from array
                leftovers.splice(0, 1);
                leftovers.splice(leftovers.length-1);
                j--;
            }
        }

        let start = leftovers.length-1;
        let hasTwo = true;
        for (let i = start; i >= 0;i--) {
            if (leftovers[i].length !== 1) {
                if (leftovers[i].length === 3) {
                    // If the first thing you see after a string of 1's is a 3, there are no 2's
                    hasTwo = false;
                }
                break;
            }
            start = i;
        }

        
        if (leftovers.length > 0 && hasTwo && start > 0 && hasTwo) {
            // Combine 2 passengers with 2 passengers
            let numOfThrees = 0;
            for (let i = 0; i < leftovers.length; i++) {
                if (leftovers[i].length !== 3) {
                    if (leftovers[i].length === 1) {
                        // If the first thing you see after a string of 3's is a 1, there are no 2's
                        hasTwo = false;
                    }
                    break;
                }
                numOfThrees = i+1;
            }



            for (let j = start; j >= 0 && hasTwo && leftovers.length > 0; j--) {
                // If we find a length of 3, we know that there are no more 2's left so break out early.
                if (leftovers[j].length === 2 && j > numOfThrees) {
                    let newCar = new Car(null, [], "8:20AM", new User(emptyJSON), []);
                    newCar.setPassengers(leftovers[numOfThrees][0], leftovers[numOfThrees][1], leftovers[j][0], leftovers[j][1]);
                    finalCars.push(newCar);
                    leftovers.splice(j, 1);
                    leftovers.splice(numOfThrees, 1);
                    j--;
                }
                else {
                    break;
                }
            }
        }
        
        // At this point, leftovers can contain either 0 or 1 2-length arrays
        // There are also no more 3-length arrays. 
        // 		If there were more 3-length arrays than 1-length arrays, 
        // 			then all the 1-length would have combined with 3-lengths, and this case would not trigger.
        //		Thus, there must be more 1-length than 3-length. 
        // Greedily combine
        for (let j = 0; j < leftovers.length; j++) {
            for (let i = 0; i < leftovers[j].length; i++) {
                let lastCar = finalCars[finalCars.length-1];
                if (finalCars.length === 0 || lastCar.isFull()) {
                    let newCar = new Car(null, [], "8:20AM", new User(emptyJSON), []);
                    finalCars.push(newCar);
                    lastCar = finalCars[finalCars.length-1];
                }
                lastCar.addPassenger(leftovers[j][i]);
            }
        }
    }

    // for (let i = 0; i < finalCars.length; i++) {
    //     let str = "CAR " + i + ": ";
    //     for (let j = 0; j < 4; j++) {
    //         if (finalCars[i].passengers[j] !== null) {
    //             str += JSON.parse(JSON.stringify(finalCars[i].passengers[j].pickupLocation));
    //             if (j != 3) {
    //                 str += ", ";
    //             }
    //         }
    //     }
    // }

    for (let i = 0; i < finalCars.length; i++) {
        finalCars[i].car_id = i;
    }

    if (assign !== undefined) {
        finalCars.forEach((car) => {
            while (car.count < 4) {
                car.addPassenger(new User(emptyJSON));
            }

            car.passengers.forEach((p) => {
                assign(p);
            })
        })
    }
    
    if (setCars !== undefined) {
        setCars(finalCars);
    }
    
}