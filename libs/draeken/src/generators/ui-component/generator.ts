import * as ts from 'typescript';
import {
  applyChangesToString,
  formatFiles,
  generateFiles,
  getProjects,
  joinPathFragments,
  logger,
  names,
  Tree,
} from '@nrwl/devkit';
import { addImport } from '@nrwl/react/src/utils/ast-utils';
import * as path from 'path';
import { UiComponentGeneratorSchema } from './schema';

interface NormalizedSchema extends UiComponentGeneratorSchema {
  projectSourceRoot: string;
  className: string;
  fileName: string;
  propertyName: string;
  parsedTags: string[];
}

function normalizeOptions(host: Tree, options: UiComponentGeneratorSchema): NormalizedSchema {
  const { className, propertyName } = names(options.name);
  const project = getProjects(host).get(options.project);
  if (!project) {
    logger.error(
      `Cannot find the ${options.project} project. Please double check the project name.`
    );
    throw new Error();
  }
  const { sourceRoot: projectSourceRoot } = project;
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];
  const directory = getDirectory(host, options);

  return {
    ...options,
    directory,
    projectSourceRoot,
    className,
    fileName: className,
    propertyName,
    parsedTags,
  };
}

function addFiles(host: Tree, options: NormalizedSchema) {
  const componentDir = joinPathFragments(options.projectSourceRoot, options.directory);

  const templateOptions = {
    ...options,
    template: '',
  };
  generateFiles(host, path.join(__dirname, 'files'), componentDir, templateOptions);
}

function getDirectory(host: Tree, options: UiComponentGeneratorSchema) {
  const fileName = names(options.name).fileName;
  const workspace = getProjects(host);
  let baseDir: string;
  if (options.directory) {
    baseDir = options.directory;
  } else {
    baseDir = workspace.get(options.project).projectType === 'application' ? 'app' : 'lib';
  }
  return joinPathFragments(baseDir, fileName);
}

function addExportsToBarrel(host: Tree, options: NormalizedSchema) {
  const indexFilePath = joinPathFragments(options.projectSourceRoot, 'index.ts');
  const indexSource = host.read(indexFilePath).toString();
  if (indexSource !== null) {
    const indexSourceFile = ts.createSourceFile(
      indexFilePath,
      indexSource,
      ts.ScriptTarget.Latest,
      true
    );
    const changes = applyChangesToString(
      indexSource,
      addImport(indexSourceFile, `export * from './${options.directory}/${options.fileName}';`)
    );
    host.write(indexFilePath, changes);
  }
}

export default async function (host: Tree, options: UiComponentGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options);
  addFiles(host, normalizedOptions);
  addExportsToBarrel(host, normalizedOptions);
  await formatFiles(host);
}
