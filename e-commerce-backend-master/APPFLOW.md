App Flow

Signup && Signin
- validation is ran before routehandler is hit
- sets token in request headers under req.session.jwt

getProducts
- currentUser middleware checks if req.session.jwt is defined 
 - if so set req.currentUser to verified jwtToken
 - whether or not it is defined proceed to route  

 getProduct/:id
- currentUser middleware checks if req.session.jwt is defined 
 - if so set req.currentUser to verified jwtToken
 - whether or not it is defined proceed to route handler 

 createProduct/
- currentUser middleware checks if req.session.jwt is defined 
 - if so set req.currentUser to verified jwtToken
- requireAuth middleware stops request if req.currentUser is not defined 
- authorize admin looks at the decoded token set to currentUser 
- if user.role !== 'admin' stop request
- if user.role === 'admin' proceed to route handler

 updateProduct/
- currentUser middleware checks if req.session.jwt is defined 
 - if so set req.currentUser to verified jwtToken
- requireAuth middleware stops request if req.currentUser is not defined 
- authorize admin looks at the decoded token set to currentUser 
- if user.role !== 'admin' stop request
- if user.role === 'admin' proceed to route handler

 uploadImages/
- currentUser middleware checks if req.session.jwt is defined 
 - if so set req.currentUser to verified jwtToken
- requireAuth middleware stops request if req.currentUser is not defined 
- authorize admin looks at the decoded token set to currentUser 
- if user.role !== 'admin' stop request
- if user.role === 'admin' proceed to route handler
- admin could uploadImages while update or create a product
- uploadImage middleware would set the file path and store the images at images directory
- uploadImages would return a filename and save in product image.

deleteSingleImage/
- currentUser middleware checks if req.session.jwt is defined 
 - if so set req.currentUser to verified jwtToken
- requireAuth middleware stops request if req.currentUser is not defined 
- authorize admin looks at the decoded token set to currentUser 
- if user.role !== 'admin' stop request
- if user.role === 'admin' proceed to route handler
- admin could deleteSingleImage while update or create a product
- as uploadImage middleware would set the file path and store the images at images directory
- therefore, use unlinkImage in deleteSingleImage to find the images file in images directory and delete a single image 

 deleteProduct/
- currentUser middleware checks if req.session.jwt is defined 
 - if so set req.currentUser to verified jwtToken
- requireAuth middleware stops request if req.currentUser is not defined 
- authorize admin looks at the decoded token set to currentUser 
- if user.role !== 'admin' stop request
- if user.role === 'admin' proceed to route handler
- through deleteImagesAtProduct, images of the single product 
- product details would be deleted

Signout
- removes token from header
