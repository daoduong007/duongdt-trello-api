import { CardModel } from '*/models/card.model';
import { ColumnModel } from '*/models/column.model';

const createNew = async (data) => {
  try {
    const createdCard = await CardModel.createNew(data);
    const getNewCard = await CardModel.findOneById(
      createdCard.insertedId.toString(),
    );

    await ColumnModel.pushCardOrder(
      // console.log('getNewCard.columnId:', getNewCard.columnId),
      getNewCard.columnId.toString(),
      getNewCard._id.toString(),
    );

    return getNewCard;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNew };
