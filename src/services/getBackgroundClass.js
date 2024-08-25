const tempRangeClasses = [
    { maxTemp: 0, backgroundClass: "freezing" },
    { maxTemp: 10, backgroundClass: "cold" },
    { maxTemp: 20, backgroundClass: "warm" },
    { maxTemp: 30, backgroundClass: "hot" },
    { maxTemp: 40, backgroundClass: "veryHot" },
];

const getbackgroundClass = (temp) => {
    const range = tempRangeClasses.find((range) => temp <= range.maxTemp);
    return range ? range.backgroundClass : "";
};

export default getbackgroundClass;