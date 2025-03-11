export const color = {
    reset: (text) => `\x1b[0m${text}\x1b[0m`,
    bold: (text) => `\x1b[1m${text}\x1b[0m`,
    dim: (text) => `\x1b[2m${text}\x1b[0m`,
    italic: (text) => `\x1b[3m${text}\x1b[0m`,
    underline: (text) => `\x1b[4m${text}\x1b[0m`,
    inverse: (text) => `\x1b[7m${text}\x1b[0m`,
    hidden: (text) => `\x1b[8m${text}\x1b[0m`,
    strikethrough: (text) => `\x1b[9m${text}\x1b[0m`,

    black: (text) => `\x1b[30m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    magenta: (text) => `\x1b[35m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    white: (text) => `\x1b[37m${text}\x1b[0m`,

    bgBlack: (text) => `\x1b[40m${text}\x1b[0m`,
    bgRed: (text) => `\x1b[41m${text}\x1b[0m`,
    bgGreen: (text) => `\x1b[42m${text}\x1b[0m`,
    bgYellow: (text) => `\x1b[43m${text}\x1b[0m`,
    bgBlue: (text) => `\x1b[44m${text}\x1b[0m`,
    bgMagenta: (text) => `\x1b[45m${text}\x1b[0m`,
    bgCyan: (text) => `\x1b[46m${text}\x1b[0m`,
    bgWhite: (text) => `\x1b[47m${text}\x1b[0m`,

    hex: (hex, text) => {
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) return text;
        const rgb = hex.length === 4 ?
            hex.match(/[0-9A-F]/gi).map(x => parseInt(x + x, 16)) :
            hex.match(/[0-9A-F]{2}/gi).map(x => parseInt(x, 16));
        return `\x1b[38;2;${rgb.join(';')}m${text}\x1b[0m`;
    }
};