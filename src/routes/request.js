const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionModel = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignore"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status is not valid: " + status);
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        throw new Error("User not found!");
      }

      const connectionRequest = new ConnectionModel({
        fromUserId,
        toUserId,
        status,
      });

      const isConnectionAlreadyExist = await ConnectionModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isConnectionAlreadyExist) {
        throw new Error("Connection Already Exist.");
      }

      const data = await connectionRequest.save();
      res.status(200).json({
        message:
          req.user.firstName +
          " is " +
          status +
          (status === "interested " ? " in " : "") +
          toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUserId = req.user._id;
      console.log("Logged in user ID:", loggedInUserId);
      console.log("user", req.user);
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        throw new Error("Status is not valid: " + status);
      }

      const connectionRequest = await ConnectionModel.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "interested",
      });

      if (!connectionRequest) {
        throw new Error("Request not found or already reviewed.");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.status(200).json({
        message: "Request has been " + status,
        data,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

module.exports = requestRouter;
