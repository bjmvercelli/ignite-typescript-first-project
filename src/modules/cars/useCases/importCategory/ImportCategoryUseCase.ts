import fs from 'fs' 
import { parse } from 'csv-parse'
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IImportCategory {
  name: string,
  description: string
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse(); //by default delimitator: ','

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;

        categories.push({
          name,
          description
        })
      })
      .on("end", () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      })
      .on("error", (error) => {
        reject(error);
      });
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async ({ name, description }) => {
      
      const existCategory = await this.categoriesRepository.findByName(name);
      
      if(!existCategory){
        this.categoriesRepository.create({ 
          name, 
          description 
        });
      }

    })

  }

}

export { ImportCategoryUseCase }