import React from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import axios from "axios";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: "",
      notice: this.props.notice,
      alert: this.props.alert,
      tasks: [],
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("/api/tasks")
      .then(response => {
        console.log(response.data);

        this.setState({
          tasks: response.data,
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          alert: error.toString(),
        });
      });
  }

  handleLogOut(event) {
    event.preventDefault();

    let params = {};
    params[this.props.csrfParam] = this.props.csrfToken;

    axios
      .delete("/users/sign_out", {
        params: params,
        maxRedirects: 0,
      })
      .then(response => {
        window.location = "/";
      })
      .catch(error => {
        window.location = "/";
        console.log(error);
      });
  }

  handleNewTask(event) {
    event.preventDefault();
    console.log("New Task");

    axios
      .post("/api/tasks", {
        description: this.state.newTask,
      })
      .then(response => {
        console.log(response.data);

        this.setState(prevState => ({
          alert: null,
          notice: "Created new task!",
          newTask: "",
          tasks: [response.data, ...prevState.tasks],
        }));
      })
      .catch(error => {
        console.error(error);
        this.setState({
          alert: error.toString(),
        });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleTaskToggle(task) {
    console.log("Toggle", task);

    axios
      .patch(`/api/tasks/${task.id}`, {
        completed: !task.completed,
      })
      .then(response => {
        console.log(response.data);

        this.setState(prevState => {
          const tasks = prevState.tasks.map(task => {
            if (task.id == response.data.id) {
              return response.data;
            } else {
              return task;
            }
          });

          return {
            alert: null,
            notice: "Task completed!",
            tasks: tasks,
          };
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          alert: error.toString(),
        });
      });
  }

  renderTasks() {
    const { tasks } = this.state;

    const taskComponents = tasks.map(task => {
      return (
        <ListGroupItem
          key={task.id}
          tag="button"
          action
          onClick={() => this.handleTaskToggle(task)}
        >
          {task.completed ? <del>{task.description}</del> : task.description}
        </ListGroupItem>
      );
    });

    return <ListGroup>{taskComponents}</ListGroup>;
  }

  render() {
    const { notice, alert, newTask } = this.state;

    return (
      <Container>
        <Row>
          <Col sm="12">
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Todo</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#" onClick={this.handleLogOut}>
                    Log out
                  </NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <h1>Grape Todo</h1>
            {notice && <Alert color="info">{notice}</Alert>}
            {alert && <Alert color="warning">{alert}</Alert>}
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Form onSubmit={this.handleNewTask} autoComplete="off">
              <FormGroup>
                <Label for="newTask">Task</Label>
                <Input
                  autoComplete="off"
                  id="newTask"
                  name="newTask"
                  onChange={this.handleChange}
                  placeholder="e.g. Remember the milk"
                  type="text"
                  value={this.state.newTask}
                />
              </FormGroup>
              <Button
                block
                color="primary"
                disabled={this.state.newTask.length === 0}
                size="lg"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <hr />
            {this.renderTasks()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TodoApp;
