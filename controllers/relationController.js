const express = require("express");
const Person = require("../models/personSchema");
const Car = require("../models/carSchema");
const singleRelation = require("../models/onetooneSchema");
const addressSchema = require("../controllers/routes/addressSchema");

exports.createPerson = (req, res) => {
  const { name, age } = req.body;
  const newPerson = {
    name: name,
    age: age,
  };
  Person.create(newPerson).then((person) => {
    res.status(201).json({
      message: "success",
      person: person,
    });
  });
};

exports.getPersons = (req, res) => {
  const persons = Person.find();
  persons.then((person) => {
    res.json({
      persons: person,
    });
  });
};

exports.getPerson = async (req, res) => {
  const { personId } = req.params;
  const person = await Person.findById(req.params.id).populate("cars");
  res.status(200).json({
    message: "succcess",
    result: person,
  });
};


exports.createCar = async (req, res) => {
  const { personId } = req.params;
  const newCar = new Car(req.body);
  // console.log("newCar", newCar);
  // get persons
  const person = await Person.findById(personId);
  console.log("person by id", person);
  // console.log("seller", newCar.seller);
  // // assisgn person as a car seller
  // newCar.seller = person;
  // // Save car
  await newCar.save();
  console.log("person cars", person.cars);

  // person.populate("cars").execPopulate();
  person.cars.push(newCar);
  await person.save();
  res.status(200).json(newCar);
};

exports.getPersonCars = async (req, res) => {
  const { personId } = req.params;
  const person = await Person.findById(personId).populate("cars");
  res.status(200).json(person.cars);
};

exports.createSingleRelation = (req, res) => {
  const { name, password, email } = req.body;
  const newRelation = {
    name: name,
    password: password,
    email: email,
  };
  singleRelation.create(newRelation).then((person) => {
    res.status(201).json({
      message: "success",
      person: person,
    });
  });
};

exports.createAddress = async (req, res) => {
  const { relationId } = req.params;
  // console.log("personID",relationId)
  const address = new addressSchema(req.body);
  const relation = await singleRelation.findById(relationId);
  // console.log("person", relation);
  await address.save();
  relation.user.push(address);
  await relation.save();
  res.status(200).json(address);
};

exports.getRealtion = async (req, res) => {
  const person = await singleRelation.findById(req.params.id).populate("user");
  res.status(200).json({
    message: "succcess",
    result: person,
  });
};
