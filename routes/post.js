const express = require('express');
const router = express.Router();

const {list, create, read, update, remove, PostByID} = require("../controllers/post");

router.route("/api/posts")
    .get(list)
    .post(create)

router.route("/api/posts/:postId")
    .get(read)
    .put(update)
    .delete(remove)

router.param("postId", PostByID);

// export default router;
module.exports = router