import { RequestHandler } from "express";
import { Controller } from "./Controller";
import { ClinicsService } from "../services/clinicsService";

export class ClinicsController extends Controller {
  constructor(private clinicsService: ClinicsService) {
    super("/");
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get("/clinics", this.getClinicsByField);
    this.router.get("/clinic/*", this.getClinicsBySlug);
  };

  private getClinicsByField: RequestHandler = async (req, res) => {
    const field = String(req.query.searchBy).toLowerCase();
    const value = String(req.query.value);
    const page = req.query.page ? Number(req.query.page) : 1;

    const validFields = ["city", "state", "postcode", "clinicName", "suburb"];

    if (validFields.includes(field)) {
      const searchByField = await this.clinicsService.getSearchByField(field, value, page);
      return res.status(200).json(searchByField);
    } else {
      return res.status(404).json("The Field not found");
    }
  };

  private getClinicsBySlug: RequestHandler = async (req, res) => {
    let slug = req.params[0];
    slug = slug.replace("/clinic/", "");

    const searchBySlug = await this.clinicsService.getSearchBySlug(slug);
    return res.status(200).json(searchBySlug);
  };
}
