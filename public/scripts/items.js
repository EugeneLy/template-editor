var ListTamplates = function() {
    this.baseTemplate = document.querySelector('.templates tbody');
};

ListTamplates.prototype.getTemplates = function() {
    var templatesRequest = new XMLHttpRequest();

    templatesRequest.open('GET', '/template', true);

    templatesRequest.addEventListener('readystatechange', function () {
        if (templatesRequest.readyState === 4 && templatesRequest.status === 200) {
            var templatesList = JSON.parse(templatesRequest.responseText);

            this.renderTemplates(templatesList);
        }
    }.bind(this));

    templatesRequest.send();
};

ListTamplates.prototype.renderTemplates = function(templatesList) {
    templatesList.forEach(function (item) {
        var temp = '<tr>' +
            '<td><a href="/preview?' + item.id + '">' + item.name + '</a></td>' +
            '<td>' + item.modified + '</td>' +
            '</tr>';

        this.baseTemplate.insertAdjacentHTML('beforeEnd', temp);
    }.bind(this))
};

var listTamplates = new ListTamplates();
listTamplates.getTemplates();