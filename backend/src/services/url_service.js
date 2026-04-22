import { generateShortId } from "../utils/helper.js";
import { nanoidSize } from "../config/constants.js";
import { saveUrl } from "../dao/url_dao.js";
export const createUrlService = async (Url) => {
    const shortId = generateShortId(nanoidSize);
    const savedUrl = await saveUrl(Url, shortId);
    return savedUrl.shortId;
};
