const numberFormator = (value: number | string) => {
    const number = value.toString();
    const result = number.replace(/(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/gm, "$1$2,");
    return result;
};

export { numberFormator };
