import express from "express";
import {
  createPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  addProblemToPlaylist,
  removeProblemFromPlaylist,
} from "../controllers/playlist.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

const playlistRouter = express.Router();

playlistRouter.post(
  "/create-playlist",
  authMiddleware,
  createPlaylist,
);
playlistRouter.get("/all-playlists", authMiddleware, getAllPlaylists);
playlistRouter.get("/playlist/:id", authMiddleware, getPlaylistById);
playlistRouter.put("/update-playlist/:id", authMiddleware, updatePlaylist);
playlistRouter.delete("/delete-playlist/:id", authMiddleware, deletePlaylist);
playlistRouter.get(
  "/add-problem-to-playlist/:playlistId/:problemId",
  authMiddleware,
  addProblemToPlaylist,
);
playlistRouter.get(
  "/remove-problem-from-playlist/:playlistId/:problemId",
  authMiddleware,
  removeProblemFromPlaylist,
);

export default playlistRouter;
