import { format } from "date-fns"

export function generateIsoDate(date: Date, formatString: string = "yyyy-MM-dd'T'HH:mm:ss'Z'") {
    return format(date, formatString)
}