
const normalizeUser = (user) => {
    if (!user.image) {
        user.image = {}
    }
    user.image = {
        url: user.image.url || user.url || "https://img.freepik.com/free-icon/user_318-875902.jpg",
        alt: user.image.alt || user.alt || "This is where you add your pic description"
    }
    if (!user.name) {
        user.name = {}
    }
    user.name = {
        firstName: user.name.firstName,
        middleName: user.name.middleName || "",
        lastName: user.name.lastName
    }

    if (!user.address) {
        user.address = {}
    }

    user.address.zip = +user.address.zip;
    user.address = {
        state: user.address.state || "",
        country: user.address.country,
        city: user.address.city,
        street: user.address.street,
        houseNumber: user.address.houseNumber,
        zip: user.address.zip
    }

    return user;
}

module.exports = normalizeUser;