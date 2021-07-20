import { createStoreon } from "storeon";
import { user } from "./user";
import { clients } from "./clients";
import { storeonLogger } from "storeon/devtools";
import { services } from "./services";
import { records } from "./records";
import { common } from "./common";
import { statistic } from "./statistic";

export const store = createStoreon([
  user,
  clients,
  services,
  records,
  common,
  statistic,
  process.env.NODE_ENV !== "production" && storeonLogger,
]);
