import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  
  const { token } = req.headers;

  if (!token) {
    return res.json({
      statusCode: 401,
      message: "Not Authorized ff",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();

  } catch (error) {
    console.error();
    res.json({
      statusCode: 500,
      message: error.message,
    });
  }
};

export default authUser;
