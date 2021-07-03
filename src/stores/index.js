import { createStoreon } from "storeon";
import { user } from "./user";
import { clients } from "./clients";
import { storeonLogger } from "storeon/devtools";
import { services } from "./services";

export const store = createStoreon([
  user,
  clients,
  services,
  process.env.NODE_ENV !== "production" && storeonLogger,
]);
