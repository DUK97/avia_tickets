import { format, compareAsc, parseISO } from "date-fns";

export function formateDate(str, type) {
  const date = new Date(str);
  return format(date, type);
}

export function compareDates(depart_date, return_date) {
  const parsedDepartDate = parseISO(depart_date);
  const parsedReturnDate = parseISO(return_date);
  // console.log(parsedDepartDate, parsedReturnDate);
  // const departFormatedDate = format(parsedDepartDate, `yyyy M d`);
  // const returnFormatedDate = format(parsedReturnDate, `yyyy M d`);
  return compareAsc(parsedDepartDate, parsedReturnDate);
}
