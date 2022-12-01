import winston from "winston"

const logInfo = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './logs/info.log', level: 'info' }),
    ],
});

const logError = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    ],
});

export const loggerInfo = (msg) => {
    logInfo.log({
        level: "info",
        message: msg,
        timestamp: new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
    })
}

export const loggerError = (msg) => {
    logError.log({
        level: "error",
        message: msg,
        timestamp: new Date(new Date().getTime() + 2 * 60 * 60 * 1000)
    })
}