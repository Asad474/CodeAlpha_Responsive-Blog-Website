const express = require('express');
const router = express.Router();
const blogcontroller = require('../controllers/blogcontroller');
const upload = require('../config/fileStorage');

router.get('/', blogcontroller.home);
router.get('/about', blogcontroller.about);
router.get('/blogs', blogcontroller.allblogs);
router.get('/myblogs', blogcontroller.myblogs);
router.get('/blog-:id', blogcontroller.blogdetails);    
router.route('/createblog')
    .get(blogcontroller.blogform)
    .post(upload.single('blogimage'), blogcontroller.createBlog);
    
router.route('/editblog-:id')
    .get(blogcontroller.editBlogForm)
    .post(blogcontroller.editBlog);

router.get('/search', blogcontroller.blogfilter);

router.route('/deleteblog-:id')
    .get(blogcontroller.deleteBlogForm)
    .post(blogcontroller.deleteBlog);
    
module.exports = router;