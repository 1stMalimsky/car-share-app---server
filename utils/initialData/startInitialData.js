const userServiceModel = require("../../model/mongoDB/users/userService");
const carServiceModel = require("../../model/mongoDB/cars/carService");
const userList = require("./userList.json");
const carList = require("./carList.json");
const chalk = require("chalk");
const hashServiceModel = require("../../utils/hash/hashService");
const normalizeUser = require("../../utils/normalize/normalizeUser");
const normalizeCar = require("../../utils/normalize/normalizeCar");

const checkData = async () => {
    try {
        let allUsers = await userServiceModel.getAllUsers();
        let allCars = await carServiceModel.getAllCars();
        if (allUsers.length === 0) {
            await Promise.all(
                userList.map(async (user) => {
                    try {
                        normalizeUser(user);
                        user.password = await hashServiceModel.generateHash(user.password);
                        await userServiceModel.registerUser(user);
                    }
                    catch (err) {
                        res.status(500).json({ message: err.message || err });
                    }
                })
            )
            console.log("Users created");
        }
        allUsers = await userServiceModel.getAllUsers()
        if (allCars.length == 0) {
            for (let i = 0; i < 3; i++) {
                //normalizeCar(carList[i]);
                await carServiceModel.createCar({ ...carList[i], user_id: allUsers[i]._id });
            };
            console.log("Cars Created");
        }
        else return console.log("Database already exists");
    }
    catch (err) {
        console.log(chalk.red.bold("initial err: ", err.message || err));
    }
}


module.exports = {
    checkData
}