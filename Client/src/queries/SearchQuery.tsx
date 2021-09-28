import { useQuery } from "@apollo/client";
import { GET_PEOPLE_BY_SEARCH } from "../graphql/Queries";
import * as uuid from "uuid";

export default function SearchQuery(name: string) {
  const { data, error, loading } = useQuery(GET_PEOPLE_BY_SEARCH, {
    variables: { name: name },
  });

  if (loading) {
    return [];
  }

  if (error) {
    return [];
  }

  let pageArr = data.peopleBySearch.map(function (row: any) {
    return {
      id: uuid.v4(),
      col1: row.name,
      col2: row.height,
      col3: row.mass,
      col4: row.gender,
      col5: row.homeworld,
    };
  });

  return pageArr;
}
