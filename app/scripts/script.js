var dbName = 'todo_list_store';
 
sklad.open(dbName, {
  version: 2,
  migration: {
    '1': function (database) {
      var objStore = database.createObjectStore('todos', {autoIncrement: true});
      objStore.createIndex('description_search', 'description', {unique: true});
    },
    '2': function(database) {
      console.log('Migrating');
      database.deleteObjectStore('todos');
      var objStore = database.createObjectStore('todos', {
        autoIncrement: true, 
        keyPath: 'timestamp'
    });
      objStore.createIndex('description_search', 'description', {unique: true});
      objStore.createIndex('done', 'done', {unique: false});
      console.log('Done Migrating');
    }
  }
}, function (err, conn) {
  if (err) { throw err; }
  $(function () {
    var $description = $('#description');
    var $add         = $('#add');
    var $list        = $('#list')
 
    function updateRows(conn) {
      conn
        .get({
          todos: {description: sklad.DESC, index: 'description_search'}
        }, function (err, data) {
          if (err) { return console.error(err); }
          
          // TODO: do stuff here.
          $list.empty();
          data.todos.forEach(function (todo) {
            var $li = $(document.createElement('li'));
            $li.text(todo.value.description);

            if (todo.value.done) {
              $li.css({'text-decoration': 'line-through'});
            }

            $li.click(function() {
              todo.value.done = true;
              conn.upsert('todos', todo.value, function (err) {
                if (err) { return console.error(err); }
                updateRows(conn);
              });
            });

            $list.append($li);
          });
        });
    }
 
    updateRows(conn);
 
    $add.click(function () {
      if (!$description.val().trim()) {
        return;
      }
      conn.insert({
        todos: [
          { description: $description.val().trim(), done: false }
        ]
      }, function (err, insertedKeys) {
        $description.val('');
        if (err) { return console.error(err); }
        updateRows(conn);
      })
    });
  });
});