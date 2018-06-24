import * as fsx from 'fs-extra';
import * as path from 'path';
import * as structure from './structure';

/**
 * Initializer config recipe.
 */
export interface GeneratorRecipe {
  root: string;
  name: string;
  description: string;
}

/**
 * Project structure initializer.
 */
export class Generator {
  protected recipe: GeneratorRecipe;

  /**
   * Class constructor.
   * @param recipe Initializer config recipe.
   */
  public constructor (recipe: GeneratorRecipe) {
    this.recipe = recipe;
  }

  /**
   * Creates project files.
   */
  public async build () {
    for (const file of structure.files) {
      const dest = path.resolve(this.recipe.root, ...file.path);
      
      const dir = path.dirname(dest);
      await fsx.ensureDir(dir);

      const src = file.content
        .join('\n')
        .replace('{{ name }}', this.recipe.name)
        .replace('{{ description }}', this.recipe.description);
      await fsx.writeFile(dest, src);
    }
  }

}