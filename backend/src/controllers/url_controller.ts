import { Request, Response } from "express";
import { createUrlService } from "../services/url_service.js";
import { ExpressError } from "../utils/expressError.js";
import { findUrlByShortId, getAllUrls, getUrlsByUserId, incrementClicks } from "../dao/url_dao.js";

export const createUrlController = async (
    req: Request, res: Response
): Promise<void> => {
  const { Url } = req.body;
  Url.expiresAt = new Date(Date.now() + Url.expiresAt * 1000);
  
  // Add userId if user is authenticated
  const userId = (req as any).user?.userId;
  if (userId) {
    Url.userId = userId;
  }
  
  const shortId = await createUrlService(Url);
  res.status(201).send({ shortId });
  return;
};

export const redirectUrlController = async (
  req: Request, res: Response
): Promise<void> => {
  const { shortId } = req.params;
  const url = await findUrlByShortId(shortId);
  if (!url) throw new ExpressError("URL not found", 404);
  await incrementClicks(shortId);
  res.redirect(url.originalUrl);
  return;
};

export const getAllUrlsController = async (
  req: Request, res: Response
): Promise<void> => {
  const urls = await getAllUrls();
  res.status(200).json({ urls });
  return;
};

export const getMyUrlsController = async (
  req: Request, res: Response
): Promise<void> => {
  const userId = (req as any).user.userId;
  const urls = await getUrlsByUserId(userId);
  res.status(200).json({ urls });
  return;
};
