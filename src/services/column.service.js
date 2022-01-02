import { ColumnModel } from '*/models/column.model';
import { BoardModel } from '*/models/board.model';

const createNew = async (data) => {
  try {
    const updateData = await { ...data };
    // console.log('data:', data);
    const newColumn = await ColumnModel.createNew(data);

    //update columnOder array in board collection
    // console.log('new column', newColumn);
    const updatedBoard = await BoardModel.pushColumnOrder(
      updateData.boardId.toString(),
      newColumn.insertedId.toString(),
    );
    // console.log('ket qua sau khi them columOder:', updatedBoard);
    return updatedBoard;
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
