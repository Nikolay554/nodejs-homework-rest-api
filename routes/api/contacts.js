const express = require('express');
const Joi = require('joi');

const Contact = require("../../models/contact");

const { createError } = require("../../helpers");

const router = express.Router();

//Створюємо схему валідації
const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
   
})

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

router.get('/', async (req, res, next) => {
  try {     

    const result = await Contact.find();
   
    res.json(result);

  } catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
   
  try {
    const { contactId } = req.params;
     
    const result = await Contact.findById(contactId);

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

    if (!addContactSchema.favorite) {
      Contact;
    }

    const resultPOST = await Contact.create(req.body);
    res.status(201).json(resultPOST);

  } catch (error) {
    next(error);
  }
  
   
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if ( error ) {
       
      res.status(400).json({"message": "missing field favorite"})

       
    }

    const { contactId } = req.params;

    const resultPATCH = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if ( !resultPATCH) {
       
      res.status(404).json({"message": "Not found"});
    }
    
    res.json(resultPATCH);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultDelete = await Contact.findByIdAndRemove(contactId); 

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

    const resultPUT = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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
