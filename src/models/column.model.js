import Joi from 'joi';

import { getDB } from '*/config/mongodb';
import { ObjectId } from 'mongodb';

//define Column collection
const columnCollectionName = 'columns';
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(), // when create new => ObjectId
  title: Joi.string().required().min(3).max(20).trim(),
  cardOder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false, //show full errror
  });
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
    };
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(insertValue);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @param {string} boardId
 * @param {string} columnId
 */
const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) },
        { $push: { cardOder: cardId } },
        { returnNewDocument: true },
      );

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: data },
        { returnNewDocument: true },
      );

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnModel = {
  createNew,
  update,
  pushCardOrder,
  columnCollectionName,
};
