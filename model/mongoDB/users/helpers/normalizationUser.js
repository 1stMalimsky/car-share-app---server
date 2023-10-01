const normalizeUser = (userData) => {
  let normalUser = {
    name: {
      firstName: userData.firstName,
      middleName: userData.middleName || "",
      lastName: userData.lastName,
    },
    address: {
      state: userData.state || "",
      country: userData.country,
      city: userData.city,
      street: userData.street,
      houseNumber: userData.houseNumber,
      zip: userData.zip
    },
    image: {
      url: userData.imageUrl || "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
      alt: userData.imageAlt || "yellow fluffy chickens"
    },
    email: userData.email,
    password: userData.password,
    phone: userData.phone
  }

  return normalUser;
};

module.exports = normalizeUser;
