import { useQuery } from "@apollo/client";
import { GET_PEOPLE_BY_PAGE } from "../graphql/Queries";
import * as uuid from "uuid";

export default function PageQuery(page: string) {
  const { data, error, loading } = useQuery(GET_PEOPLE_BY_PAGE, {
    variables: { page: page },
  });

  if (loading) {
    console.log("LOADING...");
    return [];
  }

  if (error) {
    console.log("ERROR");
    return [];
  }

  let pageArr = data.peopleByPage.map(function (row: any) {
    return {
      id: uuid.v4(),
      col1: row.name,
      col2: row.height,
      col3: row.mass,
      col4: row.gender,
      col5: row.homeworld,
    };
  });

  console.log("SUCCESS");

  return pageArr;
}
