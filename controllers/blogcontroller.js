const Blog = require('../models/blogmodel');
const formattedDate = require('../utils/dateutils');


const home = async (req, res) => {
    console.log(req.session);

    try {
        const blogs = await Blog.find({})
            .sort({updatedAt: -1})
            .limit(5)
            .populate('author', 'fullname')
            .lean();

        if (blogs){
            const data = blogs.map((blog) => ({
                id: blog._id,
                author: blog.author.fullname,
                title: blog.title,
                category: blog.category,
                image: blog.image,
                content: blog.content,
                created: formattedDate(blog.createdAt),
                updated: formattedDate(blog.updatedAt),
            }));

            const context = {data};
            return res.render('home', context);
        } else{
            return res.send('No Blogs.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};


const about = (req, res) => {
    return res.render('about');
};


const blogform = (req, res) => {
    if (res.locals.isLoggedIn){
        return res.render('blogform');
    };
    
    return res.redirect('/login');
};


const createBlog = async(req, res) => {
    try{    
        const {title, category, content} = req.body;
        const author = req.session.userid;

        const blog = await Blog.create({
            author,
            title,
            category,
            image: `/uploads/${req.file.filename}`,
            content
        });

        if (!blog){
            return res.send('Something went wrong!!!');
        }

        return res.redirect(`/blog-${blog.id}`);
    } catch(err){
        console.log(err);
        res.send('Internal Server Error.');
    }
};


const blogdetails = async(req, res) => {
    try{
        const blog = await Blog.findById(req.params.id).populate('author', 'fullname').lean();

        if (!blog) {
            return res.send('Blog not found.');
        }

        const data = {
            id: blog._id,
            author: blog.author.fullname,
            title: blog.title,
            category: blog.category,
            image: blog.image,
            content: blog.content,
            created: formattedDate(blog.createdAt),
            updated: formattedDate(blog.updatedAt),
        };

        context = {data};
        return res.render('blog', context);
    } catch(err) {
        console.log(err);
        res.send('Internal Server Error.');
    }
};


const editBlogForm = async(req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if (!blog){
            return res.send('Blog not found.')
        };

        context = {blog};
        return res.render('editblog', context);
    } catch(err){
        console.log(err);
        return res.send('Internal Server Error.');
    };
};


const editBlog = async(req, res) => {
    try{
        console.log(req.body);
        const updated_blog = await Blog.findByIdAndUpdate(req.params.id, {$set: req.body});
        if (!updated_blog){
            return res.send('Something went wrong.');
        };
        
        return res.redirect(`/blog-${req.params.id}`);
    } catch(err){
        console.log(err);
        return res.send('Internal Server Error.');
    }
}


const allblogs = async(req, res) => {
    try{
        const blogs = await Blog.find({})
            .populate('author', 'fullname')
            .lean();

        if (!blogs){
            return res.send('No Blogs.');
        };

        const data = blogs.map((blog) => ({
            id: blog._id,
            author: blog.author.fullname,
            title: blog.title,
            category: blog.category,
            image: blog.image,
            content: blog.content,
            created: formattedDate(blog.createdAt),
            updated: formattedDate(blog.updatedAt),
        }));

        const context = {data};
        return res.render('blogs', context);
    } catch(err){
        console.log(err);
        return res.send('Internal Server Error.');
    }
};


const myblogs = async(req, res) => {
    try{
        if (res.locals.isLoggedIn){
            const blogs = await Blog.find({author: req.session.userid})
                .populate('author', 'fullname')
                .lean();

            if (!blogs){
                return res.send('No Blogs.');
            };

            const data = blogs.map((blog) => ({
                id: blog._id,
                author: blog.author.fullname,
                title: blog.title,
                category: blog.category,
                image: blog.image,
                content: blog.content,
                created: formattedDate(blog.createdAt),
                updated: formattedDate(blog.updatedAt),
            }));

            const context = {data};
            return res.render('blogs', context);
        };

        return res.redirect('/login');
    } catch(err){
        console.log(err);
        return res.send('Internal Server Error.');
    }
}


module.exports = {
    home,
    about,
    blogdetails,
    blogform,
    createBlog,
    editBlogForm,
    editBlog,
    allblogs,
    myblogs
};