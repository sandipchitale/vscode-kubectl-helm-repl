import * as vscode from 'vscode';
import * as path from 'path';

let extensionPath = '.';
let kubectlReplExecutable = 'kubectl-repl';
let helmReplExecutable = 'helm-repl';
let env: NodeJS.ProcessEnv;

export function activate(context: vscode.ExtensionContext) {
	const platform = process.platform;
	const arc = process.arch;

	extensionPath = context.extensionPath;

	// kubectlReplExecutable = path.join(extensionPath, 'release', platform, arc, 'bin', kubectlReplExecutable);
	// helmReplExecutable = path.join(extensionPath, 'release', platform, arc, 'bin', helmReplExecutable);
	context.subscriptions.push(vscode.commands.registerCommand('vscode-kubectl-helm-repl.kubectl-repl', kubectlRepl));
	context.subscriptions.push(vscode.commands.registerCommand('vscode-kubectl-helm-repl.helm-repl', helmRepl));

	env = process.env;
	env['PATH'] = `${path.join(extensionPath, 'release', platform, arc, 'bin')}${path.delimiter}${env['PATH']}`;
}

async function kubectlRepl() {
	const terminal = vscode.window.createTerminal({
		name: 'Kubectl REPL',
		iconPath: vscode.Uri.file(path.join(extensionPath, 'images', 'kubectl.png')),
		env: env
	});
	terminal.sendText(`${kubectlReplExecutable}\n`);
	terminal.show();
}

async function helmRepl() {
	const terminal = vscode.window.createTerminal({
		name: 'Helm REPL',
		iconPath: vscode.Uri.file(path.join(extensionPath, 'images', 'helm.png')),
		env: env
	});
	terminal.sendText(`${helmReplExecutable}\n`);
	terminal.show();
}

export function deactivate() {}
