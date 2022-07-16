const express = require('express');
const Joi = require('joi');

const contacts = require("../../models/contacts");

const { createError } = require("../../helpers");

const router = express.Router();

//Створюємо схему валідації
const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
   
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
   
  res.json(result);
  } catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
   
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if ( !result ) {
       throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if ( error ) {
      throw createError(400, error.message);
    }

    const resultPOST = await contacts.addContact(req.body);
    res.status(201).json(resultPOST);
  } catch (error) {
    next(error);
  }
  
   
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultDelete = await contacts.removeContact(contactId);
    if ( !resultDelete ) {
      throw createError(404);
    }

    res.json({ message: `contact deleted id = ${contactId}` })
  } catch (error) {
    next(error);
  }
  
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if ( error ) {
      throw createError(400, error.message);
    }

    const { contactId } = req.params;

    const resultPUT = await contacts.updateContact(contactId, req.body);
    if ( !resultPUT) {
      throw createError(404);
    }
    res.json(resultPUT);
  } catch (error) {
    next(error);
  }
  res.json({ message: 'template message' })
})

module.exports = router
