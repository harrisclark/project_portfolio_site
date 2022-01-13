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
app.get('/projects/:id', (req, res) => {
    const {id} = req.params;
    res.render('project', {project: data.projects[id]});
})

app.listen(3000, () => {
    console.log('server running on localhost:3000');
});