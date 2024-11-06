// src/extension.ts

import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";
import * as fs from "fs";

const translationsPath = path.join(__dirname, "es.json");
let messageTranslations: { [key: string]: string } = {};

try {
  const translationsContent = fs.readFileSync(translationsPath, "utf8");
  messageTranslations = JSON.parse(translationsContent);
} catch (error: any) {
  vscode.window.showErrorMessage(
    "Error al cargar las traducciones: " + error.message
  );
}

export function activate(context: vscode.ExtensionContext) {
  const diagnosticCollection =
    vscode.languages.createDiagnosticCollection("php");
  context.subscriptions.push(diagnosticCollection);

  // Analizar al abrir el documento
  vscode.workspace.onDidOpenTextDocument((document) => {
    if (document.languageId === "php") {
      runPHPCS(document, diagnosticCollection);
    }
  });

  // Analizar al guardar el documento
  vscode.workspace.onDidSaveTextDocument((document) => {
    if (document.languageId === "php") {
      runPHPCS(document, diagnosticCollection);
    }
  });

  // Eliminar diagnósticos al cerrar el documento
  vscode.workspace.onDidCloseTextDocument((document) => {
    diagnosticCollection.delete(document.uri);
  });

  // Analizar los documentos abiertos al activar la extensión
  vscode.workspace.textDocuments.forEach((document) => {
    if (document.languageId === "php") {
      runPHPCS(document, diagnosticCollection);
    }
  });
}

function runPHPCS(
  document: vscode.TextDocument,
  diagnosticCollection: vscode.DiagnosticCollection
) {
  const config = vscode.workspace.getConfiguration("phpBestPractices");
  const standard = config.get<string>("standard", "PSR12");
  const phpcsPath = config.get<string>("executablePath", "phpcs");

  const filePath = document.fileName;

  const command = `${phpcsPath} --standard=${standard} --report=json "${filePath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error && !stdout) {
      vscode.window.showErrorMessage(
        `Error al ejecutar PHP_CodeSniffer: ${stderr}`
      );
      return;
    }

    const diagnostics: vscode.Diagnostic[] = parsePHPCSOutput(stdout);
    diagnosticCollection.set(document.uri, diagnostics);
  });
}

function parsePHPCSOutput(output: string): vscode.Diagnostic[] {
  const diagnostics: vscode.Diagnostic[] = [];
  if (!output) {
    return diagnostics;
  }

  let phpcsReport;
  try {
    phpcsReport = JSON.parse(output);
  } catch (e) {
    vscode.window.showErrorMessage(
      "Error al parsear la salida de PHP_CodeSniffer."
    );
    return diagnostics;
  }

  const fileKey = Object.keys(phpcsReport.files)[0];
  if (!fileKey) {
    return diagnostics;
  }

  const file = phpcsReport.files[fileKey];

  file.messages.forEach((msg: any) => {
    const severity =
      msg.type === "ERROR"
        ? vscode.DiagnosticSeverity.Error
        : vscode.DiagnosticSeverity.Warning;

    const range = new vscode.Range(
      new vscode.Position(msg.line - 1, msg.column > 0 ? msg.column - 1 : 0),
      new vscode.Position(msg.line - 1, msg.column > 0 ? msg.column - 1 : 0)
    );

    // Obtener el mensaje original
    let message = msg.message;

    // Intentar traducir el mensaje usando msg.source
    if (messageTranslations[msg.source]) {
      message = messageTranslations[msg.source];
    }

    // Asigna colores o íconos basados en el origen
    let icon = "";
    if (msg.source.includes("PSR")) {
      icon = "🟦"; // Azul
    } else if (msg.source.includes("Squiz")) {
      icon = "🟩"; // Verde
    } else if (msg.source.includes("PEAR")) {
      icon = "🟪"; // Púrpura
    } else if (msg.source.includes("Zend")) {
      icon = "🟧"; // Naranja
    } else {
      icon = "🟥"; // Rojo
    }

    // Combina el icono y el mensaje

    const diagnostic = new vscode.Diagnostic(
      range,
      `${icon} [${msg.source}] ${message}`,
      severity
    );
    diagnostics.push(diagnostic);
  });

  return diagnostics;
}

export function deactivate() {
  // Limpia recursos si es necesario
}
