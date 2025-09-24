import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./modules/HomePage";
import { NotFoundPage } from "./modules/NotFoundPage";
import { LoginPage } from "./modules/LoginPage";
import { PeoplesPage } from "./modules/PeoplesPage";
import { ProjectsPage } from "./modules/ProjectsPage/ProjectsPage";
import { TasksPage } from "./modules/TasksPage";
import { TaskPage } from "./modules/TaskPage";
import { TaskDetailsPage } from "./modules/TaskDetailsPage";
import { CreatePage } from "./modules/CreatePage";
import { PeopleForm } from "./modules/PeoplesPage/components/PeopleForm";
import PrivateRoute from "./modules/PrivateRoute/PrivateRoute";
import { Roles } from "./types/Roles";

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route
          path="projects"
          element={
            <PrivateRoute
              allowedRoles={[
                Roles.Admin,
                Roles.ProjectManager,
                Roles.TeamMember,
              ]}
            />
          }
        >
          <Route index element={<ProjectsPage />} />
        </Route>

        <Route
          element={
            <PrivateRoute
              allowedRoles={[
                Roles.Admin,
                Roles.ProjectManager,
                Roles.TeamMember,
              ]}
            />
          }
        >
          <Route path="tasks" element={<TaskPage />}>
            <Route index element={<TasksPage />} />
            <Route path="details" element={<TaskDetailsPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={[Roles.Admin]} />}>
          <Route path="peoples" element={<PeoplesPage />}>
            <Route path=":peopleId" element={<PeopleForm />} />
          </Route>
        </Route>

        <Route
          element={
            <PrivateRoute allowedRoles={[Roles.Admin, Roles.ProjectManager]} />
          }
        >
          <Route path="create" element={<CreatePage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
