/* eslint-disable no-console */

import { promises as fs } from "fs";
import os from "os";
import path from "path";
import del from "del";
import execa from "execa";
import {
  cleanup,
  findTarballFilename,
  prepareExampleFolder,
  tarballFileName as targetTarballFilename,
  testsExamplesPath,
} from "./utils";

/*
 * This test is executing long running commands such as "npm pack" and "npm install".
 * A timeout of 90 seconds tries to find a balance between enough time for the processes to finish
 * and an actual timeout to occur in an acceptable timeframe.
 */
jest.setTimeout(300_000); // 5min

interface ProcessError extends Error {
  exitCode?: number;
  stdout?: string;
}

beforeAll(async () => {
  await cleanup();

  const rootPath = path.resolve(__dirname, "..");

  console.time("npm pack");

  await Promise.all([fs.mkdir(testsExamplesPath), execa("npm", ["pack"], { cwd: rootPath })]);

  console.timeEnd("npm pack");

  const sourceTarballFilename = await findTarballFilename();

  await execa("mv", [sourceTarballFilename, targetTarballFilename], {
    cwd: rootPath,
  });
});

afterAll(() => cleanup());

/* Start: monorepo */
describe("In the monorepo example package", () => {
  const targetPath = path.resolve(testsExamplesPath, "monorepo");

  // arrange
  beforeAll(() => prepareExampleFolder("monorepo"));

  // act
  it("can run eslint:ci", () => execa("npm", ["run", "eslint:ci"], { cwd: targetPath }));
  it("can run eslint (fix)", () => execa("npm", ["run", "eslint"], { cwd: targetPath }));
  it("can run prettier:ci", () => execa("npm", ["run", "prettier:ci"], { cwd: targetPath }));
  it("can run prettier (fix)", () => execa("npm", ["run", "prettier"], { cwd: targetPath }));
  it("can run lint", () => execa("npm", ["run", "lint"], { cwd: targetPath }));

  afterAll(() => del(targetPath));
});
/* End: monorepo */

/* Start: standalone */
describe("In the standalone example package", () => {
  const targetPath = path.resolve(testsExamplesPath, "standalone");

  // arrange
  beforeAll(() => prepareExampleFolder("standalone"));

  it("can lint different cases", async () => {
    /* Begin: happy case */
    // act
    const { exitCode: exitCodeHappy } = await execa("npm", ["run", "lint"], {
      cwd: targetPath,
    });

    // assert
    expect(exitCodeHappy).toEqual(0);
    /* End: happy case */

    /* Begin: unhappy case */
    // arrange
    const sourceFilePath = path.join(targetPath, "src", "index.ts");
    const sourceFileContent = await fs.readFile(sourceFilePath, {
      encoding: "utf8",
    });
    const sourceFileContentWithIssues = `export function getText(): string { return 'text' }${os.EOL}${sourceFileContent}`;

    await fs.writeFile(sourceFilePath, sourceFileContentWithIssues, {
      encoding: "utf8",
    });

    // act
    try {
      await execa("npm", ["run", "lint"], { cwd: targetPath });
    } catch (error) {
      const processError = error as ProcessError;

      // assert
      expect(processError.exitCode).toEqual(1);
      expect(processError.stdout).toContain("prettier/prettier");
    }
    /* End: unhappy case */

    /* Begin: fix */
    // act
    const { exitCode: exitCodeFix } = await execa("npm", ["run", "fix"], {
      cwd: targetPath,
    });
    const sourceFileContentFixed = await fs.readFile(sourceFilePath, {
      encoding: "utf8",
    });

    // assert
    expect(exitCodeFix).toEqual(0);
    expect(sourceFileContentFixed).toContain(`"text";`);
    /* End: fix */
  });

  afterAll(() => del(targetPath));
});
/* End: standalone */
