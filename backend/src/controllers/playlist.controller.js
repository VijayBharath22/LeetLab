import {asyncHandler} from "../utils/async-hander.js";

const getAllPlaylists = asyncHandler(async (req, res) => {});

const getPlaylistById = asyncHandler(async (req, res) => {});

const createPlaylist = asyncHandler(async (req, res) => {});

const updatePlaylist = asyncHandler(async (req, res) => {});

const deletePlaylist = asyncHandler(async (req, res) => {});

const addProblemToPlaylist = asyncHandler(async (req, res) => {});

const removeProblemFromPlaylist = asyncHandler(async (req, res) => {});

export {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addProblemToPlaylist,
  removeProblemFromPlaylist,
};
