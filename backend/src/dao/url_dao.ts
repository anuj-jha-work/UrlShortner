import { UrlModel } from "../models/url_model.js";
import type { IUrl } from "../models/url_model.js";


export const saveUrl = async (URL: IUrl, shortId: string) : Promise<IUrl> => {
    const newUrl = new UrlModel({ ...URL, shortId });
    const savedUrl = await newUrl.save();
    return savedUrl;
}

export const findUrlByShortId = async (shortId: string) : Promise<IUrl | null> => {
    const url: IUrl | null = await UrlModel.findOne({ shortId });
    return url;
}

export const getAllUrls = async () : Promise<IUrl[]> => {
    const urls: IUrl[] = await UrlModel.find()
        .sort({ createdAt: -1 })
        .limit(100);
    return urls;
}

export const getUrlsByUserId = async (userId: string) : Promise<IUrl[]> => {
    const urls: IUrl[] = await UrlModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(100);
    return urls;
}

export const incrementClicks = async (shortId: string) : Promise<void> => {
    await UrlModel.findOneAndUpdate(
        { shortId },
        { $inc: { clicks: 1 } }
    );
}