import { Role } from "@/types/users"


const accessControl: { [key: string]: string[] } = {
    "/pages/admin": [Role.manager, Role.member],
    "/pages/fablab": [Role.student],
    "/pages/ulc-fablab": [Role.extern]
}

export { accessControl, Role }