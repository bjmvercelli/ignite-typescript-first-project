import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {

  async handle(request: Request, response: Response): Promise<any> {

    const { id } = request.params;
    const images = request.files as IFiles[];

    const images_name = images.map(file => file.filename);
    
    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const carImage = await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController }