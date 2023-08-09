import {
  LaunchType,
  closeMainWindow,
  getPreferenceValues,
  launchCommand,
  popToRoot,
  updateCommandMetadata,
} from "@raycast/api";
import { createSession } from "./controller";

export default () => {
  updateCommandMetadata({ subtitle: getPreferenceValues().longBreakDuration + " minutes" });
  createSession("longBreak");
  try {
    launchCommand({
      name: "one-tomato-menu-bar",
      type: LaunchType.UserInitiated,
    });
  } catch (e) {
    console.log(e);
  }
  popToRoot();
  closeMainWindow();
};
