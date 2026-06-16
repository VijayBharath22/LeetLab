import apiResponce from "../utils/api-responce.js";
import { asyncHandler } from "../utils/async-hander.js";
import Playlist from "../models/playlists.model.js";

const getAllPlaylists = asyncHandler(async (req, res) => {
  const playlists = await Playlist.find({ userId: req.user._id });
  res
    .status(200)
    .json(new apiResponce(200, "All playlists fetched", playlists));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);
  res.status(200).json(new apiResponce(200, "Playlist fetched", playlist));
});

const createPlaylist = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const playlist = await Playlist.create({
    title,
    description,
  });
  res
    .status(201)
    .json(new apiResponce(201, "Playlist created successfully", playlist));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { title, description } = req.body;
  await Playlist.findByIdAndUpdate(
    playlistId,
    {
      title,
      description,
    },
    { new: true },
  );

  res.status(200).json(new apiResponce(200, "Playlist updated successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  await Playlist.findByIdAndDelete(playlistId);
  res.status(200).json(new apiResponce(200, "Playlist deleted successfully"));
});

const addProblemToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, problemId } = req.params;
  await Playlist.updateOne(
    { _id: playlistId },
    {
      $addToSet: { problemIds: problemId },
    },
  );

  res.status(200).json(new apiResponce(200, "Problem added to playlist"));
});

const removeProblemFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, problemId } = req.params;
  await Playlist.findByIdAndUpdate(playlistId, {
    $pull: { problemIds: problemId },
  });
  res
    .status(200)
    .json(new apiResponce(200, "Problem removed from playlist"));
});

export {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addProblemToPlaylist,
  removeProblemFromPlaylist,
};
