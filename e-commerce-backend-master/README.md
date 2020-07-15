## E-commerce Planet Green - Backend

# Getting Start

1. git clone or download this backend project to your local machine

2. make sure that nodejs is installed, if not please follow the link:

- https://nodejs.org/en/download/

3. run `npm install` in terminal

4. run `npm run dev` and make sure your app is running

5. As by default user role is 'user' after created a user

- should manually change one user as the role ==='admin' in mongoDB .

6. to make it easier to test at frontend, import the data from data/products.json to get the general product data,

- run `node seeder.js -i`
  or delete all
- run `node seeder.js -d`

- there is no images in json file yet, images could be uploaded and deleted seperately thorugh frontend part after product data imported.

- [for app flow and explaination of each functionality of this app please see this file ](planet-green-backend/e-commerce-backend-master/notes.txt) 

# Dendencies for this project

There are some dependencies shoud be installed, if not please insert the following command lines in terminal:

1. Install express generator CLI (https://expressjs.com/en/starter/generator.html)

2. Install nodemon

- npm install nodemon

3. In package.json add script `"dev": "nodemon index.js",`

4. Install cookie-session for user login and logout cookie storage
   npm install cookie-session

5. Install express-validator to do form validations

- npm install express-validator

7. Install mongoose for connecting MongoDB

- npm install mongoose

8. Install http-errors to handle error messages

- npm install http-errors

9. Install multer for handling image files
   Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

- npm install multer

10. Implement JWT authentication strategy using jsonwebtoken

- Install the following dependencies:

  - npm install jsonwebtoken

# Implement MongoDB

1. install MongoDB

- Install MongoDB on Mac (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) and/or
- Install MongoDB on Windows (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- Install MongoDB Compass (Mac/Windows) (https://docs.mongodb.com/compass/master/install/)

2. Establish connection to MongoDB using Mongoose Library
3. Double check whether DB has been created using Mongo Compass

4. for checking API endpoint and http request (GET, POST, PATCH, DELETE), could install the following

- Install Insomnia (https://insomnia.rest/download/#mac)
  or
- Install Postman (https://www.postman.com/)

# Files in this porject

# index.js

- load the router modules, cookies session

# Config

1. /config/db.js

- connect MongoDB

2. /config/db.js

- contain configurations of jwt secret key, mongoURI, imageDirctory and localhost

```
export default {
  jwtSecret: '12345-67890-09876-54321',
  mongoURI:
    'mongodb://localhost/e-commerce'
    (which is mongoURL: 'mongodb://localhost/<your db name>')
  imageDirectory: 'images',
  port: 5000,
  host: 'localhost',
};
```

# User Model

1. /models/User.js
   Create User Model with mongoose schema

- using password manager to hash the password (import the file from /services/PasswordManager.js)
- use as follow:

```
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

```

- using jwt.sign() to get the token:

```
userSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this.id,
      userName: this.userName,
      email: this.email,
      role: this.role,
    },
    keys.jwtSecret,
    {
      expiresIn: '30d',
    }
  );
};
```

# User Route

1. /routes/auth.js

- set the user register, login, logout routes

# User Controller

1. /controllers/auth.js

- Signup && Signin
  validation is ran before routehandler is hit
  sets token in request headers under req.session.jwt

- Signout
  removes token from header

# User Middlewares

1. /middlewares/current-user.js

- verify the user with jwt token
- currentUser middleware checks if req.session.jwt is defined
- if so set req.currentUser to verified jwtToken

2. /middlewares/authorizeAdmin.js

- authorize admin looks at the decoded token set to currentUser
- to check the user authentication, if the user role is 'admin'
- if user.role !== 'admin' stop request
- if user.role === 'admin' proceed to route handler

3. /middlewares/require-auth.js

- requireAuth middleware stops request if req.currentUser is not defined
- to check if the user is authorized to do some requests

# User Validation

1. /validation/auth-validation.js

- like middleware to validate and check form input for register and signin

# Product Model

1.  /models/Product.js
    Create Product Model with mongoose schema

# Product Route

1. /routes/products.js

- Set products , single product routes

# Product Controller

1. /controllers/products.js
   look for products and request, response the data body

- unlinkImage
  - to remove image from file system
- getProducts
- getProduct by id
- createProduct
- updateProduct
- deleteProduct and deleteImageAtProduct
  - through deleteImagesAtProduct, delete all images in the single product
  - product details would be deleted
- uploadImages and deleteSingleImage
  - to add, update and also delete a single image from images folder (directory)

# Product Validation

1. /validation/product-validation.js

- Check form validation at create product

# Image Route

1. /routes/image.js

- Set image routes for adding, updateing and deleting a single image

# Image middleware

1. /middlewares/imageUpload.js

- implement mutler to set the image file path and images directory
