import { ColumnModel } from '*/models/column.model';
import { BoardModel } from '*/models/board.model';

const createNew = async (data) => {
  try {
    const createdColunn = await ColumnModel.createNew(data);
    const getNewColumn = await ColumnModel.findOneById(
      createdColunn.insertedId.toString(),
    );
    getNewColumn.cards = [];
    //update columnOder array in board collection
    await BoardModel.pushColumnOrder(
      getNewColumn.boardId.toString(),
      getNewColumn.insertedId.toString(),
    );

    return getNewColumn;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    const result = await ColumnModel.update(id, updateData);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = { createNew, update };
