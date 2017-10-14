const path = require('path');
const fs = require('fs');
const CleanCSS = require('clean-css');

const inputDir = 'static/src/css';
const outputDir = 'static/dist/css';

const cleanCSSOptions = {
  inline: 'none'
};

function getFileList(dir) {
  let files = [];

  fs.readdirSync(dir).forEach(name => {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat) {
      if (stat.isFile() && file.includes('.css')) {
        files.push(path.join(__dirname, file));
      }
      /* else if (stat.isDirectory()) {
        files = files.concat(getFileList(file));
      } */
    }
  });

  return files;
}

function compressMainFile(cleanCSS) {
  const inputFile = path.join(inputDir, 'kleinfreund.css');
  const outputFile = path.join(outputDir, 'kleinfreund.css');

  const content = fs.readFileSync(inputFile).toString();
  const output = cleanCSS.minify({
    [inputFile]: { styles: content }
  });
  createDirIfNeeded(path.join(__dirname, outputDir));

  if (output.errors.length === 0) {
    fs.writeFileSync(outputFile, output.styles);
  }
}

function compressIsolatedFiles(cleanCSS, files) {
  files.forEach(file => {
    const outputPath = file.replace(inputDir, outputDir);

    const content = fs.readFileSync(file);
    const output = cleanCSS.minify(content);

    if (output.errors.length > 0) {
      console.error(output.errors);
    }

    if (output.warnings.length > 0) {
      console.warn(output.warnings);
    }

    if (output.errors.length === 0) {
      fs.writeFileSync(outputPath, output.styles);
    }
  });
}

function createDirIfNeeded(dirPath) {
  // Remove trailing slash
  dirPath = dirPath.replace(/\/$/, '');

  // Check if parent path exists
  const parentPath = dirPath.substring(0, dirPath.lastIndexOf('/') + 1);
  if (!fs.existsSync(parentPath)) {
    createDirIfNeeded(parentPath);
  }

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, error => console.error(error));
  }
}

function compressCSS() {
  createDirIfNeeded(path.join(outputDir, 'isolated/'));

  const cleanCSS = new CleanCSS();

  compressMainFile(cleanCSS);

  const files = getFileList(path.join(inputDir, 'isolated/'));
  compressIsolatedFiles(cleanCSS, files);
}

compressCSS();
