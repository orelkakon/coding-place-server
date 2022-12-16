import config from "config"
const manIcon: string = config.get("profileIcons.man")
const womanIcon: string = config.get("profileIcons.woman")
const otherIcon: string = config.get("profileIcons.other")

export const getDemoProfileImage = (sex: string): string => {
    switch (sex) {
        case "Male":
            return manIcon

        case "Female":
            return womanIcon

        case "Other":
            return otherIcon

        default:
            throw new Error("Not illegal sex")
    }
}