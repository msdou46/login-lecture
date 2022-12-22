const { createLogger, transports, format } = require("winston");
const { combine, timestamp, simple, colorize, printf, label } = format;


const printFormat = printf(({timestamp, level, message, label}) => {
    return `${timestamp} [${label}] ${level} : ${message}`
})      // 가장 마지막이, log 의 출력 포맷.

const printLogFormat = {
    file: combine(
        label({
            label: "백엔드 맛보기"
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd"
        }),
        printFormat
    ),
    console: combine(
        colorize(),
        simple()
    )
};      

const opts = {
    file: new transports.File({
        filename: "access.log",
        dirname: "./logs",
        level: "info",
        format: printLogFormat.file
    }),
    console: new transports.Console({
        level: "info",
        format: printLogFormat.console
    })
}

const logger =  createLogger({
    transports: [opts.file]
})

if (process.env.NODE_ENV !== "production") {    // 개발용 서버와 배포용 서버를 구분해서 콘솔에 로그를 찍을 지 말지.
    logger.add(opts.console)
}

logger.stream = {
    write: (message) => logger.info(message)
        //  두 번째 인자로 encoding 이란 것도 받긴 해.
}

module.exports = logger;