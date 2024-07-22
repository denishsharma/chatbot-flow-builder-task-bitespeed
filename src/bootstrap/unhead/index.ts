import { InferSeoMetaPlugin } from "@unhead/addons";
import { createHead } from "unhead";

export function initializeHead() {
    const head = createHead();
    head.use(InferSeoMetaPlugin());
    return head;
}
