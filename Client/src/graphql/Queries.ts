import { gql } from "@apollo/client";

export const GET_PEOPLE_BY_PAGE = gql`
  query Query($page: String!) {
    peopleByPage(page: $page) {
      name
      height
      mass
      gender
      homeworld
    }
  }
`;

export const GET_PEOPLE_BY_SEARCH = gql`
  query Query($name: String!) {
    peopleBySearch(name: $name) {
      name
      height
      mass
      gender
      homeworld
    }
  }
`;
