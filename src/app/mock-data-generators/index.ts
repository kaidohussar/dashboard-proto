import { GraphDataItemType, IGraphData } from 'app/models';
import dayjs from 'dayjs';

const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));
const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generateMockAverageResponseDelay = async () => {
    const data: IGraphData[] = [];
    const threeDaysAgo = dayjs().startOf('day').clone().subtract(3, 'day').valueOf();

    for (let step = 0; step < 144; step++) {
        const eventDate = threeDaysAgo + (step * 1800000);
        data.push(
            {
                date: eventDate,
                type: Math.random() < .03 ? 'config-change' : 'default' as GraphDataItemType,
                label: dayjs(eventDate).format('HH:mm'),
                value: randomIntFromInterval(0, 8300),
            }
        )
    }
    return delay(1000).then(() => {
        return data;
    });
}
