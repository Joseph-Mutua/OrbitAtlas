import { Router } from 'express';
import { MOCK_COMMUNITIES, MOCK_MANIFESTS } from '../data/mock.js';

export const communitiesRouter = Router();

communitiesRouter.get('/', (_req, res) => {
  res.json({ communities: MOCK_COMMUNITIES });
});

communitiesRouter.get('/:id/manifest', (req, res) => {
  const { id } = req.params;
  const manifest = id ? MOCK_MANIFESTS[id] : undefined;
  if (!manifest) {
    res.status(404).json({ code: 'NOT_FOUND', message: `Community ${id} not found` });
    return;
  }
  res.json({ manifest });
});
