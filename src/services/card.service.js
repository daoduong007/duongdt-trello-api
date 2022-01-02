import { CardModel } from '*/models/card.model';
import { ColumnModel } from '*/models/column.model';

const createNew = async (data) => {
  try {
    const updateData = await { ...data };

    const newColumn = await CardModel.createNew(data);

    const updatedBoard = await ColumnModel.pushCardOrder(
      updateData.columnId.toString(),
      newColumn.insertedId.toString(),
    );

    return updatedBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNew };
