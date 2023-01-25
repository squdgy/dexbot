import config from 'config';
import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.prettyPrint(),
  transports: [new winston.transports.Console()],
});

export const getLogger = () => logger;

const botConfig = config.get('bot');
export const getConfig = () => botConfig;
