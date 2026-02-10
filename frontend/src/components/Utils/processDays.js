
export const processDays = (days) => {
   
    
    const dayAbbreviations = {
        pazartesi: "Pzt",
        salı: "Sal",
        çarşamba: "Çrş",
        perşembe: "Per",
        cuma: "Cum",
        cumartesi: "Cmt",
        pazar: "Paz",
    }
    // const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
     const dayOrder = ["pazartesi", "salı", "çarşamba", "perşembe", "cuma", "cumartesi", "pazar"]

    const abbreviations = days
        .split(", ")
        .map((day) => dayAbbreviations[day.toLowerCase()])
        .filter((abbreviation) => abbreviation);

    const indexes = days
        .split(", ")
        .map((day) => dayOrder.indexOf(day.toLowerCase()))
        .filter((index) => index !== -1);        
    let isConsecutive = false;
    if (indexes.length > 1) {
        isConsecutive = indexes.every((value, i, array) => !i || value === array[i - 1] + 1);
    }

    if (isConsecutive) {
        const start = abbreviations[0];
        const end = abbreviations[abbreviations.length - 1]        
        return `${abbreviations.length} Gün, ${start} → ${end}`
    } else {
        return `${abbreviations.length} Gün, ${abbreviations.join(", ")}`
    }
    // if (isConsecutive) {
    //     const start = abbreviations[0];
    //     const end = abbreviations[abbreviations.length - 1];
    //     return (
    //         <span className="text-cyan-500 font-semibold mr-1">
    //             <span>{abbreviations.length} Gün</span>, {abbreviations.join(", ")}
    //         </span>
    //     )
    // } else {
    //     return `${abbreviations.length} Days, ${abbreviations.join(", ")}`;
    // }
}

