export const getComments = (comment = [], action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return comment.concat([action.payload]);
    case "DELETE_COMMENT":
      return comment;
    default:
      return comment;
  }
};

export const getCommentBody = (text = "", action) => {
  switch (action.type) {
    case "TYPE_COMMENT":
      return action.payload;
    default:
      return text;
  }
};