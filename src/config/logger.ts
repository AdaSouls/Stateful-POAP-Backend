// const winston = require('winston');
import winston from 'winston';
import {config} from "./config";

const format = winston.format;

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

export const logger = winston.createLogger({
  level: config.env !== 'production' ? 'debug' : 'info',
  format: format.combine(
    enumerateErrorFormat(),
    config.env !== 'production' ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({
      // stderrLevels: ['error'],
      level: "error",
      filename: config.logger.file,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({
      // stderrLevels: ['error'],
      level: "error",
      filename: config.logger.file,
    }),
  ],
});
