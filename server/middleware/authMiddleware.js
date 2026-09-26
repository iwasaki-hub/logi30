const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // クッキーからトークンを取得
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "認証が必要です" });
    }

    // トークンを検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ユーザー情報を取得(パスワードは除外)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "ユーザーが見つかりません" });
    }

    // リクエストオブジェクトにユーザー情報を追加
    req.user = user;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "トークンの有効期限が切れています" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "無効なトークンです" });
    }
    return res.status(500).json({ message: "サーバーエラー" });
  }
};

module.exports = authMiddleware;
