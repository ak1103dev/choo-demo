const choo  = require('choo')
const html = require('choo/html')
const app = choo()

app.model({
  state: {
    todos: [{
      id: 0,
      name: 'a',
      child: [1, 2]
    }, {
      id: 1,
      name: 'b',
      child: [3]
    }, {
      id: 2,
      name: 'c',
      child: [4]
    }, {
      id: 3,
      name: 'd',
      child: []
    }, {
      id: 4,
      name: 'e',
      child: []
    }],
    tree: {}
  },
  reducers: {
    addTodo: (data, state) => {
      return { todos: data }
    },
    generateTree: (data, state) => {
    }
  }
})

const view = (state, prev, send) => {
  return html`
    <div>
      <form onsubmit=${onSubmit}>
        <textarea rows="10" cols="100" placeholder="json" id="title"></textarea>
        <button type="submit">submit</button>
      </form>
      <ul>
        ${state.todos.map((todo) => html`<li>${todo.name}</li>`)}
      </ul>
    </div>`

  function onSubmit(e) {
    const input = e.target.children[0]
    const value = input.value.replace(/\n/g, '')
    send('addTodo', JSON.parse(value))
    //input.value = ''
    e.preventDefault()
  }
}

app.router((route) => [
  route('/', view)
])

const tree = app.start()
document.body.appendChild(tree)

