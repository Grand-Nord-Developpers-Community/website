import {
  createSearchParamsCache,
  createSerializer,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParams = {
  page: parseAsInteger.withDefault(0),
  limit: parseAsInteger.withDefault(5),
  q: parseAsString,
  isDraft: parseAsBoolean,
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
