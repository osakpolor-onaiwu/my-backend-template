const express = require('express');
const router = express.Router();

//this brings in our customer model
const Customer = require('../../models/customer');
/**
 * @swagger
 * definitions:
 *  Customer:
 *    type: object
 *    properties:
 *      name:
 *       type: string
 *       required: true
 *       description: customer name
 *       example: "john"
 *      age:
 *       type: integer
 *       required: true
 *       description: customer age
 *       example: 25
 *      dateJoined:
 *       type: date
 *       description: date joined
 *       example: "2020-08-23"
 */

/**
 * @swagger
 * /foodblog/api/customers:
 *  get:
 *      description: Used to get to customers
 *      responses:
 *       '200':
 *         description: Success
 *       '404':
 *          description: Not found
 */

router.get('/', (req, res) => {
  Customer.find()
    .sort({ date: -1 })
    .select('- __v', 'name age')
    .then((data) => res.json(data));
});

/**
 * @swagger
 * /foodblog/api/customers:
 *  post:
 *   summary: create customer
 *   description: Used to post to customers
 *   parameters:
 *    - in: body
 *      name: customer
 *      description: body of customer
 *      schema:
 *        $ref: '#/definitions/Customer'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Customer'
 *   responses:
 *    201:
 *     description: Successfully created
 *    400':
 *     description: Bad request
 */
router.post('/', (req, res) => {
  const { name, age } = req.body;
  const newCustomer = new Customer({
    name,
    age,
  });

  newCustomer.save().then((data) => res.json(data));
});

/**
 * @swagger
 * /foodblog/api/customers/{_id}:
 *  put:
 *   summary: edit customer
 *   description: Used to post to customers
 *   parameters:
 *    - in: body
 *      name: customer
 *      description: body of customer
 *      schema:
 *        $ref: '#/definitions/Customer'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Customer'
 *   responses:
 *    201:
 *     description: Successfully created
 *    400':
 *     description: Bad request
 */
router.put('/:id', (req, res) => {
  const { name, age } = req.body;
  const updatedCustomer = {
    name,
    age,
  };
  Customer.findByIdAndUpdate(req.params.id, updatedCustomer, { new: true })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(200).json(err));
});

// Delete;
router.delete('/:id', (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
