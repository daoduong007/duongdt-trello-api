import { BoardModel } from '*/models/board.model';
import { cloneDeep } from 'lodash';

const createNew = async (data) => {
  try {
    const createdBoard = await BoardModel.createNew(data);
    const getNewBoard = await BoardModel.findOneById(
      createdBoard.insertedId.toString(),
    );
    return getNewBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);
    if (!board || !board.columns) {
      throw new Error('Board not found');
    }

    const transformBoard = cloneDeep(board);
    //fillter deleted columns (_destroy: true)
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy,
    );

    // Add card to each column
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString(),
      );
    });
    //sort columns by columnOder, sort cards  by pushCardOrder
    // this step will apass to frontend

    delete transformBoard.cards; //remove cards data from boards

    return transformBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard };
