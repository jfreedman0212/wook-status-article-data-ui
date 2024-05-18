import {forwardRef, Fragment} from "react";
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
    
    const iso = value.toISO() ?? undefined;
    const parts = value.toLocaleParts(formatOptions);
    return (
        <time dateTime={iso} title={iso} ref={ref}>
            {parts.map((part, idx) => (
                <Fragment key={`${part.type}-${idx}`}>
                    {/*
                        for some reason, some servers will format midnight as 24 instead of 00, while browsers
                        will usually use 00. this workaround makes that consistent w/o changing how we do formatting.
                      */}
                    {part.type === 'hour' && part.value === '24' ? '00' : part.value}
                </Fragment>
            ))}
        </time>
    );
});
Time.displayName = 'Time';

export { Time };
