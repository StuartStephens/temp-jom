import { IPastContentFilter } from "../../../types";

export function getPastContentFilterString(filterValues?: IPastContentFilter) {
  let filterString = "?";
  if (filterValues) {
    filterString +=
      "_start=" +
      ((filterValues?.page &&
        filterValues?.recordCount &&
        filterValues?.page * filterValues?.recordCount) ||
        0) +
      "&_end=" +
      filterValues?.recordCount +
      "&";
    filterString += filterValues?.speaker
      ? "speaker=" + filterValues?.speaker + "&"
      : "";
    filterString += filterValues?.title
      ? "title=" + filterValues?.title + "&"
      : "";
  }
  return filterString;
}
