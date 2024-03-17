const locale = navigator.language;
// console.log({ locale });

const mediumDateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
const longDateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

export function formatDate(isoString: string, style = "medium"): string {
  const date = new Date(isoString);
  return style === "long" ? longDateFormat.format(date) : mediumDateFormat.format(date);
}
