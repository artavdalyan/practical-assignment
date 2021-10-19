module.exports = {
    printWidth: 140,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    endOfLine: 'auto',
    arrowParens: 'avoid',
    overrides: [
        {
            files: '*.ts',
            options: {
                parser: 'typescript',
            },
        },
        {
            files: '*.md',
            options: {
                parser: 'markdown',
            },
        },
        {
            files: '*.scss',
            options: {
                parser: 'scss',
            },
        },
        {
            files: '*.component.html',
            options: {
                parser: 'angular',
            },
        },
    ],
};
