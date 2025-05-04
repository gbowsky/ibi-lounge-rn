import { makeApiRequestUrl } from "./url";

export interface LinkItem {
  text: string;
  translated?: string;
  href: string;
}

export interface SectionItemRaw {
  title: string;
  links: LinkItem[];
}

export interface SectionItem {
  title: string;
  data: LinkItem[];
}

interface RequestError {
  code: string;
  message: string;
  error: string;
  statusCode: number;
}

export async function getLinks(): Promise<
  SectionItemRaw[] | RequestError | false
> {
  const url = makeApiRequestUrl("links");
  try {
    const req = await fetch(url);
    const json = await req.json();

    if (!req.ok) {
      console.warn("Something not right in getLinks response:", url);
      console.log(json);
      return json as RequestError;
    }

    return json as SectionItemRaw[];
  } catch (e) {
    console.error("getLinks: req error:", e);
    return false;
  }
}
