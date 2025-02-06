import { ConfigModule } from '@nestjs/config';

/**
 * Global configuration array for setting up environment variables.
 * 
 * This configuration uses the `ConfigModule` from `@nestjs/config` to load
 * environment variables from a `.env` file and make them globally available
 * throughout the application.
 * 
 * @constant
 * @type {Array}
 * @property {Object} 0 - Configuration object for `ConfigModule`.
 * @property {boolean} 0.isGlobal - Indicates that the configuration should be global.
 * @property {string[]} 0.envFilePath - Array of paths to environment files.
 */
const GlobalConfig = [
  // Configuración global de variables de entorno
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env'], 
  }),
];

export default GlobalConfig;