# carSahre server

The car share app server handles the databse created by "users" who can search for cars to rent, create their own cars. Users have full CRUD abilities and are classified as admins or regular users. Each class affords users different permissions.

## Installation

To install the server, please follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running the following command: npm i

Once the dependencies are installed, start the server using the command:

Production mode -
npm start

Developer mode -
npm run dev

The server will start running on the default port (localport 8181).

## DBConfig

In the default "config" file, under "dbOption", you can choose which DB yo'd like tot work with -
"dbOption":"local" - connects to a local mongoDB
"dbOption":"global" - connects to MongoDB Atlas (cloud DB)

## API Endpoints

### Users

- **Register a new user**
- Method: POST
- Endpoint: `/api/user/register`
- Data Requirements:

```json
{
  "name": {
    "firstName": "string (min 2 digits, max 225, required)",
    "middleName": "string (min 2 characters, max 225)",
    "lastName": "string (min 2 characters, max 225, required)"
  },
  "carModel": "string (min 2 characters, max 225, required)",
  "carType": "Sedan/Truck/Minivan/Jeep,",
  "phone": "string (10 digits, required)",
  "password": "string (minimum 9 characters, with at least one uppercase letter, one lowercase letter, one number, and one special sign (@#$))",
  "email": "string (valid email structure)",
  "address": {
    "state": "string (min 3 characters, max 255)",
    "country": "string (min 3 characters, max 255, required)",
    "city": "string (min 3 characters, max 255, required)",
    "street": "string (min 3 characters, max 255, required)",
    "houseNumber": "string (min 3 characters, max 255, required)",
    "zip": "string (min 3 characters, max 255)"
  },
  "image": {
    "url": "string (valid image URL)",
    "alt": "string (min 2 characters, max 255)"
  }
}
```

- **Login user**
- Method: POST
- Endpoint: `/api/user/users/login`
- Data Requirements:

```json
{
  "email": "string (valid email address)",
  "password": "string (min 9 characters, max 255)"
}
```

- **View all users**
- Method: GET
- Endpoint: `/api/user/users`
- Data Requirements: A valid token must be provided. Only admins can view all users.

- **Search for a user by ID**
- Method: GET
- Endpoint: `/api/user/:id`
- Data Requirements: A valid token must be provided. Admins and the same card users can search for users.

- **Edit user**
- Method: PUT
- Endpoint: `/api/user/:id`
- Data Requirements:

```json
{
  "name": {
    "firstName": "string (min 2 digits, max 225, required)",
    "middleName": "string (min 2 characters, max 225)",
    "lastName": "string (min 2 characters, max 225, required)"
  },
  "phone": "string (10 digits, required)",
  "password": "string (minimum 9 characters, with at least one uppercase letter, one lowercase letter, one number, and one special sign (@#$))",
  "address": {
    "state": "string (min 3 characters, max 255)",
    "country": "string (min 3 characters, max 255, required)",
    "city": "string (min 3 characters, max 255, required)",
    "street": "string (min 3 characters, max 255, required)",
    "houseNumber": "string (min 3 characters, max 255, required)",
    "zip": "string (min 3 characters, max 255)"
  },
  "image": {
    "url": "string (valid image URL)",
    "alt": "string (min 2 characters, max 255)"
  }
}
```

Must provide a valid token. Users can only edit their own profiles.

- **Change business account status**
- Method: PATCH
- Endpoint: `/api/user/:id`
- Data Requirements: Must provide a valid token. Users can only edit their own profiles.

- **Delete a user**
- Method: DELETE
- Endpoint: `/api/user/:id`
- Data Requirements: Must provide a valid token. Users can only delete their own profiles, while admins can delete any profile.

### Cars

- **Create car**
- Method: POST
- Endpoint: `/api/cars`
- Data Requirements:

```json
{
  "title": "string (min 2 characters, max 255, required)",
  "carType": "Truck/miniVan/Jeep/Sedan",
  "carModel": "string (min 2 characters, max 255, required)",
  "phone": "string (10 digits, required)",
  "email": "string (valid email structure, required)",
  "image": {
    "url": "string (valid image URL)",
    "alt": "string (min 2 characters, max 255)"
  },
  "address": {
    "state": "string (min 2 characters, max 255)",
    "country": "string (min 2 characters, max 255, required)",
    "street": "string (min 2 characters, max 255, required)",
    "houseNumber": "string (min 2 characters, max 255, required)",
    "zip": "string"
  }
}
```

Must provide valid token. User must be logged in and of a business user class.

- **View all cars**
- Method: GET
- Endpoint: `/api/cards/`
- Data Requirements: None. All visitors can view all cards.

- **Find car by ID**
- Method: GET
- Endpoint: `/api/cars/:id`
- Data Requirements: None. All visitors can view all cars.

- **Find available car**
- Method: GET
- Endpoint: `/api/cars/:startDate/:endDate`
- Data Requirements: None. All visitors can view all cars.

- **View your own cars**
- Method: GET
- Endpoint: `/api/cars/my-cars`
- Data Requirements: Must provide a valid token.

- **Edit car**
- Method: PUT
- Endpoint: `/api/cars/:id`
- Data Requirements:

```json
{
  "title": "string (min 2 characters, max 255, required)",
  "carType": "Sedan/minivan/Truck/Jeep",
  "phone": "string (10 digits, required)",
  "email": "string (valid email structure, required)",
  "image": {
    "url": "string (valid image URL)",
    "alt": "string (min 2 characters, max 255)"
  },
  "address": {
    "state": "string (min 2 characters, max 255)",
    "country": "string (min 2 characters, max 255, required)",
    "street": "string (min 2 characters, max 255, required)",
    "houseNumber": "string (min 2 characters, max 255, required)",
    "zip": "string"
  }
}
```

Must provide a valid token. A card can only be edited by its creator.

- **Like a car**
- Method: PATCH
- Endpoint: `/api/cards/like/:id`
- Data Requirements: Must provide a valid token. Only logged-in users can like a car.

- **Delete card**
- Method: DELETE
- Endpoint: `/api/cards/:id`
- Data Requirements: Must provide a valid token. A card can only be deleted by its owner or any admin.

## Contact

For any further information or inquiries, please feel free to contact:

- Name: Alon Malimsky
- Phone: 0534303677
- Email: alonamlichi@gmail.com
