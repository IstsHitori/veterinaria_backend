import chalk from 'chalk';
import ora, { Ora } from 'ora';
import boxen from 'boxen';

export class Logger {
  private static spinner: Ora | null = null;

  // Iniciar spinner
  static startSpinner(message: string): void {
    this.spinner = ora(message).start();
  }

  // Detener spinner con éxito
  static stopSpinnerSuccess(message: string): void {
    if (this.spinner) {
      this.spinner.succeed(message);
      this.spinner = null;
    }
  }

  // Detener spinner con error
  static stopSpinnerError(message: string): void {
    if (this.spinner) {
      this.spinner.fail(message);
      this.spinner = null;
    }
  }

  // Mostrar información de la base de datos
  static showDatabaseInfo(databaseName: string, url: string): void {
    const dbInfo = boxen(
      chalk.blue.bold('🗄️ BASE DE DATOS CONECTADA') + '\n\n' +
      chalk.white(`📊 Base de datos: ${chalk.cyan(databaseName)}`) + '\n' +
      chalk.white(`🔗 URL: ${chalk.cyan(url)}`) + '\n' +
      chalk.white(`⏱️ Estado: ${chalk.green('Conectado')}`),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue',
        backgroundColor: '#000'
      }
    );
    console.log(dbInfo);
  }

  // Mostrar información del servidor
  static showServerInfo(port: number, environment: string): void {
    const serverInfo = boxen(
      chalk.green.bold('🚀 SERVIDOR INICIADO') + '\n\n' +
      chalk.white(`📍 Puerto: ${chalk.cyan(port)}`) + '\n' +
      chalk.white(`🌍 Entorno: ${chalk.cyan(environment)}`) + '\n' +
      chalk.white(`🔗 URL: ${chalk.cyan(`http://localhost:${port}`)}`),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
        backgroundColor: '#000'
      }
    );
    console.log(serverInfo);
  }
} 