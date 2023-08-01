/* eslint-disable no-undef */
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to transform the first letter to lowercase
const transformToCamelCase = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

// Function to get the initial content of the JSX file
const getInitialJSXContent = (componentName) => {
  const className = transformToCamelCase(componentName);

  return `import React from 'react';

const ${componentName} = () => {
  return (
    <div className="${className}">
      ${componentName}
    </div>
  );
};

export default ${componentName};
`;
};

// Prompt the user to enter the component name
rl.question('Veuillez entrer le nom du composant : ', (componentName) => {
  rl.close();

  if (!componentName) {
    console.error('Veuillez spécifier un nom de composant.');
    process.exit(1);
  }

  const componentDir = path.join(
    process.cwd(),
    'src',
    'components',
    componentName
  );

  fs.access(componentDir)
    .then(() => {
      console.error(`Le dossier ${componentName} existe déjà.`);
      process.exit(1);
    })
    .catch(() => {
      // The directory does not exist, we can create it
      fs.mkdir(componentDir)
        .then(() =>
          fs.writeFile(
            path.join(componentDir, `${componentName}.jsx`),
            getInitialJSXContent(componentName)
          )
        )
        .then(() => {
          // Write the .scss file with the prefix _componentName
          const scssFileName = `_${transformToCamelCase(componentName)}.scss`;
          return fs.writeFile(path.join(componentDir, scssFileName), '');
        })
        .then(() => {
          // Read the index.scss file
          return fs.readFile(
            path.join(process.cwd(), 'src', 'style', 'index.scss'),
            'utf-8'
          );
        })
        .then((data) => {
          // Add the import statement to the index.scss file
          const importStatement = `@import '../components/${componentName}/${transformToCamelCase(
            componentName
          )}';\n`;
          const updatedData = data + importStatement; // Add the import statement at the end
          return fs.writeFile(
            path.join(process.cwd(), 'src', 'style', 'index.scss'),
            updatedData
          );
        })
        .then(() => {
          console.log(`Le composant ${componentName} a été créé avec succès.`);
        })
        .catch((error) => {
          console.error('Erreur lors de la création du composant:', error);
        });
    });
});
