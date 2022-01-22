const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// home page
app.get('/', (req, res) => {
    res.render('index', {projects: data.projects});
});

// about profile
app.get('/about', (req, res) => {
    res.render('about');
});

// project page
app.get('/projects/:id', (req, res, next) => {
    const {id} = req.params;
    if (data.projects[id]) {
        res.render('project', {project: data.projects[id]});
    } else {
        next()
    }
});

// 404 error handler
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Oops! The page you're looking for does not exist :(";
    next(err);
});

//global error handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log(err);
    res.render('error');
});

app.listen(3000, () => {
    console.log('server running on localhost:3000');
});