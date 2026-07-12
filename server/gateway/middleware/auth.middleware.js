import redis from "../../shared/redis/redis.js";

export const protect = async (req, res, next) => {
  try {
    const { session } = req.cookies;
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const sessionData = await redis.get(`session:${session}`);

    if (!sessionData) {
      return res.status(401).json({ message: "Session is Expired" });
    }
    req.user = JSON.parse(sessionData);
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Protect middleware error", error: error.message });
  }
};
