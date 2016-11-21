// http://www.jblotus.com/2011/05/24/keeping-your-handlebars-js-templates-organized/
function getTemplateAjax(path, callback) {
  var source;
  var template;

  $.ajax({
    url: path,
      success: function(data) {
        source    = data;
        template  = Handlebars.compile(source);

        //execute the callback if passed
        if (callback) callback(template);
      }
  });
}

function loadYAML(name, f) {
  var client = new XMLHttpRequest();
  client.open('GET', 'data/' + name + '.yaml');
  client.onreadystatechange = function() {
    if (client.readyState == 3) {
      var yaml = jsyaml.load(client.responseText);
      if (yaml) {
        f(yaml);
      }
    }
  }
  client.send();
}

function loadLists() {

  getTemplateAjax('templates/currently-reading.hbars.html', function(tmpl) {
    loadYAML("currently-reading", function(yaml) {
      $("#currently-reading").html(tmpl(yaml));
    });
  });

  getTemplateAjax('templates/up-next.hbars.html', function(tmpl) {
    loadYAML("up-next", function(yaml) {
      $("#up-next").html(tmpl(yaml));
    });
  });

  getTemplateAjax('templates/to-read.hbars.html', function(tmpl) {
    loadYAML("to-read", function(yaml) {
      $("#to-read").html(tmpl(yaml));
    });
  });

  getTemplateAjax('templates/finished.hbars.html', function(tmpl) {
    loadYAML("finished", function(yaml) {
      yaml.sort(function(a,b) {
        if (a.finished > b.finished) return -1;
        if (a.finished < b.finished) return 1;
        return 0;
      });
      function dateString(d) {
        return d.getUTCFullYear().toString() + "/" +
          (d.getUTCMonth() + 1).toString() + "/" +
          (d.getUTCDate()).toString();
      }
      var len = yaml.length;
      for (var i = 0; i < len; i++) {
        yaml[i].finished = dateString(yaml[i].finished);
      }
      $("#finished").html(tmpl(yaml));
      finished_yaml = yaml;
    });
  });

}

function showModal(title,yaml,idx) {
  if (quotes_body_tmpl) {
    bootbox.dialog({
      message: quotes_body_tmpl(yaml[idx]),
      title: title,
      onEscape: function() {}
    });
  }
}

// Close the modal dialog if the background of the document is clicked.
// Reference: https://github.com/makeusabrew/bootbox/issues/210
$(document).on('click', '.bootbox', function(){
  var classname = event.target.className;
  if(classname && !$('.' + classname).parents('.modal-dialog').length)
    bootbox.hideAll();
});

$(document).ready(function() {
  quotes_body_tmpl = null;
  getTemplateAjax('templates/quotes-body.hbars.html', function(tmpl) {
    quotes_body_tmpl = tmpl;
  });

  Handlebars.registerHelper('for', function(from, to, block) {
    var accum = '';
    for(var i = from; i < to; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });
  Handlebars.registerHelper('escape', function(variable) {
    return variable.replace(/(['"])/g, '\\$1');
  });

  Handlebars.registerHelper('divide', function(book) {
    var quotient = 0.0;
    var percentage = 0;
    quotient = book.page / book.total;
    percentage = Math.floor(quotient * 100);
    return percentage;
  })

  loadLists();

});
