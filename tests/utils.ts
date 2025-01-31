/* eslint-disable no-console */

import { promises as fs } from "fs";
import path from "path";
import del from "del";
import execa from "execa";
import { copy } from "fs-extra";

const examplesPath = path.resolve(__dirname, "..", "examples");
export const testsExamplesPath = path.resolve(__dirname, "examples");
export const tarballFileName = "sap-eslint-config.tgz";

interface PackageJson {
  devDependencies: Record<string, string>;
}

async function readJsonFile<T>(path: string): Promise<T> {
  const content = await fs.readFile(path, { encoding: "utf8" });

  return JSON.parse(content) as T;
}

function writeJsonFile(path: string, json: unknown): Promise<void> {
  const content = JSON.stringify(json, null, 2) + "\n";

  return fs.writeFile(path, content, { encoding: "utf8" });
}

async function patchPackageJson(path: string): Promise<void> {
  const packageJson = await readJsonFile<PackageJson>(path);
  packageJson.devDependencies["@sap/eslint-config"] = `../../../${tarballFileName}`;

  return writeJsonFile(path, packageJson);
}

export async function prepareExampleFolder(name: string, initGit = false): Promise<void> {
  console.time(`prepareExampleFolder ${name}`);

  const sourcePath = path.resolve(examplesPath, name);
  const targetPath = path.resolve(testsExamplesPath, name);

  await copy(sourcePath, targetPath, {});

  if (initGit) {
    await execa("git", ["init"], { cwd: targetPath });
  }

  const packageJsonPath = path.resolve(targetPath, "package.json");

  await patchPackageJson(packageJsonPath);
  await execa("npm", ["install"], { cwd: targetPath });
  console.timeEnd(`prepareExampleFolder ${name}`);
}

export async function cleanup(): Promise<void> {
  const tarballPath = path.resolve(__dirname, "..", tarballFileName);

  await Promise.all([del(testsExamplesPath), del(tarballPath)]);
}

export async function findTarballFilename(): Promise<string> {
  const rootDirectory = path.resolve(__dirname, "..");
  const files = await fs.readdir(rootDirectory);
  const tarballFilename = files.find((file) => file.startsWith("sap-eslint-config-"));

  if (!tarballFilename) {
    throw new Error("Unable to find the eslint-config tarball!");
  }

  return tarballFilename;
}
