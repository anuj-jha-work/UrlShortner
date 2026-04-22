import { UrlModel } from "../models/url_model.js";
import { deleteUrlFromCache, getUrlFromCache, setUrlInCache } from "../services/cpp_lru_cache.js";
export const saveUrl = async (URL, shortId) => {
    const newUrl = new UrlModel({ ...URL, shortId });
    const savedUrl = await newUrl.save();
    await setUrlInCache(shortId, {
        originalUrl: savedUrl.originalUrl,
        expiresAt: savedUrl.expiresAt.toISOString(),
    });
    return savedUrl;
};
export const findUrlByShortId = async (shortId) => {
    const cached = await getUrlFromCache(shortId);
    if (cached) {
        const expiresAt = new Date(cached.expiresAt);
        if (expiresAt.getTime() > Date.now()) {
            console.log(`[CACHE HIT] shortId: ${shortId}`);
            return {
                originalUrl: cached.originalUrl,
                shortId,
                expiresAt,
            };
        }
        await deleteUrlFromCache(shortId);
    }
    console.log(`[CACHE MISS] shortId: ${shortId} - querying MongoDB`);
    const url = await UrlModel.findOne({ shortId });
    if (url) {
        await setUrlInCache(shortId, {
            originalUrl: url.originalUrl,
            expiresAt: url.expiresAt.toISOString(),
        });
    }
    return url;
};
export const getAllUrls = async () => {
    const urls = await UrlModel.find()
        .sort({ createdAt: -1 })
        .limit(100);
    return urls;
};
export const getUrlsByUserId = async (userId) => {
    const urls = await UrlModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(100);
    return urls;
};
export const incrementClicks = async (shortId) => {
    await UrlModel.findOneAndUpdate({ shortId }, { $inc: { clicks: 1 } });
};
