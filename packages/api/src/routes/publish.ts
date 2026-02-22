import { Router } from 'express';

export const publishRouter = Router();

publishRouter.post('/:communityId', (req, res) => {
  const { communityId } = req.params;
  if (!communityId) {
    res.status(400).json({ code: 'MISSING_ID', message: 'Community ID required' });
    return;
  }
  // Simulated: create new manifest version, invalidate CDN cache
  const version = `1.0.${Date.now().toString(36)}`;
  res.status(200).json({
    communityId,
    version,
    publishedAt: new Date().toISOString(),
  });
});
