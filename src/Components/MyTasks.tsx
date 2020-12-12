import { FC, ReactElement, useEffect, useState } from "react";
import TaskApiClient from "src/Api/TaskApiClient";
import TaskRegistrationApiClient from "src/Api/TaskRegistrationApiClient";
import { ITask } from "src/Models/ITask";
import { ITaskRegistration } from "src/Models/ITaskRegistration";
import { Status } from "src/Models/Status";
import { IUser } from "../Models/IUser";

type MyTasksProps = {
  userId: string;
};

type TaskViewModel = {
  name?: string;
  deadLine?: Date;
  location?: string;
  status?: Status;
  confirmed?: boolean;
  registrationId?: string;
};

const MyTasks: FC<MyTasksProps> = (props): ReactElement => {
  const taskRegistrationApiClient = new TaskRegistrationApiClient();
  const taskApiClient = new TaskApiClient();

  const [state, setState] = useState({
    user: {} as IUser,
    tasks: Array<ITask>(),
    registrations: Array<ITaskRegistration>(),
    userTasks: Array<TaskViewModel>(),
  });

  useEffect(() => {
    async function loadDataWrapper() {
      await loadData();
    }
    loadDataWrapper();
  }, []);

  const loadData = async () => {
    const registrations = await taskRegistrationApiClient.getbyUserId(
      props.userId
    );
    const tasks = await taskApiClient.getAllTasks();

    const userTasks = registrations.map((reg) => {
      const task = tasks.find((task) => task._id === reg.taskId);
      return {
        name: task?.name,
        deadLine: task?.deadLine,
        location: task?.location,
        status: task?.status,
        confirmed: reg.confirmed,
        registrationId: reg._id,
      };
    });

    setState({
      ...state,
      userTasks: userTasks,
    });
  };

  const onRemoveRegistrationClick = async (taskId?: string) => {
    if (taskId) {
      await taskRegistrationApiClient.delete(taskId);
      await loadData();
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Task name</th>
          <th scope="col">Location</th>
          <th scope="col">Deadline</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {state.userTasks.map((e) => {
          return (
            <tr>
              <td className="align-middle">{e.name}</td>
              <td className="align-middle">{e.location}</td>
              <td className="align-middle">
                {e.deadLine?.toString().split("T")[0]}
              </td>
              <td className="align-middle">
                {e.confirmed ? (
                  <span className="badge badge-success align-middle">
                    Confirmed
                  </span>
                ) : (
                  <span className="badge badge-warning">Pending</span>
                )}
              </td>
              <td className="align-middle">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => onRemoveRegistrationClick(e.registrationId)}
                >
                  Delete registration
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MyTasks;
