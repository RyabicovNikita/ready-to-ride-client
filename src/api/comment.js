import { request } from "../utils";

export const addParentCommentInTrip = (tripID, userID, commentText) =>
  request("trips/comments", "POST", { tripID, userID, commentText });
