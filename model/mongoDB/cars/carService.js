const Car = require("./Car");


const getAllCars = () => {
    return Car.find();
}

const createCar = (cardToCreate) => {
    const car = new Car(cardToCreate);
    return car.save();
}

const initializeCars = (arr) => {
    return Car.insertMany(arr);
}

const findCarById = (id) => {
    return Car.findById(id)
}

const findAvailableCars = (chosenStart, chosenEnd) => {
    const availableCars = Car.find(
        {
            bookedDates: {
                $not: {
                    $elemMatch: {
                        $or: [
                            {
                                $and: [
                                    { start: { $gte: +chosenStart } },
                                    { start: { $lte: +chosenEnd } }
                                ]
                            },
                            {
                                $and: [
                                    { end: { $gte: +chosenStart } },
                                    { end: { $lte: +chosenEnd } }
                                ]
                            },
                            {
                                $and: [
                                    { start: { $gte: +chosenStart } },
                                    { end: { $lte: +chosenEnd } },
                                ]
                            },
                            {
                                $and: [
                                    { start: { $lte: +chosenStart } },
                                    { end: { $gte: +chosenEnd } },
                                ]
                            }
                        ]
                    }
                }
            }
        }
    );

    return availableCars;
};

const findMany = (userId) => {
    return Car.find({ user_id: userId });
}

const updateCar = (carId, updatedCar) => {
    return Car.findByIdAndUpdate(carId, updatedCar, {
        new: true
    });
};

const deleteCar = (id) => {
    return Car.deleteOne({ _id: id });
}

module.exports = {

    getAllCars,
    createCar,
    initializeCars,
    findMany,
    findCarById,
    updateCar,
    deleteCar,
    findAvailableCars
}