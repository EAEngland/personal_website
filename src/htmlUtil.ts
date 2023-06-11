export function expandEscapeCodes(input: string): string {
  return input.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&");
}
