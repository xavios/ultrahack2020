import { FC, ReactElement, useState } from "react";
import TaskDetails from "./TaskDetails"

type TaskDetailProps = {
}

const Tasks : FC<TaskDetailProps> = (props): ReactElement => { 
    const [state, setState] = useState({
        task: props,
        selectedTab: "basic",
    })

    const onBreadCrumbClick = (selectedTab: string) => {
        setState({ ...state, selectedTab: selectedTab});
    }

    return (
        <div>        
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className={state.selectedTab === "basic" ? "breadcrumb-item breadcrumb-selected" : "breadcrumb-item"} 
                        onClick={() => onBreadCrumbClick("basic")}>Tasks information</li>
                    <li className={state.selectedTab === "participants" ? "breadcrumb-item breadcrumb-selected" : "breadcrumb-item"} 
                        onClick={() => onBreadCrumbClick("participants")}>Manage participants</li>
                </ol>
            </nav>
            { state.selectedTab === "basic" && <TaskDetails />}
            {/* { state.selectedTab === "participants" && <EventParticipants event={props.task} onBackClick={props.onBackClick} />} */}

        </div>
    );
}

export default Tasks;