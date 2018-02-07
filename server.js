const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/preview', function (req, res) {
    res.sendFile(path.resolve('./preview.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.resolve('./templates.html'));
});

app.get('/template', function (req, res) {
    res.send(data);
});

app.get('/template/:id', function (req, res) {
    let id = req.params.id;

    let currentTemplate = data.filter(function (template) {
        return template.id == id;
    }) ;

    res.send(currentTemplate);
});

app.put('/template/edit/:id', function (req, res) {
    let id = req.params.id;
    let htmlTemplate = req.body;

    data = data.map(function (template) {
        if (template.id == id) {
            template.template = htmlTemplate.html;
            template.modified = htmlTemplate.date;
        }
        return template;
    }) ;

    res.send(data);
});

app.listen(3000, () => {
    console.log('Started listening on port 3000');
});

let data = [
    {
        id: 1,
        name: 'One',
        template: `
          <div class='template'>
            <div class='editable'>
              One
            </div>
            <div class='container'>
                <div class='editable'>
                Two
              </div>
              <div class='editable'>
                Three
              </div>
            </div>
          </div>`,
        modified: 1516008350380
    },
    {
        id: 2,
        name: 'Two',
        template: `
          <div class='template'>
            <div class='container'>
                <div class='editable'>
                One
              </div>
              <div class='editable'>
                Two
              </div>
              <div class='editable'>
                Three
              </div>
            </div>
            <div class='editable'>
              Four
            </div>
          </div>`,
        modified: 1516008489616
    },
    {
        id: 3,
        name: 'Three',
        template: `
          <div class='template'>
            <div class='editable'>
              one
            </div>
            <div class='editable'>
              two
            </div>
            <div class='editable'>
              three
            </div>
          </div>`,
        modified: 1516008564742
    }
];
