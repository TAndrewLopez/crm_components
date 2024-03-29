import moment from "moment";

const SALES = [
    4300, 3000, 2700, 1500, 4700, 4300, 2000, 4600, 3100, 5800, 6000, 4800,
];

export const BarGraph = () => {
    const high = Math.max(...SALES);
    const heights = SALES.map((num) => Math.round((num * 100) / high));
    const months = moment.monthsShort();

    return (
        <ul className="flex flex-1 items-end gap-x-2">
            {heights.map((height, i) => (
                <li className="flex flex-col justify-end flex-1 h-full" key={i}>
                    <div
                        className="bg-emerald-500 rounded-t"
                        style={{ minHeight: `${height*5}px` }}
                    />
                    <p className="text-white text-center">
                        {months[i][0]}
                    </p>
                </li>
            ))}
        </ul>
    )
}