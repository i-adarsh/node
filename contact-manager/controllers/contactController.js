const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { param } = require("../routes/contactRoutes");
const { request } = require("express");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, resp) => {
    const conatcts = await Contact.find({user_id: req.user.id});
    resp.status(200).json(conatcts);
    // resp.status(200).json({message: 'Get all contacts'});
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler (async (req, resp) => {
    console.log('The request body: ', req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        resp.status(400);
        throw new Error('All fields are mandatory !');
    }
    const conatct = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    
    resp.status(201).json(conatct);
    // resp.status(201).json({message: 'Create Contact'});
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler (async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error('Contact not found');
    }

    resp.status(200).json(contact);
    // resp.status(200).json({message: `Get contact for ${req.params.id}`});
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler (async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error('Contact not found');
    }
    if (contact.user_id.toString() !== req.user.id){
        resp.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    resp.status(200).json(updatedContact);
    // resp.status(200).json({message: `Update contact for ${req.params.id}`});
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler (async (req, resp) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error('Contact not found');
    }
    if (contact.user_id.toString() !== req.user.id){
        resp.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    await Contact.deleteOne({_id: req.params.id});
    resp.status(200).json(contact);
    //resp.status(200).json({message: `Delete contact for ${req.params.id}`});
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };