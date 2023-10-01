const express = require("express");
const router = express.Router();
const carsServiceModel = require("../../../model/mongoDB/cars/carService")
const { checkCredentials, loggedInCheck } = require("../../../middleware/userAuthMiddleware");
const validateId = require("../../../validation/joi/userIdValidation")
const { validateEditCarSchema } = require("../../../validation/joi/carEditValidation");
const { validateBookedDatesSchema } = require("../../../validation/joi/bookDatesValidation")
const { validateCarSchema } = require("../../../validation/joi/carValidation");
const normalizeCar = require("../../../utils/normalize/normalizeCar");
const nomalizeEdit = require("../../../utils/normalize/normalizeEditCar");
const normalizeEditCar = require("../../../utils/normalize/normalizeEditCar");

/* POST requests */

router.post("/", loggedInCheck, async (req, res) => {
    try {
        const newCar = normalizeCar(req.body);
        await validateCarSchema(newCar);
        const carData = { ...newCar, user_id: req.tokenPayload.userId };
        await carsServiceModel.createCar(carData);
        res.status(200).json({
            message: "car created",
            cardData: carData
        })
    }
    catch (err) {
        res.status(400).json({ message: err.message || err })
    }

})

/* GET requests */

router.get("/", async (req, res) => {
    try {
        const allCars = await carsServiceModel.getAllCars();
        res.status(200).json({ allCars: allCars })
    }
    catch (err) {
        res.status(400).json({ message: err.message || err });
    }
});

router.get("/my-cars", loggedInCheck, async (req, res) => {
    try {
        const foundCards = await carsServiceModel.findMany(req.tokenPayload.userId);
        if (foundCards.length == 0) {
            res.status(404).json({ message: "no cars found" })
        }
        else {
            res.status(200).json(foundCards)
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message || err });
    }
})

router.get("/:id", async (req, res) => {
    try {
        await validateId({ id: req.params.id });
        const reqId = req.params.id;
        const foundCar = await carsServiceModel.findCarById(reqId)
        if (!foundCar) {
            throw ("no car found")
        }
        res.status(200).json(foundCar);
    }
    catch (err) {
        res.status(400).json({ message: err.message || err })
    }

});

router.get("/:start/:end", async (req, res) => {
    let start = req.params.start;
    let end = req.params.end;
    if (!start || !end) {
        return console.log("dates undefiend");
    }
    try {
        console.log("PARAMS!!!!!!!!! = ", start, end);
        const data = await carsServiceModel.findAvailableCars(start, end)
        console.log(data);
        if (data) {
            res.status(200).json(data)
        }
        else throw new Error;
    }
    catch (err) {
        console.log("Car search error", err);
    }
})

/* PUT requests */

router.put("/:id", loggedInCheck, async (req, res) => {
    try {
        console.log("edit req.body", req.body);
        validateId({ id: req.params.id });
        const carId = req.params.id;
        const foundCar = await carsServiceModel.findCarById(carId);
        if (!foundCar) {
            throw ("car not found")
        }
        const updatedData = await validateEditCarSchema(req.body);
        console.log("updated Data", updatedData);
        normalizeEditCar(updatedData);
        console.log("updated Data", updatedData);
        if (foundCar.user_id == req.tokenPayload.userId) {
            await carsServiceModel.updateCar(carId, updatedData)
            res.status(200).json({
                message: "Car update successful",
                Edited_Car: updatedData
            })
        }
        else throw ("You are not the owner of the car you are trying to edit!")
    }
    catch (err) {
        res.status(400).json({ message: err.message || err });
    }
})

router.put("/book/:id", async (req, res) => {
    try {
        console.log("book req.body", req.body);
        validateId({ id: req.params.id });
        const carId = req.params.id;
        const foundCar = await carsServiceModel.findCarById(carId);
        if (!foundCar) {
            throw ("car not found")
        }
        const dataToUpdate = await validateBookedDatesSchema(req.body);
        foundCar.bookedDates.push({
            start: req.body.start,
            end: req.body.end
        });
        await foundCar.save();
        res.status(200).json({
            message: "Car update successful",
            Edited_Car: dataToUpdate
        })
    }
    catch (err) {
        res.status(400).json({ message: err.message || err });
    }
})

/* PATCH requests */

router.patch("/like/:id", loggedInCheck, async (req, res) => {
    try {
        await validateId({ id: req.params.id });
        const carId = req.params.id;
        const userId = req.tokenPayload.userId;
        const foundCar = await carsServiceModel.findCarById(carId);
        if (!foundCar) {
            throw ("The card you are attempting to like is not found")
        }
        if (req.tokenPayload && foundCar.likes.includes(userId)) {
            const unlikeUpdated = foundCar.likes.filter((user) => user !== userId)
            foundCar.likes = unlikeUpdated;
            await carsServiceModel.updateCar(carId, foundCar);
            res.status(200).json({ message: "unlike submitted" })
        }
        else {
            const likeUpdated = foundCar.likes.concat(userId);
            foundCar.likes = likeUpdated;
            await carsServiceModel.updateCar(carId, foundCar);
            res.status(200).json({ message: "like submitted" })
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message || err });
    }
})

/* DELETE requests */

router.delete("/:id", loggedInCheck, async (req, res) => {
    try {
        await validateId({ id: req.params.id });
        const carId = req.params.id
        foundCar = await carsServiceModel.findCarById(carId);
        if (!foundCar) {
            throw ("The car you are attempting to delete was not found")
        }
        if (req.tokenPayload && req.tokenPayload.userId == foundCar.user_id || req.tokenPayload.isAdmin) {
            await carsServiceModel.deleteCar(carId);
            res.status(200).json({ message: "card deleted" })
        }
        else res.status(400).json({ message: "You are not authorized to delete this card" })
    }
    catch (err) {
        res.status(400).json({ message: err.message || err });
    }
})

module.exports = router;