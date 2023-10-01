
const normalizeEditCar = (car) => {

    if (!car.image) {
        car.image = {}
    }
    car.image = {
        url: car.url || "https://cdn2.iconfinder.com/data/icons/admin-tools-2/25/image2-512.png",
        alt: car.alt || "This is where you add your pic description"
    }
    if (car.image.url === "") {
        car.image.url = "https://cdn2.iconfinder.com/data/icons/admin-tools-2/25/image2-512.png";

    }
    if (car.image.alt === "") {
        car.image.alt = "This is where you add your pic description"
    }

    if (!car.address) {
        car.address = {};
    }

    car.address.state = car.state || "";
    car.address.country = car.country;
    car.address.city = car.city;
    car.address.street = car.street;
    car.address.houseNumber = car.houseNumber;
    car.address.zip = car.zip;

    return car
}


module.exports = normalizeEditCar