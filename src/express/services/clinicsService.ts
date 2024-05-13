import { ClinicsDb } from "../../database/clinicsDb";

export class ClinicsService {
  constructor(private clinicsDb: ClinicsDb) {}
  public getSearchByField = async (field: string, value: string, page: number) => {
    const pageSize = Number(process.env.PAGE_SIZE);
    const searchByField = await this.clinicsDb.getSearchByField(field, value, page, pageSize);
    return searchByField;
  };

  public getSearchBySlug = async (slug: string) => {
    const searchBySlug = await this.clinicsDb.getSearchBySlug(slug);
    return searchBySlug;
  };
}
