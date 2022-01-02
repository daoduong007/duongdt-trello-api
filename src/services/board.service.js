import { BoardModel } from '*/models/board.model';

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);

    // Add card to each column
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (card) => card.columnId.toString() === column._id.toString(),
      );
    });
    //sort columns by columnOder, sort cards  by pushCardOrder
    // this step will apass to frontend

    delete board.cards; //remove cards data from boards

    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard };
