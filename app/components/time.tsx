import {forwardRef} from "react";
import {DateTime, DateTimeFormatOptions} from "luxon";

type TimeProps = {
    formatOptions?: DateTimeFormatOptions;
    value?: DateTime | null;
};

const defaultFormat: DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
    timeZone: 'UTC'
};

const Time = forwardRef<HTMLTimeElement, TimeProps>(({ formatOptions = defaultFormat, value }, ref) => {
    if (!value) return <>&mdash;</>;
    
    const iso = value?.toISO() ?? undefined;
    return (
        <time dateTime={iso} title={iso} ref={ref}>
            {value.toLocaleString(formatOptions)}
        </time>
    );
});
Time.displayName = 'Time';

export { Time };
