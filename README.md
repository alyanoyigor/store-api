# Store Api

In the Store API, users and products can be created. Users can add products to their carts. In the cart and payment page, a status is displayed based on the payment state

<hr/>

![image](https://user-images.githubusercontent.com/85354736/187666131-554c2823-b368-4581-a912-8880ab45c1e1.png)

### Tech stack

- Express
- MongoDB
- Mongoose
- TypeScript
- jsonwebtoken
- bcrypt

### Technical task

#### User Payments user stories
1. I as a developer want to create a collection users with the next fields: _id,
name, email
2. I as a developer want to create a collection products with the next fields: _id,
name, category, price.
3. I as a developer want to create a collection carts with the next fields: _id,
userId, products, status. Products field is an array of objects with the next
fields: productId, quantity, total. Status field could take one of the next values:
active, payed, deleted.
4. I as a developer want to create a collection payments with the next fields: _id,
cartId, status. Status field could take one of the next values: created, done,
canceled.
5. I as a developer want all collections to have timestamps: createdAt, updatedAt
6. I as a system admin want to create user.
7. I as a system admin want to create products.
8. I as a user want to add products to cart.
9. * I as a user want to remove product from cart.
10. I as a user want to pay for cart
11. I as a user want to delete or empty my cart. Cart is deleted. Payment is
canceled.

#### User Payments processes
1. Cart is created with default status active
2. When cart is created associated payment is created
3. Payment is created with default status created
4. When payment status is changed from created to done, associated cart
status is changed to payed.
5. When cart status is changed from active to deleted, associated payments
status is changed from created to canceled.

### How to start app
You need install Docker and run command below
```
docker-compose up
```
