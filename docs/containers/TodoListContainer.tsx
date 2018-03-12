import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import TodoList from '../components/TodoList';

const TODOS_QUERY = gql`
  query GetTodos {
    todos @rtdbQuery(ref: "x/y/z", orderByChild: "id", limitToFirst: true) {
      id @rtdbKey
      content
    }
  }
`;

const withTodos = graphql<{todos: any[]}>(TODOS_QUERY, {
  props: ({data}) => {
    if (data.loading || data.error) {
      return {todos: []};
    }

    return {
      todos: data.todos
    };
  }
});

export default withTodos(TodoList);
