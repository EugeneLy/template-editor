var TemplateEditor = function() {
    this.id = window.location.search.slice(1);
    this.baseTemplate = document.querySelector('.content');
};

TemplateEditor.prototype.getTemplate = function() {
    var templateRequest = new XMLHttpRequest();

    templateRequest.addEventListener('readystatechange', function () {
        if (templateRequest.readyState === 4 && templateRequest.status === 200) {
            var template = JSON.parse(templateRequest.responseText);
            this.renderTemplate(template);
        }
    }.bind(this));

    templateRequest.open('GET', '/template/' + this.id, true);
    templateRequest.send();

    return this;
};

TemplateEditor.prototype.renderTemplate = function(template) {
    this.baseTemplate.insertAdjacentHTML('beforeEnd', template[0].template);
};

TemplateEditor.prototype.addEventHendler = function () {
    this.baseTemplate.addEventListener('click', function() {
        if(event.target.classList.contains('editable')) {
            this.addEditPanel(event.target);
        }

        if(event.target.classList.contains('save-temp')) {
            this.editTemplate(event.target);
        }

        if(event.target.classList.contains('close')) {
            this.removeEditPanel(event.target);
        }
    }.bind(this));

    return this;
};

TemplateEditor.prototype.addEditPanel = function (curentElement) {
    var editTemplate = '<div class="edit-form">' +
        '<input class="text-info" type="text" value="' + curentElement.innerHTML.trim() + '" placeholder="Info">' +
        '<input class="font-size" type="number" placeholder="Font size"> ' +
        '<button class="save-temp">Edit</button>' +
        '<button class="close">Close</button>' +
        '</div>';

    curentElement.insertAdjacentHTML('beforeEnd', editTemplate);
};

TemplateEditor.prototype.removeEditPanel = function(curentElement) {
    curentElement.parentElement.remove();
};

TemplateEditor.prototype.editTemplate = function(curentElement) {
    var fontSize = curentElement.previousElementSibling.value;
    var curentContainer = curentElement.parentElement.parentElement;
    var info = curentElement.parentElement.firstChild.value;

    curentContainer.style.fontSize = fontSize + 'px';
    curentElement.parentElement.parentElement.innerHTML = info;

    this.saveTemplate();
};

TemplateEditor.prototype.saveTemplate = function() {
    var massageContainer = document.querySelector('.massage');

    var tmplData = {};
    tmplData.html = this.baseTemplate.innerHTML;
    tmplData.date = Date.now();

    var editRequest = new XMLHttpRequest();

    editRequest.open('PUT', '/template/edit/' + this.id, true);
    editRequest.setRequestHeader("Content-type", 'application/json');

    editRequest.addEventListener('readystatechange', function () {
        if (editRequest.readyState === 4 && editRequest.status === 200) {
            massageContainer.insertAdjacentHTML('beforeEnd', '<div class="success">Saved</div>');

            setTimeout(function() {
                massageContainer.innerHTML = '';
            }, 1000);
        }
    });

    tmplData = JSON.stringify(tmplData);
    editRequest.send(tmplData);
};



TemplateEditor.prototype.init = function() {
    this.getTemplate().addEventHendler();
};

var templateEditor = new TemplateEditor();
templateEditor.init();
