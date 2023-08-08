import { LaunchType, closeMainWindow, launchCommand, popToRoot, Detail, ActionPanel, Action } from "@raycast/api";
import { resetSession, createSession } from "./controller";

export default function Finish(props: { launchContext: { name: string; sessionType: string } }) {
  const updateMenuBarAndClose = () => {
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

  const handleNextSession = (type: "focus" | "shortBreak" | "longBreak") => {
    createSession(type);
    updateMenuBarAndClose();
  };

  const getSessionType = () => {
    const sessionType = props.launchContext?.sessionType;
    return sessionType === "focus"
      ? "Focus"
      : sessionType === "shortBreak"
      ? "Short Break"
      : sessionType === "longBreak"
      ? "Long Break"
      : "Unknown";
  };

  if (props.launchContext?.name === "timeout") {
    return (
      <Detail
        navigationTitle={getSessionType() + ` session completed`}
        markdown={getSessionType() + ` session completed`}
        actions={
          <ActionPanel title="Start Next Session">
            {props.launchContext?.sessionType === "focus" ? (
              <>
                <Action
                  title="Short Break"
                  icon="☕️"
                  onAction={() => handleNextSession("shortBreak")}
                  shortcut={{ modifiers: ["opt"], key: "s" }}
                />
                <Action
                  title="Focus"
                  icon="🏝️"
                  onAction={() => handleNextSession("longBreak")}
                  shortcut={{ modifiers: ["opt"], key: "l" }}
                />
              </>
            ) : (
              <>
                <Action
                  title="Focus"
                  icon="🍅"
                  onAction={() => handleNextSession("focus")}
                  shortcut={{ modifiers: ["opt"], key: "f" }}
                />
                <Action
                  title="Short Break"
                  icon="🏝️"
                  onAction={() => handleNextSession("longBreak")}
                  shortcut={{ modifiers: ["opt"], key: "l" }}
                />
              </>
            )}

            <Action
              title="Long Break"
              icon="🏝️"
              onAction={() => handleNextSession("longBreak")}
              shortcut={{ modifiers: ["opt"], key: "l" }}
            />
          </ActionPanel>
        }
      />
    );
  } else {
    resetSession();
    updateMenuBarAndClose();
  }
}
