import { RESTDataSource } from "apollo-datasource-rest";

const API_URL = "https://swapi.dev/api/";

export class SwapiApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_URL;
  }

  async personReducer(person: any) {
    const homeWorldData = await this.get(person.homeworld);

    return {
      name: person.name,
      height: person.height,
      mass: person.mass,
      gender: person.gender,
      homeworld: homeWorldData.name,
    };
  }

  async withPage(page: number) {
    const data = await this.get("people", { page: page });

    return Array.isArray(data.results)
      ? data.results.map((person: any) => this.personReducer(person))
      : [];
  }

  async withSearch(name: string) {
    const data = await this.get("people", { search: name });

    return Array.isArray(data.results)
      ? data.results.map((person: any) => this.personReducer(person))
      : [];
  }
}

export const dataSources = () => ({ swapiApi: new SwapiApi() });
