const path: string = process.argv.includes("sample") ? "./inputs/sample_day3.txt" : "./inputs/day3.txt";
const file = Bun.file(path);

const text: string = await file.text();
const lines: string[] = text.split("\n")

interface Compartments {
    first: string[];
    second: string[];
}
const compartments: Compartments = {
    first: [],
    second: []
}
lines.forEach((line: string) => {
    compartments.first.push(line.substring(0, line.length / 2))
    compartments.second.push(line.substring(line.length / 2, line.length))
})
function findSameItemAndSumPriorities(rucksacks: Compartments):number {
    let total = 0
    rucksacks.first.forEach((rucksack,index)=>{
        const firstSet:any = new Set(rucksack.split(""))
        const secondSet = new Set(rucksacks.second[index].split(""))
        const commonItem = firstSet.intersection(secondSet)
        total += getPriorityValue(commonItem)
        
    })
    return total
}
function getPriorityValue(item: Set<string>):number {
    const value:string = item.values().next().value
    const charCode:number = value.charCodeAt(0)
    if (value.toLocaleLowerCase() === value) {
        return charCode - 96
    }
    else {
        return charCode - 38
    }
}

console.log(findSameItemAndSumPriorities(compartments))