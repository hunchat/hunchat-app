import moment from "moment";

export function formatDateJoined(date) {
  let formatedDate = moment(date).format("D MMMM YYYY");
  return formatedDate
}
