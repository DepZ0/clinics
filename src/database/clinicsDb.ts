import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { clinics } from "../schema";
import { eq, sql } from "drizzle-orm";
import { Pool } from "pg";

export class ClinicsDb {
  constructor(private db: NodePgDatabase, private pool: Pool) {}
  public getSearchByField = async (field: string, value: string, page: number, pageSize: number) => {
    const offset = (page - 1) * pageSize;

    const colum = clinics[field];
    const searchResult = await this.db
      .select({
        clinicName: clinics.clinicName,
        fullAddress: clinics.fullAddress,
        city: clinics.city,
        state: clinics.state,
        postCode: clinics.postcode,
        subrb: clinics.suburb,
        website: clinics.website,
        phone: clinics.phone,
        slug: clinics.slug,
      })
      .from(clinics)
      .where(eq(sql`lower(${colum})`, value.toLowerCase()))
      .limit(pageSize)
      .offset(offset);

    const result = await this.db
      .select({ count: sql`COUNT(*)` })
      .from(clinics)
      .where(eq(sql`lower(${colum})`, value.toLowerCase()));
    const count = Number(result[0].count);
    const countOfPages = Math.ceil(count / pageSize);

    const pagination = {
      page: page,
      pages: countOfPages,
      total: count,
    };

    return { searchResult, pagination };
  };

  public getSearchBySlug = async (slug: string) => {
    const searchBySlug = await this.db
      .select({
        clinicName: clinics.clinicName,
        fullAddress: clinics.fullAddress,
        city: clinics.city,
        state: clinics.state,
        email: clinics.email,
        aboutClinic: clinics.aboutClinic,
      })
      .from(clinics)
      .where(eq(clinics.slug, `/clinic/${slug.toLowerCase()}`));

    return searchBySlug;
  };
}
