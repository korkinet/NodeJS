import winston from 'winston';

export function createLoggerConfig(): winston.LoggerOptions {
  return {
    level: 'info',
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(info => {
        const timeStr = (info.timestamp || '').slice(0, 19).replace('T', ' ');
        let message = '';
        let status = '';
        if (info.meta?.level === 'error') {
          message = info.meta.message;
        }
        if (info.meta?.res) {
          status = `(${info.meta.res.statusCode})`;
        }
        return `${timeStr} [${info.level}][${info.name}] ${status} ${message || info.message}`;
      })
    )
  }
}

export function createLogger(name: string) {
  return winston.createLogger({
    ...createLoggerConfig(),
    defaultMeta: {
      name
    }
  })
}
