import { GraphDataItemType, GraphDataItemUnit, IGraphData } from 'app/models';
import dayjs from 'dayjs';

const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));

export const generateMockAverageResponseDelay = async () => {
    const data: IGraphData[] = [];
    const threeDaysAgo = dayjs().clone().subtract(3, 'day').valueOf();
    for (let step = 0; step < 4320; step++) {
        const eventDate = threeDaysAgo + (step * (75 * 60));
        data.push(
            {
                date: eventDate,
                type: Math.random() < .1 ? 'config-change' : 'default' as GraphDataItemType,
                label: dayjs(eventDate).format('HH:MM'),
                value: step % 60 ? 2600 : 5500,
                unit: 'ms' as GraphDataItemUnit,
            }
        )
    }
    console.log('data', data);
    return delay(1000).then(() => {
        return data;
    });
}
