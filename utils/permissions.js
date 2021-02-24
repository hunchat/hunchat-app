import * as Permissions from "expo-permissions";

export const getCameraRollPermission = async () => {
  // Get camera roll permission info.
  const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  if (permission.status !== "granted") {
    // If app does not have camera roll permission
    // Request camera roll permission
    const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (newPermission === "granted") {
      // If app now has camera roll permission
      return "granted";
    }
  } else {
    // App has camera roll permission
    return "granted";
  }
};
